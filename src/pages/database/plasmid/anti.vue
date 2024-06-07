<template>
    <div v-show="phageStore.phageanti.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Anti-CRISPR Protein
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Anti-CRISPR Protein Data
                </el-button>
            </div>
            <div class="flex w-350">
                <n-data-table
                    v-loading="loading"
                    :data="antilist"
                    :columns="columns"
                    :row-key="rowKey"
                    :max-height="250"
                    :pagination="pagination"
                />
            </div>
        </div>
        <div class="text-2xl font-500 my-10">Annotated Genome Map with Anti-CRISPR Protein</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-290 h-220 ml-25"
            v-if="phageStore.phageanti.length !== 0"
        >
            <anticirco />
        </div>
    </div>
    <el-dialog v-model="anticrisprVisible" title="Anti-CRISPR Protein Sequence" width="50%">
        <div class="w-200">
            <div class="flex flex-row w-170">
                <div class="text-2xl font-500 mb-4">Sequence</div>
            </div>

            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="Antisequence"
            />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// @ts-nocheck
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import { ArrowDown } from '@element-plus/icons-vue'
import { NButton, NTag } from 'naive-ui'
import axios from 'axios'
import _ from 'lodash'
import { usePhageStore } from '@/store/phage'
import anticirco from '../../visualize/components/anticirco.vue'

const phageStore = usePhageStore()
const antidata = ref([] as any[])
const loading = ref(false)
const anticrisprVisible = ref(false)
const Antisequence = ref('')

const props = defineProps({
    type: String,
    taskid: String,
})

onBeforeMount(async () => {
    loading.value = true
    phageStore.antiloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`tasks/result/phage/anticrisprs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        antidata.value = response.data.results
    } else {
        const response = await axios.get(`phage/anticrispr/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
            },
        })
        antidata.value = response.data
    }

    phageStore.phageanti = antidata.value
    loading.value = false
    phageStore.antiloaded = true
})

const antilist = computed(() => {
    if (antidata.value.length === 0) {
        return []
    }
    const antiidlist = antidata.value.map(item => item.Protein_id)
    return _.filter(phageStore.phageprotein, item => antiidlist.includes(item.Protein_id))
})

const getsource = (proteinid: any) => {
    const source = antidata.value.filter(item => item.Protein_id === proteinid)[0].Source
    return source
}
const pagination = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        pagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
    },
})

type RowData = {
    id: number
    Protein_id: string
    protein_product: string
    Protein_function_classification: string
    start_point: string
    end_point: string
    strand: string
}
const rowKey = (row: RowData) => {
    return row.id
}
const createColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
        width: 200,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Source',
        key: 'Source',
        align: 'center',
        width: 125,
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
                        default: getsource(row.Protein_id),
                    }
                ),
            ])
        },
    },
    {
        title: 'Function classification',
        key: 'Protein_function_classification',
        align: 'center',
        width: '200px',
        filterOptions: [
            {
                label: 'hypothetical',
                value: 'hypothetical',
            },
            {
                label: 'infection',
                value: 'infection',
            },
            {
                label: 'assembly',
                value: 'assembly',
            },
            {
                label: 'unsorted',
                value: 'unsorted',
            },
            {
                label: 'replication',
                value: 'replication',
            },
            {
                label: 'packaging',
                value: 'packaging',
            },
            {
                label: 'lysis',
                value: 'lysis',
            },
            {
                label: 'regulation',
                value: 'regulation',
            },
            {
                label: 'immune',
                value: 'immune',
            },
            {
                label: 'integration',
                value: 'integration',
            },
            {
                label: 'tRNA',
                value: 'tRNA',
            },
            {
                label: 'mix',
                value: 'mix',
            },
        ],
        filter(value: any, row: any) {
            return row.Protein_function_classification.includes(value)
        },
        render(row: any) {
            const tagnode = []
            const classlist = row.Protein_function_classification.split(';').slice(
                0,
                -1
            ) as string[]
            classlist.forEach((item, index) => {
                tagnode.push(
                    h(
                        NTag,
                        {
                            size: 'small',
                            type: 'info',
                        },
                        {
                            default: () => {
                                return classlist[index]
                            },
                        }
                    )
                )
            })

            return h(
                'div',
                { style: { width: '200px', display: 'flex', justifyContent: 'space-around' } },
                tagnode
            )
        },
    },
    {
        title: 'Protein Product',
        key: 'Protein_product',
        align: 'center',
        width: '250px',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Start Point',
        key: 'Start_location',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'Stop_location',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'Strand',
        width: '90px',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'actions',
        width: 260,
        align: 'center',
        render(row) {
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
                                Antisequence.value = row.sequence
                                anticrisprVisible.value = true
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
                            onClick: () => {
                                const content = `${row.sequence}`
                                const filename = `${row.Protein_id}.fasta`
                                const blob = new Blob([content], {
                                    type: 'text/plain;charset=utf-8',
                                })
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
const downloadtsv = () => {
    console.log(antilist.value)
    if (antilist.value.length !== 0) {
        const headers = _.keys(antilist.value[0])
        const formattedData = [headers]
        antilist.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'anticrispr.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
