<template>
    <div class="h-680 flex flex-col py-5 px-1/10">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Transcription Terminator Information</div>
            <el-button round color="#34498E" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1 felx flex-row justify-start items-center">
                <el-button class="mb-1" @click="gofilter">
                    <n-icon class="mr-2"><FunnelOutline /></n-icon>
                    Sequence Filter
                </el-button>
            </div>
        </div>

        <div v-loading="loading">
            <n-data-table :columns="columns" :data="phageList" :max-height="1600" />
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
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTag, NTooltip } from 'naive-ui'
import axios from 'axios'
import _ from 'lodash'
import { FunnelOutline, ChevronBack, ChevronForward } from '@vicons/ionicons5'
// import { Search, RefreshRight } from '@element-plus/icons-vue'

const pagevalue = ref(1)
const pageSize = ref(30)

const loading = ref(false)

const trnadata = ref()

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get(`/terminators/`, {
        baseURL: '/api',
        timeout: 100000,
    })
    trnadata.value = response.data
    loading.value = false
})

const phageList = computed(() => {
    return trnadata.value?.results
})

const count = computed(() => trnadata.value?.count)
const nextPage = async () => {
    loading.value = true
    const response = await axios.get(`/terminators/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    trnadata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.get(`/terminators/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    trnadata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.get(`/terminators/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    trnadata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.get(`/terminators/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    trnadata.value = data
    loading.value = false
}
const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}
const complete = (comp: any) => {
    if (Number(comp) < 70) {
        return 'warning'
    }
    if (Number(comp) < 90) {
        return 'info'
    }
    return 'success'
}
const router = useRouter()

type trnaRowData = {
    id: number
    Phage_id: string
    Terminator_Id: string
    Start: string
    Stop: string
    Sense: string
    Loc: string
    Confidence: string
}
const createColumns = (): DataTableColumns<trnaRowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Phage ID' }), 'phage ID')
        },
        key: 'Phage_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
        render(row: any) {
            return h('div', { style: { width: '130px' } }, [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        onClick: async () => {
                            const response = await axios.get(`/phage/detail`, {
                                baseURL: '/api',
                                timeout: 10000,
                                params: {
                                    accid: row.Phage_id,
                                },
                            })
                            const phageid = response.data.id
                            router.push({
                                path: '/database/phage/detail',
                                query: { phageid },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.Phage_id
                        },
                    }
                ),
            ])
        },
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Terminator ID' }),
                'transcription terminator ID'
            )
        },
        key: 'Terminator_Id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Start Point' }),
                'terminator start site on the genome'
            )
        },
        key: 'Start',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'End Point' }),
                'terminator stop site on the genome'
            )
        },
        key: 'Stop',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Strand' }), 'strand sense')
        },
        key: 'Sense',
        align: 'center',
        width: '150',
    },
    {
        // title() {
        //     return renderTooltip(
        //         h('div', null, { default: () => 'Loc' }),
        //         `type of region the terminator is in ('G' = in the interior of a gene (at least 50bp from an end), 'F' = between two +strand genes, 'R' = between two -strand genes, 'T' = between the ends of a +strand gene and a -strand gene, 'H' = between the starts of a +strand gene and a -strand gene, 'N' = none of the above (for the start and end of the DNA))`
        //     )
        // },
        title: 'Loc',
        key: 'Loc',
        align: 'center',
        width: '90',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Confidence' }),
                'confidence score'
            )
        },
        key: 'Confidence',
        align: 'center',
        width: '150',
        render(row: any) {
            return h('div', [
                h(
                    NTag,
                    {
                        type: complete(row.Confidence),
                        size: 'large',
                    },
                    {
                        default: () => row.Confidence,
                    }
                ),
            ])
        },
    },

    {
        title: 'Action',
        key: 'actions',
        width: 300,
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
                    // h(
                    //     NButton,
                    //     {
                    //         strong: true,
                    //         tertiary: true,
                    //         size: 'small',
                    //         type: 'info',
                    //         onClick: () => {},
                    //     },
                    //     { default: () => 'Detail' }
                    // ),

                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'info',
                            onClick: async () => {
                                const response = await axios.get(`/phage/detail`, {
                                    baseURL: '/api',
                                    timeout: 10000,
                                    params: {
                                        accid: row.Phage_id,
                                    },
                                })
                                const phageid = response.data.id
                                const response3 = await axios.get(`phage/fasta/`, {
                                    baseURL: '/api',
                                    timeout: 10000,
                                    params: {
                                        phageid,
                                    },
                                })
                                const textList = _.drop(_.split(response3.data, '\n'))
                                const fastastring = _.join(textList, '')

                                const filename = `${row.Terminator_Id}.fasta`
                                const str = `${row.Terminator_Id}\n${fastastring.substring(
                                    Number(row.Start),
                                    Number(row.Stop)
                                )}`
                                const blob = new Blob([str], { type: 'text/plain;charset=utf-8' })
                                const url = URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = filename
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
