<template>
    <div class="h-550 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Transmembrane Protein Annotation</div>
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
                        moduleName="transmembrane"
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
                    {{ taskdetail.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Status</div>
                    </template>
                    <el-tag :type="taskdetail.status === 'Success' ? 'success' : 'warning'">
                        {{ taskdetail.status }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    Transmembrane Protein Annotation
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
                    <div class="cell-item">result.txt</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="resulturl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">transmembrane.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="transmembraneurl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="flex flex-row justify-between mt-10 mb-4 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Phage List</div>
            </div>
        </div>
        <div v-loading="loading" class="w-330 mt-1 ml-10">
            <el-table :data="phageList" border style="width: 100%" max-height="850">
                <el-table-column prop="id" label="ID" fixed align="center"></el-table-column>
                <el-table-column
                    prop="Acession_ID"
                    label="Phage ID"
                    fixed
                    width="450"
                    align="center"
                ></el-table-column>

                <el-table-column
                    prop="gc_content"
                    label="GC Content(%)"
                    width="150"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="length"
                    label="Length(bp)"
                    width="150"
                    align="center"
                ></el-table-column>
                <el-table-column label="Detail" width="300" align="center" fixed="right">
                    <template #default="{ row }">
                        <el-button
                            @click="annodetail(row)"
                            type="primary"
                            v-if="taskdetail.modulelist.includes('annotation')"
                        >
                            Detail
                        </el-button>
                        <el-button @click="download(row)" type="info">Download Fasta</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex flex-row justify-between mt-10 mb-4 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Transmembrane Protein</div>
            </div>
        </div>
        <div class="flex w-330 ml-10">
            <n-data-table
                v-loading="loading"
                :data="proteinList"
                :columns="columns"
                :max-height="400"
                :pagination="pagination"
            />
        </div>
    </div>

    <el-dialog v-model="proteinVisible" title="Transmembrane Protein Detail" width="90%">
        <el-descriptions title="Transmembrane Protein Detail" :column="2" size="large" border>
            <el-descriptions-item label="Protein ID">
                {{ proteinInfo.Protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Phage ID">
                {{ proteinInfo.Phage_Acession_ID }}
            </el-descriptions-item>
            <el-descriptions-item label="Length">{{ proteinInfo.Length }}</el-descriptions-item>
            <el-descriptions-item label="Number of predicted TMHs">
                {{ proteinInfo.predictedTMHsNumber }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number of AAs in TMHs">
                {{ proteinInfo.ExpnumberofAAsinTMHs }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number, first 60 AAs">
                {{ proteinInfo.Expnumberfirst60AAs }}
            </el-descriptions-item>
            <el-descriptions-item label="Total prob of N-in">
                {{ proteinInfo.TotalprobofNin }}
            </el-descriptions-item>
            <el-descriptions-item label="POSSIBLE N-term signal sequence">
                {{ proteinInfo.POSSIBLENterm }}
            </el-descriptions-item>
            <el-descriptions-item label="Inside Source">
                {{ proteinInfo.insidesource }}
            </el-descriptions-item>
            <el-descriptions-item label="Inside Start">
                {{ proteinInfo.insidestart }}
            </el-descriptions-item>
            <el-descriptions-item label="Inside End">
                {{ proteinInfo.insideend }}
            </el-descriptions-item>
            <el-descriptions-item label="TM Helix Source">
                {{ proteinInfo.TMhelixsource }}
            </el-descriptions-item>
            <el-descriptions-item label="TM Helix Start">
                {{ proteinInfo.TMhelixstart }}
            </el-descriptions-item>
            <el-descriptions-item label="TM Helix End">
                {{ proteinInfo.TMhelixend }}
            </el-descriptions-item>
            <el-descriptions-item label="Outside Source">
                {{ proteinInfo.outsidesource }}
            </el-descriptions-item>
            <el-descriptions-item label="Outside Start">
                {{ proteinInfo.outsidestart }}
            </el-descriptions-item>
            <el-descriptions-item label="Outside End">
                {{ proteinInfo.outsideend }}
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

// @ts-nocheck
import { NButton } from 'naive-ui'

import { Download } from '@vicons/fa'
// import * as echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'
import { Reader } from '@vicons/ionicons5'
import log from '../../log.vue'

const dialogVisible = ref(false)
const proteinVisible = ref(false)
const proteinInfo = ref()
const route = useRoute()
const router = useRouter()
const phagedata = ref({ results: [] })
const taskid = computed(() => route.query?.taskid as string)
const loading = ref(false)
const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
    },
})
const transmembranedata = ref([] as any[])
const onClick = () => {
    dialogVisible.value = true
}
onBeforeMount(async () => {
    loading.value = true

    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    const data2 = response2.data
    taskdata.value = data2
    loading.value = false

    const response1 = await axios.get(`/tasks/result/phage/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    phagedata.value = response1.data
    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'transmembrane',
            taskid: taskid.value,
        },
    })
    const { data } = response
    transmembranedata.value = data.results
    console.log(transmembranedata.value)
})
const phageList = computed(() => {
    return _.map(phagedata.value?.results, (row: any) => {
        // eslint-disable-next-line
        row.gc_content = parseFloat(row.gc_content).toFixed(2)
        return row
    })
})
const annodetail = (row: any) => {
    router.push({
        path: '/task/result/annopipline/annotation/detail',
        query: { phageid: row.Acession_ID, taskid: taskid.value },
    })
}
const taskdetail = computed(() => {
    return taskdata.value.results
})

const transmembraneurl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/result/transmembrane.tsv`
})
const resulturl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/transmembrane/result.txt`
})
const proteinList = computed(() => {
    if (transmembranedata.value.length === 0) {
        return []
    }
    return transmembranedata.value
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
type RowData = {
    id: number
    Phage_Acession_ID: string
    Protein_id: string
    Length: string
    predictedTMHsNumber: string
    ExpnumberofAAsinTMHs: string
    Expnumberfirst60AAs: string
    TotalprobofNin: string
    POSSIBLENterm: string
    insidesource: string
    insidestart: string
    insideend: string
    TMhelixsource: string
    TMhelixstart: string
    TMhelixend: string
    outsidesource: string
    outsidestart: string
    outsideend: string
}
const createColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Phage ID',
        key: 'Phage_Acession_ID',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Length',
        key: 'Length',
        align: 'center',
        sorter: 'default',
        width: 130,
    },
    {
        title: 'Predicted TMHs Number',
        key: 'predictedTMHsNumber',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Action',
        key: 'actions',
        width: '220px',
        align: 'center',
        fixed: 'right',
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
                                proteinInfo.value = row
                                proteinVisible.value = true
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
const download = async (row: any) => {
    const response = await axios.get(`/tasks/result/phagefasta/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
            phageid: row.Acession_ID,
        },
    })
    const { data } = response
    const blob = new Blob([data], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'sequence.fasta'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
}
</script>
