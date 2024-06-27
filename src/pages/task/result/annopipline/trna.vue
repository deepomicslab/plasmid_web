<template>
    <div class="h-full flex flex-col py-10 px-20" v-loading="loading">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">tRNA & tmRNA gene annotation</div>
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
                            :moduleName="'trna'"
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
                    {{ taskid }}
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
                    tRNA & tmRNA gene annotation
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    29
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Trna Genes</div>
                    </template>
                    {{ trnas }}
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
                    <div class="cell-item">trna.fasta</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>

                    <a :href="trna_resulturl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-350 mt-15 ml-10" v-if="trnaList.length !== 0">
            <div class="flex flex-row w-350 justify-between">
                <div class="text-4xl font-500 mb-8">Result</div>
                <!-- <div class="h-13">
                    <el-input class="w-50" size="small">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                </div> -->
            </div>

            <n-data-table
                :data="trnaList"
                :columns="columns2"
                :max-height="250"
                :pagination="pagination"
            />
        </div>
        <n-alert
            title=""
            type="info"
            :bordered="false"
            v-else
            class="mb-5 mt-20 w-330 ml-10"
            closable
        >
            No tRNA & tmRNA Gene found in the submitted sequence.
        </n-alert>
    </div>
    <el-dialog v-model="trnaVisible" title="tRNA Detail" width="80%">
        <el-descriptions class="text-lg" :column="2" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">tRNA ID</div>
                </template>
                {{ trnaInfo.trna_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">tRNA Type</div>
                </template>
                {{ trnaInfo.trnatype }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Length</div>
                </template>
                {{ trnaInfo.length }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Strand</div>
                </template>
                {{ trnaInfo.strand }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Start</div>
                </template>
                {{ trnaInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">End</div>
                </template>
                {{ trnaInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Permutation</div>
                </template>
                {{ trnaInfo.permutation }}
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <el-input
                v-model="trnaInfo.seq"
                :rows="10"
                type="textarea"
                class="font-mono mt-5 tracking-wide text-lg"
            />
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="trnaVisible = false">Cancel</el-button>
                <el-button type="primary">Download</el-button>
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
const route = useRoute()
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
const trnadata = ref([] as any)
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

    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'trna',
            taskid: taskid.value,
        },
    })
    const { data } = response
    trnadata.value = data.results
    loading.value = false
})
const trnaVisible = ref(false)
const trnaInfo = ref({
    trna_id: '',
    trnatype: '',
    length: '',
    start: '',
    end: '',
    strand: '',
    permutation: '',
    seq: '',
})

const trnaList = computed(() => trnadata.value)
const trnas = computed(() => {
    return trnaList.value.length
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
type trnaRowData = {
    trna_id: string
    source: string
    trnatype: string
    length: string
    start: string
    end: string
    strand: string
    permutation: string
}
const createColumns2 = (): DataTableColumns<trnaRowData> => [
    {
        title: 'tRNA ID',
        key: 'trna_id',
        align: 'center',
        width: '280px',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Source',
        key: 'source',
        align: 'center',
        width: 125,

        render(row: any) {
            return h('div', { style: { width: '100px' } }, [
                h(
                    NTag,
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => row.source,
                    }
                ),
            ])
        },
    },
    {
        title: 'tRNA Type',
        key: 'trnatype',
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {},
                },
                [row.trnatype.replace(/\?/g, '')]
            )
        },
    },
    {
        title: 'Length',
        key: 'length',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Start Point',
        key: 'start',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'end',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'strand',
        align: 'center',
    },
    {
        title: 'Permutation',
        key: 'permutation',
        align: 'center',
        width: '250px',
        ellipsis: {
            tooltip: true,
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
                                const copyrow = { ...row }
                                trnaInfo.value = { ...row }
                                trnaInfo.value.seq = copyrow.seq.replace(/(.{50})/g, '$1\n')
                                trnaVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                ]
            )
        },
    },
]
const columns2 = createColumns2()

const trna_resulturl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/trna/trna.fasta`
})
</script>
