<template>
    <div class="h-400 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Anti-CRISPR Protein Annotation</div>
                <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="onClick">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                        <log
                            v-model:taskid="taskid"
                            moduleName="anticrispr"
                            :enableTab="false"
                            :enableTable="false"
                        />
                    </el-dialog>
                </div>
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

                    <el-tag :type="taskdata.results.status === 'Success' ? 'success' : 'warning'">
                        {{ taskdata.results.status }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    Anti-CRISPR Protein Annotation
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
                    <div class="cell-item">acr_result.txt</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="urldict.acr" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-350 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-between">
                <div class="text-4xl font-500 mb-8">Result</div>
            </div>

            <n-data-table
                :data="anticrisprdata"
                :columns="columns"
                :max-height="650"
                :pagination="pagination"
            />
        </div>
    </div>

    <el-dialog v-model="proteinVisible" title="Anti-CRISPR Protein Detail" width="90%">
        <el-descriptions title="Protein Detail" :column="2" size="large" border>
            <el-descriptions-item label="Protein ID">
                {{ proteinInfo.Protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Phage ID">
                {{ proteinInfo.phageid }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Anti-CRISPR Prediction Source</div>
                </template>
                <el-tag>{{ proteinInfo.antiresource }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Function classification</div>
                </template>
                <el-tag
                    v-for="key in classlist"
                    :key="key"
                    :color="typedTypeDict[key].color"
                    class="text-white"
                >
                    {{ key }}
                </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Protein Product</div>
                </template>
                {{ proteinInfo.Protein_product }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Strand</div>
                </template>
                {{ proteinInfo.Strand }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Start Point</div>
                </template>
                {{ proteinInfo.Start_location }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">End Point</div>
                </template>
                {{ proteinInfo.Stop_location }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-290 mt-6">
            <div class="flex flex-row w-290">
                <div class="text-lg font-700 mb-4">Protein Sequence</div>
            </div>

            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="proteinInfo.sequence"
            />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import { Download } from '@vicons/fa'
import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import axios from 'axios'
import { Reader } from '@vicons/ionicons5'
import { TypeDict } from '@/utils/annotation'
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

const anticrisprdata = ref([])

const onClick = () => {
    dialogVisible.value = true
}
onBeforeMount(async () => {
    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: taskid.value,
        },
    })
    const data2 = response2.data
    taskdata.value = data2

    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 10000,
        params: {
            module: 'anticrispr',
            taskid: taskid.value,
        },
    })
    const { data } = response
    anticrisprdata.value = data.results
    if (data.results.length === 0) {
        window.$message.warning(
            'No Anti-CRISPR Proteins have been found in the submitted sequence.',
            { closable: true, duration: 50000 }
        )
    }
    // loading.value = false
})
/// home/platform/phage_db/phage_api/workspace/user_task/1692022627_3133/output/rawdata/anticrispr/acr_result.txt
const urldict = computed(() => {
    return {
        acr: `https://phageapi.deepomics.org/tasks/result/download/${taskdata.value.results.uploadpath}/output/rawdata/anticrispr/acr_result.txt`,
    }
})
const complete = (comp: any) => {
    if (comp === 'Acranker') {
        return 'warning'
    }
    if (comp === 'Alignment') {
        return 'success'
    }
    return 'success'
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

const proteinVisible = ref(false)
const proteinInfo = ref({
    ID: 0,
    Protein_id: '',
    phageid: '',
    Source: '',
    Phage_Acession_ID: '',
    Protein_product: '',
    Strand: '',
    Start_location: 0,
    Stop_location: 0,
    Protein_function_classification: '',
    sequence: '',
    antiresource: '',
})
const typedTypeDict = TypeDict as { [key: string]: { color: string } }
const classlist = computed(() => {
    if (proteinInfo.value.Protein_function_classification === undefined) return []
    return proteinInfo.value.Protein_function_classification.split(';').slice(0, -1) as string[]
})
type crisprRowData = {
    ID: number
    Protein_id: string
    Source: string
    Phage_Acession_ID: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
    {
        title: 'Protein_id',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Anti-CRISPR Prediction Source',
        key: 'antiresource',
        align: 'center',
        width: 260,
        filterOptions: [
            {
                label: 'Acranker',
                value: 'Acranker',
            },
            {
                label: 'Alignment',
                value: 'Alignment',
            },
            {
                label: 'Acranker&Alignment',
                value: 'Acranker&Alignment',
            },
        ],
        filter(value: any, row: any) {
            return row.antiresource === value
        },
        render(row: any) {
            return h(
                'div',
                { style: { width: '260px', display: 'flex', justifyContent: 'center' } },
                [
                    h(
                        NTag,
                        {
                            type: complete(row.antiresource),
                            size: 'small',
                        },
                        {
                            default: () => row.antiresource,
                        }
                    ),
                ]
            )
        },
    },
    {
        title: 'Phage ID',
        key: 'phageid',
        align: 'center',
        sorter: 'default',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Action',
        key: 'actions',
        width: '300px',
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
                                proteinInfo.value = row
                                proteinVisible.value = true
                            },
                        },
                        { default: () => 'Protein Detail' }
                    ),
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
                                    query: { phageid: row.phageid, taskid: taskid.value },
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
