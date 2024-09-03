<template>
    <div class="h-530 flex flex-col py-5 px-50">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Cluster Information</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4 mt-4">
            <el-button @click="downloadselected">
                <template #icon>
                    <n-icon><downicon /></n-icon>
                </template>
                Download Selected Cluster Sequence
            </el-button>

            <div class="flex flex-row">
                <div class="mt-2 text-base">Search:</div>
                <el-input class="w-50 ml-3" size="small" v-model="searchinput">
                    <template #append>
                        <el-button :icon="Search" @click="filtersearch" />
                    </template>
                </el-input>
                <el-button class="mt-1 ml-2" :icon="RefreshRight" circle @click="resetsearch" />
            </div>
        </div>
        <div v-loading="loading" class="h-420">
            <n-data-table
                :columns="columns"
                :data="clusterList"
                :row-key="rowKey"
                :max-height="1600"
                @update:checked-row-keys="handleCheck"
            />
        </div>
        <div>
            <n-pagination
                class="mt-10 ml-130 mb-20"
                v-model:page="pagevalue"
                v-model:pageSize="pageSize"
                show-size-picker
                :default-page-size="30"
                :page-sizes="[30, 40, 50]"
                show-quick-jumper
                :item-count="count"
                @update:page="pagechange"
                @update:page-size="pagesizechange"
            >
                <template #prev>
                    <n-button @click="prevPage" v-bind:disabled="pagevalue === 1" size="small">
                        <template #icon>
                            <n-icon><ChevronBack /></n-icon>
                        </template>
                    </n-button>
                </template>
                <template #next>
                    <n-button @click="nextPage" size="small">
                        <template #icon>
                            <n-icon><ChevronForward /></n-icon>
                        </template>
                    </n-button>
                </template>
            </n-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, NTooltip } from 'naive-ui'
import { CloudDownloadOutline as downicon, ChevronBack, ChevronForward } from '@vicons/ionicons5'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
import { useClusterStore } from '@/store/cluster'

const loading = ref(false)
const ClusterStore = useClusterStore()
const router = useRouter()
const pagevalue = ref(1)
const pageSize = ref(30)

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}

const downloadselected = () => {
    if (checkedRowKeysRef.value.length === 0) {
        window.$message.warning('Please select data', {
            closable: true,
            duration: 5000,
        })
    } else {
        window.open(
            `/api/database/download_cluster_fasta/?clusterids=${checkedRowKeysRef.value}`,
            '_blank'
        )
    }
}

type RowData = {
    id: number
    cluster_id: string
    no_of_subclusters: string
    no_of_members: string
    avg_length: number
    avg_gc: string
}

const clusterdata = ref()

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get(`/cluster/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    clusterdata.value = data
    loading.value = false
})

const clusterList = computed(() => {
    return _.map(clusterdata.value?.results, (row: any) => {
        // eslint-disable-next-line
        row.average_gc = Number(parseFloat(row.average_gc).toFixed(2))
        // eslint-disable-next-line
        row.average_length = Number(parseFloat(row.average_length).toFixed(2))
        // eslint-disable-next-line
        row.average_genes = Number(parseFloat(row.average_genes).toFixed(2))
        return row
    })
})
const count = computed(() => clusterdata.value?.count)
const nextPage = async () => {
    loading.value = true
    const response = await axios.get(`/cluster/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    clusterdata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.get(`/cluster/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    clusterdata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.get(`/cluster/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    clusterdata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.get(`/cluster/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    clusterdata.value = data
    loading.value = false
}

const rowKey = (row: RowData) => {
    return row.id
}
const searchinput = ref('')

const templatedata = ref()
const filtersearch = () => {
    templatedata.value = clusterdata.value.results

    clusterdata.value.results = _.filter(clusterdata.value.results, obj => {
        return JSON.stringify(obj).includes(searchinput.value)
    })
}
const resetsearch = () => {
    searchinput.value = ''
    if (templatedata.value) {
        clusterdata.value.results = templatedata.value
    }
}
const download = (row: any) => {
    window.open(`/api/database/download_cluster_fasta/?clusterid=${row.id}`, '_blank')
}
const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}
const createColumns = (): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'Cluster ID' }), 'cluster ID')
            },
            key: 'cluster_id',
            sorter: 'default',
            align: 'center',
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Subclusters' }),
                    'number of subcluster'
                )
            },
            key: 'no_of_subclusters',
            sorter: 'default',
            align: 'center',
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Members' }),
                    'number of plasmids'
                )
            },
            key: 'no_of_members',
            sorter: 'default',
            align: 'center',
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Avg Size (bp)' }),
                    'averaged genome length'
                )
            },
            key: 'avg_length',
            sorter: 'default',
            align: 'center',
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Avg GC (%)' }),
                    'averaged genome GC content '
                )
            },
            key: 'avg_gc',
            sorter: 'default',
            align: 'center',
        },
        // {
        //     title() {
        //         return renderTooltip(
        //             h('div', null, { default: () => 'Avg Genes' }),
        //             'averaged number of genes'
        //         )
        //     },
        //     key: 'average_genes',
        //     sorter: 'default',
        //     align: 'center',
        // },
        // {
        //     title: 'Avg tRNAs',
        //     key: 'trna',
        //     sorter: 'default',
        //     align: 'center',
        // },
        // {
        //     title: 'Life Cycle',
        //     key: 'life_cycle',
        //     sorter: 'default',
        //     align: 'center',

        // },
        {
            title: 'Action',
            key: 'actions',
            align: 'center',
            render(row) {
                return h(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                        },
                    },
                    [
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'info',
                                onClick: () => {
                                    ClusterStore.clusterdata = row
                                    router.push({
                                        path: '/database/cluster/detail',
                                        query: { clusterid: row.id },
                                    })
                                },
                            },
                            { default: () => 'Detail' }
                        ),
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'primary',
                                onClick: () => download(row),
                            },
                            {
                                default: () => 'Download',
                            }
                        ),
                    ]
                )
            },
        },
    ]
}
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'Database_introduction' },
    })
}
const columns = createColumns()
</script>
