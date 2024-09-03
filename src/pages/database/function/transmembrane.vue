<template>
    <div class="h-680 flex flex-col py-10 px-30">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Transmembrane Protein Information</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="flex flex-row justify-between">
                <div class="mt-1.5 ml-1 felx flex-row justify-start items-center">
                    <el-button class="mb-1" @click="gofilter">
                        <n-icon class="mr-2"><FunnelOutline /></n-icon>
                        Sequence Filter
                    </el-button>
                </div>
            </div>
            <!-- <div class="flex flex-row">
                <div class="mt-2 text-base">Search:</div>
                <el-input class="w-50 ml-3" size="small" v-model="searchinput">
                    <template #append>
                        <el-button :icon="Search" @click="filtersearch" />
                    </template>
                </el-input>
                <el-button class="mt-1 ml-2" :icon="RefreshRight" circle @click="resetsearch" />
            </div> -->
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
                <el-menu-item index="9" class="text-lg">mMGEs</el-menu-item>
            </el-menu>
        </div>
        <div v-loading="loading" class="h-420">
            <n-data-table :columns="columns" :data="proteinList" :max-height="1600" />
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
    <el-dialog v-model="detailVisible" title="Transmembrane Protein Detail" width="90%">
        <el-descriptions title="" :column="2" size="large" border>
            <el-descriptions-item label="ID">{{ detailInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="Protein ID">
                {{ detailInfo.protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Plasmid ID">
                {{ detailInfo.plasmid }}
            </el-descriptions-item>
            <el-descriptions-item label="Length">{{ detailInfo.length }}</el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ detailInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ detailInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item label="Number of predicted TMHs">
                {{ detailInfo.number_of_predicted_tmhs }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number of AAs in TMHs">
                {{ detailInfo.exp_number_of_aas_in_tmhs }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number, first 60 AAs">
                {{ detailInfo.exp_numberof_first_60_aas }}
            </el-descriptions-item>
            <el-descriptions-item label="Total prob of N-in">
                {{ detailInfo.total_prob_of_n_in }}
            </el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ detailInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ detailInfo.end }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="flex flex-row ml-1 my-7">
            <div class="font-600">Transmembrane Helices Information</div>
        </div>
        <div v-loading="loading" class="h-60" style="overflow: auto">
            <n-data-table :columns="helicesColumns" :data="detailInfo.helices" :max-height="1600" />
        </div>
    </el-dialog>
    <el-dialog v-model="proteinInfoVisible" title="" width="90%">
        <proteindetail
            v-if="proteinInfoVisible"
            v-model:proteinInfo="proteinInfo"
            v-model:dataset="dataset"
        />
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTag, NTooltip, NEllipsis } from 'naive-ui'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import {
    CloudDownloadOutline as downicon,
    ChevronBack,
    ChevronForward,
    FunnelOutline,
} from '@vicons/ionicons5'
import axios from 'axios'
import _ from 'lodash'
import proteindetail from '../protein/detail.vue'

const router = useRouter()
const loading = ref(false)
const source = ref(0)
const detailVisible = ref(false)

const detailInfo = ref()
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}
const dataset = ref('0')

type RowData = {
    id: number
    plasmid: string
    plasmid_id: string
    protein_id: string
    start: string
    end: string
    strand: string
    length: string
    number_of_predicted_tmhs: string
    source: string
    position: string
    self_start: string
    self_end: string
    exp_number_of_aas_in_tmhs: string
    exp_numberof_first_60_aas: string
    total_prob_of_n_in: string
    helices: Array
}

const pagevalue = ref(1)
const pageSize = ref(30)

const proteindata = ref()
const searchinput = ref('')

// function checktype(row) {
//     console.log(row)
// }
onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get('/tmh/', {
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
})

const proteinList = computed(() => {
    return proteindata.value?.results
})

const count = computed(() => proteindata.value?.count)

const nextPage = async () => {
    loading.value = true
    const response = await axios.get('/tmh/', {
        baseURL: '/api/database',
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
    const response = await axios.get('/tmh/', {
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
    const response = await axios.get('/tmh/', {
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
    const response = await axios.get('/tmh/', {
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

const proteinInfo = ref()
const proteinInfoVisible = ref(false)

const viewProtein = async (row: any) => {
    loading.value = true
    const response2 = await axios.get(`/protein/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            protein_id: row.protein_id,
        },
    })

    // eslint-disable-next-line prefer-destructuring
    proteinInfo.value = response2.data.results[0]
    console.log(proteinInfo.value)
    loading.value = false
    proteinInfoVisible.value = true
}

const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}

const createHelicesColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Position',
        key: 'position',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'Start',
        key: 'self_start',
        align: 'center',
        sorter: 'default',
        sortOrder: 'ascend',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'End',
        key: 'self_end',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
]
const helicesColumns = createHelicesColumns()

const createColumns = (): DataTableColumns<RowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Plasmid ID' }), 'plasmid ID')
        },
        key: 'plasmid_id',
        width: 350,
        align: 'center',
        render(row: any) {
            return h('div', {}, [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        style: { width: '250px' },
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
            return renderTooltip(h('div', null, { default: () => 'Protein ID' }), 'protein ID')
        },
        key: 'protein_id',
        align: 'center',
        width: 350,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Length' }), 'protein length')
        },
        key: 'length',
        align: 'center',
        sorter: 'default',
        width: 130,
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Predicted TMHs Number' }),
                'number of predicted transmembrane helices'
            )
        },
        key: 'number_of_predicted_tmhs',
        align: 'center',
        sorter: 'default',
    },

    // {
    //         title: 'Completeness',
    //         key: 'completeness',
    //         align: 'center',
    //         width: 140,
    //         // filterOptions: [
    //         //     {
    //         //         label: 'transmembrane',
    //         //         value: 'transmembrane',
    //         //     },
    //         //     {
    //         //         label: 'Inside',
    //         //         value: 'Inside',
    //         //     },
    //         //     {
    //         //         label: 'Outside',
    //         //         value: 'Outside',
    //         //     },
    //         // ],
    //         // filter(value: any, row: any) {
    //         //     return row.completeness === value
    //         // },
    //         render(row: any) {
    //             return h('div', { style: { width: '100px' } }, [
    //                 h(
    //                     NTag,
    //                     {
    //                         type: complete(row.completeness),
    //                         size: 'small',
    //                     },
    //                     {
    //                         default: () => row.completeness,
    //                     }
    //                 ),
    //             ])
    //         },
    //     },
    {
        title: 'Actions',
        key: 'actions',
        width: 250,
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-around',
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
                                detailInfo.value = row
                                detailVisible.value = true
                                console.log(detailInfo.value.helices)
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'info',
                            onClick: () => viewProtein(row),
                        },
                        { default: () => 'View Protein' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()
console.log(detailInfo)
const handleSelectSet = async (key: any) => {
    source.value = key
    loading.value = true
    const response = await axios.get('/tmh/', {
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
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'Database_introduction' },
    })
}
const gofilter = () => {
    router.push({ path: '/database/filter' })
}
</script>
