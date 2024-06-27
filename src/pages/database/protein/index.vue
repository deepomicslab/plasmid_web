<template>
    <div class="h-680 flex flex-col py-10 px-30">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Protein Information</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1">
                <!-- <el-dropdown class="mx-4">
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
                </el-dropdown> -->
            </div>

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
        <div>
            <el-menu
                :default-active="dataset"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectSet"
            >
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
                :data="proteinList"
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
    <el-dialog v-model="proteinVisible" title="" width="90%">
        <proteindetail
            v-if="proteinVisible"
            v-model:proteinInfo="proteinInfo"
            v-model:dataset="dataset"
        />
    </el-dialog>
    <el-dialog
        v-model="downloadproteindialogVisible"
        title="Select download data type"
        width="30%"
        align-center
    >
        <div>
            <el-checkbox-group v-model="proteincheckList">
                <el-checkbox label="Download FASTA DATA" />
                <el-checkbox label="Download Meta DATA" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="downloadproteindialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="downloadrequest">Download</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTag, NTooltip } from 'naive-ui'
import { Search, RefreshRight } from '@element-plus/icons-vue'
// import { CloudDownloadOutline as downicon, ChevronBack, ChevronForward } from '@vicons/ionicons5'
import axios from 'axios'
import _ from 'lodash'
import { COGCategoryDict } from '@/utils/phage'
import proteindetail from './detail.vue'

const router = useRouter()
const loading = ref(false)

const proteinVisible = ref(false)

const proteinInfo = ref()
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}
const dataset = ref('0')
type RowData = {
    id: number
    plasmid_id: string
    plasmid: string
    protein_id: string
    function_source: string
    orf_source: string
    product: string
    cog_category: string
    start_point: string
    end_point: string
    strand: string
}

const pagevalue = ref(1)
const pageSize = ref(30)
const searchinput = ref('')
const source = ref(0)

const proteindata = ref()
const downloadproteindialogVisible = ref(false)

const proteincheckList = ref(['Download FASTA'])
// const downloadselected = () => {
//     downloadproteindialogVisible.value = true
//     downloadtype.value = 'selected'
// }
// const downloadall = () => {
//     downloadproteindialogVisible.value = true
//     downloadtype.value = 'all'
// }
onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database/',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
})

const proteinList = computed(() => {
    return proteindata.value?.results
})

const count = computed(() => proteindata.value?.count)

const nextPage = async () => {
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database/',
        timeout: 100000,
        params: {
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
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

// const godetail = (row: RowData) => {
//     console.log(row)
//     router.push({ path: '/database/protein/detail', query: { id: row.id, dataset: row.dataset } })
// }

const templatedata = ref()
const filtersearch = () => {
    templatedata.value = proteindata.value.results

    proteindata.value.results = _.filter(proteindata.value.results, obj => {
        return JSON.stringify(obj).includes(searchinput.value)
    })
}
const resetsearch = () => {
    searchinput.value = ''
    if (templatedata.value) {
        proteindata.value.results = templatedata.value
    }
}

const createColumns = (): DataTableColumns<RowData> => [
    {
        type: 'selection',
    },
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Plasmid ID' }), 'plasmid ID')
        },
        key: 'plasmid_id',
        align: 'center',
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
                        onClick: async () => {
                            const response = await axios.get(`/plasmid/${row.plasmid}`, {
                                baseURL: '/api/database',
                                timeout: 100000,
                            })
                            const plasmid_id = response.data.id
                            router.push({
                                path: '/database/plasmid/detail/',
                                query: { plasmid_id },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.plasmid_id
                        },
                    }
                ),
            ])
        },
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Protein ID' }), 'protein ID')
        },
        key: 'protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Orf Prediction Source' }),
                'source of the orf prediction'
            )
        },
        key: 'orf_source',
        align: 'center',
        render(row: any) {
            return h('div', {}, [
                h(
                    NTag,
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => {
                            return row.orf_source
                        },
                    }
                ),
            ])
        },
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Function Prediction Source' }),
                'source of the protein function annotation'
            )
        },
        key: 'function_source',
        align: 'center',
        render(row: any) {
            return h('div', {}, [
                h(
                    'span',
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => {
                            return row.function_source
                        },
                    }
                ),
            ])
        },
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'COG category' }),
                'protein classification with keyword search'
            )
        },
        key: 'cog_category',
        align: 'center',
        width: '250px',
        ellipsis: {
            tooltip: true,
        },
        render(row: any) {
            return h('span', { style: { width: '250px', overflow: 'auto' } }, [
                h(
                    'span',
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => {
                            return COGCategoryDict[row.cog_category]
                        },
                    }
                ),
            ])
        },
    },

    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Protein Product' }),
                'protein product'
            )
        },
        key: 'product',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
        width: 130,
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Start Point' }),
                'protein start site on the genome'
            )
        },
        key: 'start',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'End Point' }),
                'protein stop site on the genome'
            )
        },
        key: 'end',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Strand' }),
                'the strand encoding the protein'
            )
        },
        key: 'strand',
        align: 'center',
        width: '70px',
    },
    {
        title: 'Action',
        key: 'actions',
        width: '180px',
        align: 'center',
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
                            tertiary: true,
                            size: 'small',
                            type: 'info',
                            onClick: () => {
                                proteinInfo.value = row
                                console.log(row)
                                proteinVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                    // h(
                    //     NButton,
                    //     {
                    //         strong: true,
                    //         tertiary: true,
                    //         size: 'small',
                    //         type: 'success',
                    //         onClick: () => {
                    //             window.open(
                    //                 `https://alphafold.ebi.ac.uk/search/text/${row.sequence}/`
                    //             )
                    //         },
                    //     },
                    //     { default: () => 'Structure' }
                    // ),
                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'warning',
                            onClick: () => {
                                const blob = new Blob([row.sequence], { type: 'text/plain' })
                                const url = URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = `${row.Protein_id}.fasta`
                                link.click()
                                URL.revokeObjectURL(url)
                            },
                        },
                        { default: () => 'Download' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()

const handleSelectSet = async (key: any) => {
    source.value = key
    loading.value = true
    const response = await axios.get(`/protein/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            source: source.value,
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    proteindata.value = data
    loading.value = false
}
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'database_intro' },
    })
}
</script>
