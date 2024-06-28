<template>
    <div class="h-400 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-300">
                <div class="text-4xl font-500 mb-12">
                    Virulent Factor & Antimicrobial Resistance Gene Detection
                </div>
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
                        moduleName="arvf"
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
                    {{ taskid }}
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
                    Virulent Factor & Antimicrobial Resistance Gene Detection
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Antimicrobial Resistance Gene</div>
                    </template>
                    {{ arvfdata.arvg_arg.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Virulent Factor Gene</div>
                    </template>
                    {{ arvfdata.arvg_vfr.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdata.results.created_at }}
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
                    <div class="cell-item">antimicrobial_resistance_gene_results.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.argr" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">virulent_factor_results.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.vfr" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-between">
                <div class="text-4xl font-500 mb-8">Antimicrobial Resistance Gene Result</div>
            </div>
            <n-alert
                title=""
                type="info"
                :bordered="false"
                v-if="arvfdata.arvg_vfr.length === 0"
                class="mb-5"
                closable
            >
                No Antimicrobial Resistance Gene found in the submitted sequence.
            </n-alert>
            <n-data-table
                :data="arvfdata.arvg_arg"
                :columns="columns"
                :max-height="650"
                :pagination="pagination"
            />
        </div>

        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-between">
                <div class="text-4xl font-500 mb-8">Virulent Factor Result</div>
            </div>
            <n-alert
                title=""
                type="info"
                :bordered="false"
                v-if="arvfdata.arvg_vfr.length === 0"
                class="mb-5"
                closable
            >
                No Virulent Factor found in the submitted sequence.
            </n-alert>
            <n-data-table
                :data="arvfdata.arvg_vfr"
                :columns="columns2"
                :max-height="650"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import { Download } from '@vicons/fa'
import { NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import axios from 'axios'
// import _ from 'lodash'
import { Reader } from '@vicons/ionicons5'
import log from '../../log.vue'

const dialogVisible = ref(false)
const route = useRoute()
const router = useRouter()
const taskid = computed(() => route.query?.taskid as string)

const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
        created_at: '',
    },
})

// const createdTime = computed(() => taskdata.value?.result?.value?.created_at as string)

const arvfdata = ref({
    arvg_arg: [],
    arvg_vfr: [],
})
const onClick = () => {
    dialogVisible.value = true
}
onBeforeMount(async () => {
    const response = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response.data
    console.log(taskdata.value)
    const response2 = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'arvf',
            taskid: taskid.value,
        },
    })
    const { data } = response2
    arvfdata.value = data.results
    console.log(arvfdata.value)
})

const urldict = computed(() => {
    return {
        argr: `https://phageapi.deepomics.org/tasks/result/download/${taskdata.value.results.uploadpath}/output/rawdata/arvf/antimicrobial_resistance_gene_result/antimicrobial_resistance_gene_results.tsv`,
        vfr: `https://phageapi.deepomics.org/tasks/result/download/${taskdata.value.results.uploadpath}/output/rawdata/arvf/virulence_factor_result/virulent_factor_results.tsv`,
    }
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

type crisprRowData = {
    ID: number
    Protein_id: string
    Source: string
    Phage_Acession_ID: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
    {
        title: 'Phage ID',
        key: 'Phage_id',
        align: 'center',
        sorter: 'default',
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
        title: 'Aligned Protein in CARD',
        key: 'Aligned Protein in CARD',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Action',
        key: 'actions',
        width: '200px',
        align: 'center',
        fixed: 'right',
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
                                router.push({
                                    path: '/task/result/annopipline/annotation/detail',
                                    query: { phageid: row.Phage_id, taskid: taskid.value },
                                })
                            },
                        },
                        { default: () => 'View Phage' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()

const createColumns2 = (): DataTableColumns<crisprRowData> => [
    {
        title: 'Phage ID',
        key: 'Phage_id',
        align: 'center',
        sorter: 'default',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Protein_id',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Aligned Protein in VFDB',
        key: 'Aligned Protein in VFDB',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Action',
        key: 'actions',
        width: '200px',
        align: 'center',
        fixed: 'right',
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
                                router.push({
                                    path: '/task/result/annopipline/annotation/detail',
                                    query: { phageid: row.Phage_id, taskid: taskid.value },
                                })
                            },
                        },
                        { default: () => 'View Phage' }
                    ),
                ]
            )
        },
    },
]
const columns2 = createColumns2()
</script>
