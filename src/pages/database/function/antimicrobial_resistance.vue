<template>
    <div class="h-680 flex flex-col py-10 px-30">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Antimicrobial Resistance Gene Information</div>
            <el-button round color="rgb(175,44,94)" class="ml-5 mt-2" @click="godatahelper">
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
                <el-menu-item index="0" class="text-lg">COMPASS</el-menu-item>
                <el-menu-item index="1" class="text-lg">Kraken2</el-menu-item>
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
    <el-dialog v-model="detailVisible" title="Antimicrobial Resistance Gene Detail" width="80%">
        <el-descriptions title="" :column="2" size="large" border>
            <el-descriptions-item label="ID">{{ detailInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="Protein ID">
                {{ detailInfo.protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Plasmid ID">
                {{ detailInfo.plasmid }}
            </el-descriptions-item>
            <el-descriptions-item label="Strand">{{ detailInfo.strand }}</el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ detailInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ detailInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item label="Orf Prediction Source">
                {{ detailInfo.orf_source }}
            </el-descriptions-item>
            <el-descriptions-item label="Product">
                {{ detailInfo.product }}
            </el-descriptions-item>
            <el-descriptions-item label="Cut_Off">
                {{ detailInfo.cufoff }}
            </el-descriptions-item>
            <el-descriptions-item label="HSP identifier">
                {{ detailInfo.hsp_identifier }}
            </el-descriptions-item>
            <el-descriptions-item label="Best_Hit_ARO">
                {{ detailInfo.best_hit_aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Best_Identities">
                {{ detailInfo.best_identities }}
            </el-descriptions-item>
            <el-descriptions-item label="ARO">
                {{ detailInfo.aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Drug Class">
                {{ detailInfo.drug_class }}
            </el-descriptions-item>
            <el-descriptions-item label="Resistance Mechanism">
                {{ detailInfo.resistance_mechanism }}
            </el-descriptions-item>
            <el-descriptions-item label="AMR Gene Family">
                {{ detailInfo.amr_gene_family }}
            </el-descriptions-item>
            <el-descriptions-item label="Antibiotic">
                {{ detailInfo.antibiotic }}
            </el-descriptions-item>
            <el-descriptions-item label="SNPs_in_Best_Hit_ARO">
                {{ detailInfo.snps_in_best_hit_aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Other_SNPs">
                {{ detailInfo.other_snps }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-350 mt-6">
            <div class="flex flex-row w-350">
                <div class="text-xl font-300 mb-4">Protein Sequence</div>
            </div>

            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="detailInfo.sequence"
            />
        </div>
    </el-dialog>
    <el-dialog v-model="proteinInfoVisible" title="Protein Informatioin Detail" width="90%">
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
const source = ref(1)
const detailVisible = ref(false)

const detailInfo = ref()
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}
const dataset = ref('tmh')

type RowData = {
    id: number
    plasmid: string
    plasmid_id: string
    protein_id: string
    start: string
    end: string
    strand: string
    product: string
    orf_source: string
    cutoff: string
    hsp_identifier: string
    best_hit_aro: string
    best_identities: string
    aro: string
    drug_class: string
    resistance_mechanism: string
    amr_gene_family: string
    antibiotic: string
    sequence: string
    snps_in_best_hit_aro: string
    other_snps: string
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
    const response = await axios.get('arg', {
        baseURL: '/api/database',
        timeout: 10000,
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
    const response = await axios.get('arg', {
        baseURL: '/api/database',
        timeout: 10000,
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
    const response = await axios.get('arg', {
        baseURL: '/api/database',
        timeout: 10000,
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
    const response = await axios.get('arg', {
        baseURL: '/api/database',
        timeout: 10000,
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
    const response = await axios.get('arg', {
        baseURL: '/api/database',
        timeout: 10000,
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
        width: 250,
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
                                timeout: 10000,
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
        width: 250,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Drug Class' }), 'drug class')
        },
        key: 'drug_class',
        align: 'center',
        sorter: 'default',
        width: 250,
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Start' }), 'start')
        },
        key: 'start',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'End' }), 'end')
        },
        key: 'end',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Strand' }), 'Strand')
        },
        key: 'strand',
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
    const response = await axios.get('arg', {
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
        query: { type: 'database_intro' },
    })
}
const gofilter = () => {
    router.push({ path: '/database/filter' })
}
</script>
