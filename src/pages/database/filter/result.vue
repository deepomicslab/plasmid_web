<template>
    <div class="h-550 flex flex-col py-5 px-20">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Filter Result</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1 felx flex-row justify-start items-center">
                <el-button class="mb-1" @click="gofilter">
                    <n-icon class="mr-2"><FunnelOutline /></n-icon>
                    Sequence Filter
                </el-button>

                <el-dropdown class="mx-4">
                    <el-button>
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        Download Sequence
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="downloadall">All Data</el-dropdown-item>
                            <el-dropdown-item @click="downloadselected">
                                Selected Data
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <!-- <div class="flex flex-row">
                <div class="mt-2 text-base">Search:</div>
                <el-input class="w-50 ml-3" size="small">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
                <el-button class="mt-1 ml-2" :icon="RefreshRight" circle />
            </div> -->
        </div>
        <div v-if="false">
            <el-menu
                :default-active="datasets"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectSet"
            >
                <el-menu-item index="-1" class="text-lg">All</el-menu-item>
                <el-menu-item index="0" class="text-lg">PLSDB</el-menu-item>
                <el-menu-item index="1" class="text-lg">IMG-PR</el-menu-item>
                <el-menu-item index="2" class="text-lg">COMPASS</el-menu-item>
                <el-menu-item index="3" class="text-lg">GenBank</el-menu-item>
                <el-menu-item index="4" class="text-lg">RefSeq</el-menu-item>
                <el-menu-item index="5" class="text-lg">EMBL</el-menu-item>
                <el-menu-item index="6" class="text-lg">Kraken2</el-menu-item>
                <el-menu-item index="7" class="text-lg">DDBJ</el-menu-item>
                <el-menu-item index="8" class="text-lg">TPA</el-menu-item>
            </el-menu>
        </div>
        <div v-loading="loading" class="h-420">
            <n-data-table
                :columns="columns"
                :data="phageList"
                :row-key="rowKey"
                :scroll-x="1900"
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
                :page-sizes="[30, 50, 100]"
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
    <el-dialog
        v-model="downloaddialogVisible"
        title="Select download data type"
        width="30%"
        align-center
    >
        <div>
            <el-checkbox-group v-model="checkList" :max="1">
                <el-checkbox label="Download FASTA Data" />
                <!-- <el-checkbox label="Download GBK Data" /> -->
                <el-checkbox label="Download GFF3 Data" />
                <el-checkbox label="Download Meta Data" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="downloaddialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="downloadrequest">Download</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTag, NEllipsis, NTooltip } from 'naive-ui'
import {
    CloudDownloadOutline as downicon,
    FunnelOutline,
    ChevronBack,
    ChevronForward,
} from '@vicons/ionicons5'
import { ArrowDown } from '@element-plus/icons-vue'
import _ from 'lodash'
import axios from 'axios'
import { useQueryStore } from '@/store/query'
import { datasetDict, datasetList } from '@/utils/phage'

const queryStore = useQueryStore()

const pagevalue = ref(1)
const pageSize = ref(30)
const datasets = ref('-1')
const loading = ref(false)
// const phagedata = useRequest(() => phageService.getPhageList(pagevalue.value, pageSize.value)).data
const submitdata = new FormData()
submitdata.append('filterdata', queryStore.filterdata)

const phagedata = ref()

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.post(`/plasmid_filter/`, submitdata, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
})

const phageList = computed(() => {
    return _.map(phagedata.value?.results, (row: any) => {
        // eslint-disable-next-line
        row.gc_content = parseFloat(row.gc_content).toFixed(2)
        return row
    })
})

