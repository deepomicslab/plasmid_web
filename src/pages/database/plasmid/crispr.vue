<template>
    <div v-show="phageStore.phagecrispr.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                CRISPR List
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download CRISPR Array Data
                </el-button>
            </div>
            <div class="flex w-350">
                <n-data-table
                    v-loading="loading"
                    :data="crisprlist"
                    :columns="columns"
                    :max-height="250"
                    :pagination="pagination"
                />
            </div>
        </div>

        <div class="text-2xl font-500 my-10">Annotated Genome Map with Crispr</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-300 ml-15"
            v-if="phageStore.phagecrispr.length !== 0"
        >
            <crisprcirco />
        </div>
    </div>
    <el-dialog v-model="crisprVisible" title="CRISPR Detail" width="80%">
        <el-descriptions class="text-lg" :column="2" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR ID</div>
                </template>
                {{ crisprInfo.crispr_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR Subcrispr_subtypetype</div>
                </template>
                {{ crisprInfo.crispr_subtype }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Start</div>
                </template>
                {{ crisprInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">End</div>
                </template>
                {{ crisprInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas ID</div>
                </template>
                {{ crisprInfo.cas_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Start</div>
                </template>
                {{ crisprInfo.cas_start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas End</div>
                </template>
                {{ crisprInfo.cas_end }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Subtype</div>
                </template>
                {{ crisprInfo.cas_subtype }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR-Cas Consenus Prediction</div>
                </template>
                {{ crisprInfo.cas_consenus_prediction }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Genes</div>
                </template>
                {{ crisprInfo.cas_genes }}
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <el-input
                v-model="crisprInfo.sequence"
                :rows="3"
                type="textarea"
                class="font-mono mt-5 tracking-wide text-lg"
            />
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="crisprVisible = false" type="primary">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTooltip } from 'naive-ui'
import axios from 'axios'
import _ from 'lodash'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import { usePhageStore } from '@/store/phage'
import crisprcirco from '../../visualize/components/crisprcirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const crisprVisible = ref(false)
const phageStore = usePhageStore()
const crisprdata = ref([])
const casdata = ref([])
const loading = ref(false)

// const downloadselected = async () => {
//     window.open(`/api/phage/fasta/?phageids=${checkedRowKeysRef.value}`, '_blank')
// }
// const downloadall = async () => {
//     window.open(`/api/download/phage/fasta/`, '_blank')
// }

onBeforeMount(async () => {
    loading.value = true
    phageStore.crisprloaded = false
    if (props.type === 'taskresult') {
        const response3 = await axios.get(`tasks/result/phage/crisprs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        crisprdata.value = response3.data.results
    } else {
        const response = await axios.get(`crispr/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                pagesize: 100000000,
                plasmid_id: phageStore.plasmid_id,
            },
        })
        crisprdata.value = response.data.results
    }
    phageStore.phagecrispr = crisprdata.value

    const response = await axios.get(`/get_plasmid_crisprs/`, {
        baseURL: '/api/database/',
        timeout: 10000,
        params: {
            plasmid_id: phageStore.plasmid_id,
        },
    })
    casdata.value = response.data
    phageStore.casData = casdata.value

    loading.value = false
    phageStore.crisprloaded = true
})

const crisprlist = computed(() => {
    if (crisprdata.value.length === 0) {
        return []
    }
    return crisprdata.value
})

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
const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}
const crisprInfo = ref({
    crispr_id: '',
    crispr_subtype: '',
    length: '',
    start: '',
    end: '',
    plasmid_id: '',
    plasmid: '',
    cas_id: '',
    cas_start: '',
    cas_end: '',
    cas_subtype: '',
    cas_consenus_prediction: '',
    sequence: '',
    cas_genes: '',
})
type crisprRowData = {
    id: number
    crispr_id: string
    crispr_subtype: string
    length: string
    start: string
    end: string
    plasmid_id: string
    plasmid: string
    cas_id: string
    cas_start: string
    cas_end: string
    cas_subtype: string
    cas_consenus_prediction: string
    consensus_repeat_sequence: string
    cas_genes: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
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
            return renderTooltip(h('div', null, { default: () => 'CRISPR ID' }), 'CRISPR ID')
        },
        key: 'crispr_id',
        align: 'center',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'CRISPR  Subype' }),
                'CRISPR binding amino acid'
            )
        },
        key: 'crispr_subtype',
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {},
                },
                [row.crispr_subtype.replace(/\?/g, '')]
            )
        },
    },
    // {
    //     title() {
    //         return renderTooltip(h('div', null, { default: () => 'Length' }), 'length of t(m)RNA')
    //     },
    //     key: 'length',
    //     align: 'center',
    //     sorter: 'default',
    // },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Start Point' }),
                'CRISPR start site on the genome'
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
                'CRISPR stop site on the genome'
            )
        },
        key: 'end',
        align: 'center',
        sorter: 'default',
    },
    // {
    //     title() {
    //         return renderTooltip(h('div', null, { default: () => 'Strand' }), 'strand sense')
    //     },
    //     key: 'strand',
    //     align: 'center',
    // },
    {
        title: 'Actions',
        key: 'actions',
        width: 280,
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
                                const copyrow = { ...row }
                                crisprInfo.value = { ...row }
                                crisprInfo.value.sequence =
                                    copyrow.consensus_repeat_sequence.replace(/(.{50})/g, '$1\n')
                                crisprVisible.value = true
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
                            type: 'warning',
                            onClick: () => {
                                const copyrow = { ...row }
                                crisprInfo.value = { ...row }
                                crisprInfo.value.sequence =
                                    copyrow.consensus_repeat_sequence.replace(/(.{50})/g, '$1\n')
                                const content = `>${crisprInfo.value.crispr_id}\n${crisprInfo.value.sequence}`
                                const element = document.createElement('a')
                                const file = new Blob([content], { type: 'text/plain' })
                                element.href = URL.createObjectURL(file)
                                element.download = `${crisprInfo.value.crispr_id}.fasta`
                                document.body.appendChild(element) // Required for this to work in FireFox
                                element.click()
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
    console.log(crisprlist.value)
    if (crisprlist.value.length !== 0) {
        const headers = _.keys(crisprlist.value[0])
        const formattedData = [headers]
        crisprlist.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'crispr_array.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
