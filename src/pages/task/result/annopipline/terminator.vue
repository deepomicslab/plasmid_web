<template>
    <div class="h-600 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Transcription Terminator Annotation</div>
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
                        moduleName="terminator"
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
                    Transcription Terminator Annotation
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Terminators</div>
                    </template>
                    {{ terminatorList.length }}
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
                    <div class="cell-item">TransTermHP Output (transterm_output.tt)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.transterm_output_tt" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        Transcription Terminator Summary (transterm_output.txt)
                    </div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.transterm_output_txt" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-350 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-between">
                <div class="text-4xl font-500 mb-8">Result</div>
            </div>
            <div>
                <n-data-table
                    :data="terminatorList"
                    :columns="columns"
                    :max-height="850"
                    :pagination="pagination"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import axios from 'axios'
import type { DataTableColumns } from 'naive-ui'
import { NTag, NButton } from 'naive-ui'

import { Download } from '@vicons/fa'
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
    },
})

const terminatordata = ref([] as any)
const onClick = () => {
    dialogVisible.value = true
}
onBeforeMount(async () => {
    const response = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response.data

    const response2 = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'terminator',
            taskid: taskid.value,
        },
    })
    const { data } = response2
    terminatordata.value = data.results
    console.log(terminatordata.value)
})
const terminatorList = computed(() => {
    return terminatordata.value
})
const taskdetail = computed(() => {
    return taskdata.value.results
})
const urldict = computed(() => {
    return {
        transterm_output_tt: `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/terminator/transterm_output.tt`,
        transterm_output_txt: `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/terminator/transterm_output.txt`,
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

const complete = (comp: any) => {
    console.log(comp)
    if (Number(comp) < 70) {
        return 'warning'
    }
    if (Number(comp) < 90) {
        return 'info'
    }
    return 'success'
}
type terminatorRowData = {
    Phage_id: string
    Terminator_Id: string
    Start: string
    Stop: string
    Sense: string
    Loc: string
    Confidence: string
}
const createColumns = (): DataTableColumns<terminatorRowData> => [
    {
        title: 'Phage ID',
        key: 'Phage_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Terminator ID',
        key: 'Terminator_Id',
        align: 'center',
    },
    {
        title: 'Start Point',
        key: 'Start',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'Stop',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'Sense',
        align: 'center',
        width: 80,
    },
    {
        title: 'Loc',
        key: 'Loc',
        align: 'center',
        width: 120,
    },
    {
        title: 'Confidence',
        key: 'Confidence',
        align: 'center',
        width: '200px',
        render(row: any) {
            return h('div', { style: { width: '180px' } }, [
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
</script>