const count = computed(() => phagedata.value?.count)
const nextPage = async () => {
    loading.value = true
    const response = await axios.post(`/plasmid_filter/`, submitdata, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.post(`/plasmid_filter/`, submitdata, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.post(`/plasmid_filter/`, submitdata, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.post(`/plasmid_filter/`, submitdata, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}

const router = useRouter()

const gofilter = () => {
    router.push({ path: '/database/filter' })
}
const detail = (row: any) => {
    router.push({ path: '/database/plasmid/detail', query: { plasmid_id: row.id } })
}

const downloaddialogVisible = ref(false)
const downloadtype = ref('')
const checkList = ref([] as any[])
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}

const downloadrequest = async () => {
    if (checkList.value.length === 0) {
        window.$message.warning('Please select download data type', {
            closable: true,
            duration: 5000,
        })
    } else if (downloadtype.value === 'selected') {
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(`/api/phage/fasta/?phageids=${checkedRowKeysRef.value}`, '_blank')
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            console.log('88888')
            window.open(`/api/phage/gff/?phageids=${checkedRowKeysRef.value}`, '_blank')
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(`/api/phage/gbk/?phageids=${checkedRowKeysRef.value}`, '_blank')
        }
        if (checkList.value.includes('Download Meta Data')) {
            window.open(`/api/phage/meta/?phageids=${checkedRowKeysRef.value}`, '_blank')
        }
    } else if (downloadtype.value === 'single') {
        if (checkList.value.includes('Download Meta Data')) {
            window.open(`/api/phage/meta/?phageid=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(`/api/phage/fasta/?phageid=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            window.open(`/api/phage/gff/?phageid=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(`/api/phage/gbk/?phageid=${checkedRowKeysRef.value[0]}`, '_blank')
        }
    } else {
        if (checkList.value.includes('Download Meta Data')) {
            window.open(`/api/phage/meta/`, '_blank')
        }
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(`/api/phage/fasta/`, '_blank')
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            window.open(`/api/phage/gff/`, '_blank')
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(`/api/phage/gbk/`, '_blank')
        }
    }
}
const downloadselected = () => {
    if (checkedRowKeysRef.value.length === 0) {
        window.$message.warning('Please select data', {
            closable: true,
            duration: 5000,
        })
    } else {
        downloaddialogVisible.value = true
        downloadtype.value = 'selected'
    }
}
const downloadall = () => {
    downloaddialogVisible.value = true
    downloadtype.value = 'all'
}
const download = (row: any) => {
    downloadtype.value = 'single'
    downloaddialogVisible.value = true
    checkedRowKeysRef.value = [row.id]
}
type RowData = {
    id: string
    plasmid_id: string
    source: string
    length: string
    gc_content: any
    host: string
    completeness: string
    topology: string
    mob_type: string
    mobility: string
    cluster: string
    subcluster: string
}
const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}
const rowKey = (row: RowData) => {
    return row.id
}

const complete = (comp: any) => {
    if (comp === 'Medium-quality') {
        return 'info'
    }
    if (comp === 'High-quality') {
        return 'success'
    }
    if (comp === 'Low-quality') {
        return 'warning'
    }
    if (comp === 'Complete') {
        return 'success'
    }
    return 'warning'
}
const createColumns = (): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'ID' }), 'ID')
            },
            key: 'id',
            sorter: 'default',
            align: 'center',
            width: 90,
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'Plasmid ID' }), 'plasmid ID')
            },
            key: 'plasmid_id',
            align: 'center',
            fixed: 'left',
            width: 125,
            render(row: any) {
                return h('div', null, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            style: { width: '100px' },
                            onClick: () => {
                                const id = row.plasmid_id.replace(`${datasetList[row.source]}_`, '')
                                window.open(`https://www.ncbi.nlm.nih.gov/nuccore/${id}/`)
                            },
                        },
                        [
                            h(NEllipsis, null, {
                                default: () => {
                                    return row.plasmid_id
                                },
                            }),
                        ]
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Data Source' }),
                    'plasmid source dataset'
                )
            },
            key: 'source',
            align: 'center',
            width: 110,
            filterOptions: datasetDict,
            filter(value: any, row: any) {
                return row.source === value
            },
            render(row: any) {
                return h('div', { style: { width: '100px' } }, [
                    h(
                        NTag,
                        {
                            type: 'info',
                            size: 'small',
                            round: true,
                        },
                        {
                            default: () => {
                                return datasetList[row.source]
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Topology' }),
                    'plasmid topology'
                )
            },
            key: 'topology',
            align: 'center',
            ellipsis: {
                tooltip: true,
            },
            width: 95,
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'Length' }), 'plasmid length')
            },
            key: 'length',
            align: 'center',
            ellipsis: {
                tooltip: true,
            },
            width: 95,
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Host' }),
                    'plasmid host topology'
                )
            },
            key: 'host',
            align: 'center',
            width: 180,
            ellipsis: {
                tooltip: true,
            },
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'host',
                                        node: row.host,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.host
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Completeness' }),
                    'genome completeness'
                )
            },
            key: 'completeness',
            align: 'center',
            width: 140,
            filterOptions: [
                {
                    label: 'Medium-quality',
                    value: 'medium-quality',
                },
                {
                    label: 'High-quality',
                    value: 'high-quality',
                },
                {
                    label: 'Low-quality',
                    value: 'low-quality',
                },
                {
                    label: 'Complete',
                    value: 'complete',
                },
                {
                    label: 'Not-determined',
                    value: 'not-determined',
                },
            ],
            filter(value: any, row: any) {
                return row.completeness === value
            },
            render(row: any) {
                return h('div', {}, [
                    h(
                        NTag,
                        {
                            type: complete(row.completeness),
                            size: 'small',
                        },
                        {
                            default: () => row.completeness,
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Genome Length (bp)' }),
                    'plasmid genome length'
                )
            },
            key: 'length',
            sorter: 'default',
            align: 'center',
            width: 90,
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'GC Content (%)' }),
                    'plasmid GC content'
                )
            },
            key: 'gc_content',
            sorter: 'default',
            align: 'center',
            width: 90,
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'MOB_type' }),
                    'plasmid MOB_type'
                )
            },
            key: 'mob_type',
            sorter: 'default',
            align: 'center',
            width: 90,
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'mobility' }),
                    'plasmid mobility'
                )
            },
            key: 'mobility',
            sorter: 'default',
            align: 'center',
            width: 90,
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'Clusters' }), 'cluster ID')
            },
            key: 'cluster',
            align: 'center',
            ellipsis: {
                tooltip: true,
            },
            width: 110,
            // render(row: any) {
            //     return h('div', {}, [
            //         h(
            //             NButton,
            //             {
            //                 type: 'info',
            //                 text: true,
            //                 size: 'small',
            //                 onClick: async () => {
            //                     const response = await axios.get(`/cluster/detail`, {
            //                         baseURL: '/api/database',
            //                         timeout: 10000,
            //                         params: {
            //                             clusterid: row.cluster,
            //                         },
            //                     })
            //                     const { id } = response.data
            //                     router.push({
            //                         path: '/database/cluster/detail',
            //                         query: { clusterid: id },
            //                     })
            //                 },
            //             },
            //             {
            //                 default: () => {
            //                     return row.cluster
            //                 },
            //             }
            //         ),
            //     ])
            // },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Subclusters' }),
                    'subcluster ID'
                )
            },
            key: 'subcluster',
            align: 'center',
            ellipsis: {
                tooltip: true,
            },
            width: 110,
        },
        {
            title: 'Action',
            key: 'actions',
            align: 'center',
            width: 150,
            fixed: 'right',
            render(row: any) {
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
                                onClick: () => detail(row),
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

const columns = createColumns()

const paginationReactive = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    showQuickJumper: true,
    onChange: (page: number) => {
        paginationReactive.page = page
    },
})
const handleSelectSet = (value: any) => {
    console.log(value)
}
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'database_intro' },
    })
}
</script>
