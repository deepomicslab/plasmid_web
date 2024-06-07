<template>
    <div v-show="phageStore.phagecrispr.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                CRISPR Array
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

        <div class="text-2xl font-500 my-10">Annotated Genome Map with Crispr Array</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-245 ml-15"
            v-if="phageStore.phagecrispr.length !== 0"
        >
            <crisprcirco />
        </div>
    </div>
    <el-dialog v-model="crisprVisible" title="CRISPR Array Detail" width="80%">
        <el-descriptions class="w-330 text-lg" :column="2" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">ID</div>
                </template>
                {{ crisprInfo.id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Strain</div>
                </template>
                {{ crisprInfo.Strain }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Phage ID</div>
                </template>
                {{ crisprInfo.Phage_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Sequence Basename</div>
                </template>
                {{ crisprInfo.Sequence_basename }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Duplicated Spacers</div>
                </template>
                {{ crisprInfo.Duplicated_Spacers }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR ID</div>
                </template>
                {{ crisprInfo.CRISPR_Id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR Start</div>
                </template>
                {{ crisprInfo.CRISPR_Start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR End</div>
                </template>
                {{ crisprInfo.CRISPR_End }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR Length</div>
                </template>
                {{ crisprInfo.CRISPR_Length }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Potential Orientation AT</div>
                </template>
                {{ crisprInfo.Potential_Orientation_AT }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPRDirection</div>
                </template>
                {{ crisprInfo.CRISPRDirection }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Consensus Repeat</div>
                </template>
                {{ crisprInfo.Consensus_Repeat }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Repeat ID CRISPRdb</div>
                </template>
                {{ crisprInfo.Repeat_ID_CRISPRdb }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Nb CRISPRs with same Repeat</div>
                </template>
                {{ crisprInfo.Nb_CRISPRs_with_same_Repeat_CRISPRdb }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Repeat Length</div>
                </template>
                {{ crisprInfo.Repeat_Length }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Spacers Nb</div>
                </template>
                {{ crisprInfo.Spacers_Nb }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Mean size Spacers</div>
                </template>
                {{ crisprInfo.Mean_size_Spacers }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Standard Deviation Spacers</div>
                </template>
                {{ crisprInfo.Standard_Deviation_Spacers }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Nb Repeats matching Consensus</div>
                </template>
                {{ crisprInfo.Nb_Repeats_matching_Consensus }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Ratio Repeats match TotalRepeat</div>
                </template>
                {{ crisprInfo.Ratio_Repeats_match_TotalRepeat }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Consensus Repeat length</div>
                </template>
                {{ crisprInfo.Conservation_Repeats_identity }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Evidence Level</div>
                </template>
                {{ crisprInfo.Evidence_Level }}
            </el-descriptions-item>
        </el-descriptions>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="crisprVisible = false">Cancel</el-button>
                <el-button type="primary">Download</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
import { NButton, NTag } from 'naive-ui'
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
        const response = await axios.get(`phage/crispr/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
            },
        })
        crisprdata.value = response.data
    }
    phageStore.phagecrispr = crisprdata.value
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

const crisprInfo = ref({
    id: '',
    Strain: '',
    Phage_id: '',
    Sequence_basename: '',
    Duplicated_Spacers: '',
    CRISPR_Id: '',
    CRISPR_Start: '',
    CRISPR_End: '',
    CRISPR_Length: '',
    Potential_Orientation_AT: '',
    CRISPRDirection: '',
    Consensus_Repeat: '',
    Repeat_ID_CRISPRdb: '',
    Nb_CRISPRs_with_same_Repeat_CRISPRdb: '',
    Repeat_Length: '',
    Spacers_Nb: '',
    Mean_size_Spacers: '',
    Standard_Deviation_Spacers: '',
    Nb_Repeats_matching_Consensus: '',
    Ratio_Repeats_match_TotalRepeat: '',
    Conservation_Repeats_identity: '',
    EBcons_Repeats: '',
    Conservation_Spacers_identity: '',
    EBcons_Spacers: '',
    Repeat_Length_plus_mean_size_Spacers: '',
    Ratio_Repeat_mean_Spacers_Length: '',
    CRISPR_found_in_DB_if_sequence_IDs_are_similar: '',
    Evidence_Level: '',
})
const complete = (comp: any) => {
    if (comp === '2') {
        return 'info'
    }
    if (comp === '4') {
        return 'success'
    }
    if (comp === '1') {
        return 'warning'
    }
    if (comp === '3') {
        return 'success'
    }
    return 'warning'
}
type crisprRowData = {
    ID: number
    Phage_id: string
    Duplicated_Spacers: string
    CRISPR_Id: string
    CRISPR_Start: string
    CRISPR_End: string
    CRISPR_Length: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
    {
        title: 'CRISPR ID',
        key: 'CRISPR_Id',
        align: 'center',
        sorter: 'default',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Duplicated Spacers',
        key: 'Duplicated_Spacers',
        align: 'center',
        sorter: 'default',
    },

    {
        title: 'CRISPR Start',
        key: 'CRISPR_Start',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'CRISPR_End',
        key: 'CRISPR_End',
        align: 'center',
    },
    {
        title: 'CRISPR_Length',
        key: 'CRISPR_Length',
        align: 'center',
    },
    {
        title: 'Potential_Orientation_AT',
        key: 'Potential_Orientation_AT',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Repeat_Length',
        key: 'Repeat_Length',
        align: 'center',
    },
    {
        title: 'Spacers_Nb',
        key: 'Spacers_Nb',
        align: 'center',
    },
    {
        title: 'Mean_size_Spacers',
        key: 'Mean_size_Spacers',
        align: 'center',
    },
    {
        title: 'Evidence_Level',
        key: 'Evidence_Level',
        align: 'center',
        width: 150,
        filterOptions: [
            {
                label: '1',
                value: '1',
            },
            {
                label: '2',
                value: '2',
            },
            {
                label: '3',
                value: '3',
            },
            {
                label: '4',
                value: '4',
            },
        ],
        filter(value: any, row: any) {
            return row.Evidence_Level === value
        },
        render(row: any) {
            return h('div', {}, [
                h(
                    NTag,
                    {
                        type: complete(row.Evidence_Level),
                        size: 'small',
                    },
                    {
                        default: () => row.Evidence_Level,
                    }
                ),
            ])
        },
    },
    {
        title: 'Action',
        key: 'actions',
        width: 100,
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
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
                                // const copyrow = { ...row }
                                crisprInfo.value = { ...row }
                                crisprVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
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
