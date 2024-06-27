<template>
    <div class="h-700 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">CRISPR Array Annotation</div>
                <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="onClick">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                </div>
                <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                    <log
                        v-model:taskid="taskid"
                        moduleName="crispr"
                        :enableTab="false"
                        :enableTable="false"
                    />
                </el-dialog>
            </div>

            <el-descriptions class="w-330 text-xl" :column="2" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Task id</div>
                    </template>
                    {{ taskdata.results.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Status</div>
                    </template>
                    <el-tag type="success">Success</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    CRISPR Array Annotation
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">CRISPRs</div>
                    </template>
                    {{ crisprdata.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdetail.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="flex flex-row justify-between mt-18 mb-4 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Download Result</div>
            </div>
        </div>
        <el-descriptions class="w-330 text-xl ml-10" :column="1" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR-Cas_summary.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.summary" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Crisprs_REPORT.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.report" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-420 mt-15 ml-10">
            <div class="flex flex-row w-400 justify-between">
                <div class="text-4xl font-500 mb-8">Result</div>
            </div>

            <n-data-table
                :columns="columns"
                :data="crisprdata"
                :max-height="1600"
                :pagination="pagination"
            />
        </div>
    </div>
    <el-dialog v-model="crisprVisible" title="CRISPR Arrays" width="80%">
        <el-descriptions class="w-330 text-lg" :column="2" size="large" border>
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
                {{ crisprInfo.Sequence }}
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
                {{ crisprInfo['Potential_Orientation (AT%)'] }}
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
                {{ crisprInfo['Repeat_ID (CRISPRdb)'] }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Nb CRISPRs with same Repeat</div>
                </template>
                {{ crisprInfo['Nb_CRISPRs_with_same_Repeat (CRISPRdb)'] }}
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
                {{ crisprInfo['Ratio_Repeats_match/TotalRepeat'] }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Conservation_Repeats (% identity)</div>
                </template>
                {{ crisprInfo['Conservation_Repeats (% identity)'] }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Conservation_Spacers (% identity)</div>
                </template>
                {{ crisprInfo['Conservation_Spacers (% identity)'] }}
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
                <el-button @click="downloadsequence" type="primary">Download Sequence</el-button>
                <el-button @click="crisprVisible = false">Cancel</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import { Download } from '@vicons/fa'
import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import axios from 'axios'
import { Reader } from '@vicons/ionicons5'
import log from '../../log.vue'

const dialogVisible = ref(false)
const crisprVisible = ref(false)
const route = useRoute()
const taskid = computed(() => route.query?.taskid as string)
const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
    },
})
const crisprdata = ref([])
const onClick = () => {
    dialogVisible.value = true
}
onBeforeMount(async () => {
    // loading.value = true

    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    const data2 = response2.data
    taskdata.value = data2

    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'crispr',
            taskid: taskid.value,
        },
    })
    const { data } = response
    crisprdata.value = data.results
    console.log(crisprdata.value)
    // loading.value = false
})

const taskdetail = computed(() => {
    return taskdata.value.results
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
/// home/platform/phage_db/phage_api/workspace/user_task/1690810085_6563/output/rawdata/crispr/output/TSV/CRISPR-Cas_summary.tsv
const urldict = computed(() => {
    return {
        summary: `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/crispr/output/TSV/CRISPR-Cas_summary.tsv`,
        report: `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/crispr/output/TSV/Crisprs_REPORT.tsv`,
    }
})

const crisprInfo = ref({
    id: '',
    Strain: '',
    Sequence: '',
    Sequence_basename: '',
    Duplicated_Spacers: '',
    CRISPR_Id: '',
    CRISPR_Start: '',
    CRISPR_End: '',
    CRISPR_Length: '',
    'Potential_Orientation (AT%)': '',
    CRISPRDirection: '',
    Consensus_Repeat: '',
    'Repeat_ID (CRISPRdb)': '',
    'Nb_CRISPRs_with_same_Repeat (CRISPRdb)': '',
    Repeat_Length: '',
    Spacers_Nb: '',
    Mean_size_Spacers: '',
    Standard_Deviation_Spacers: '',
    Nb_Repeats_matching_Consensus: '',
    'Ratio_Repeats_match/TotalRepeat': '',
    'Conservation_Repeats (% identity)': '',
    EBcons_Repeats: '',
    'Conservation_Spacers (% identity)': '',
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
    Phage_id: string
    Duplicated_Spacers: string
    CRISPR_Id: string
    CRISPR_Start: string
    CRISPR_End: string
    CRISPR_Length: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
    {
        title: 'Phage ID',
        key: 'Sequence',
        align: 'center',
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
        title: 'CRISPR ID',
        key: 'CRISPR_Id',
        align: 'center',
        sorter: 'default',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'CRISPR Start',
        key: 'CRISPR_Start',
        align: 'center',
    },
    {
        title: 'CRISPR_End',
        key: 'CRISPR_End',
        align: 'center',
    },
    {
        title: 'CRISPR_Length',
        key: 'CRISPR_Length',
        sorter: 'default',
        align: 'center',
    },
    {
        title: 'Potential_Orientation_AT',
        key: 'Potential_Orientation (AT%)',
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
        width: 80,
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
            return h('div', { style: { width: '100px' } }, [
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
                                // const copyrow = { ...row }
                                crisprInfo.value = { ...row }
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
                            type: 'info',
                            onClick: () => {
                                const element = document.createElement('a')
                                const content = `>${row.CRISPR_Id}\n${row.Consensus_Repeat}`
                                const file = new Blob([content], { type: 'text/plain' })
                                element.href = URL.createObjectURL(file)
                                element.download = `${row.CRISPR_Id}.fasta`
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

const downloadsequence = () => {
    const element = document.createElement('a')
    const content = `>${crisprInfo.value.CRISPR_Id}\n${crisprInfo.value.Consensus_Repeat}`
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${crisprInfo.value.CRISPR_Id}.fasta`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}
</script>
