<template>
    <div class="flex flex-col mx-1/10 justify-start h-940">
        <div class="mt-15">
            <div class="flex flex-row w-200 ml-10">
                <div class="text-4xl font-500 mb-12">Sequence Alignment</div>
                <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="dialogVisible = true">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                        <log
                            v-model:taskid="taskid"
                            moduleName="alignment"
                            :enableTab="false"
                            :enableTable="false"
                        />
                    </el-dialog>
                </div>
            </div>

            <el-descriptions class="w-330 text-xl ml-10" :column="2" size="large" border>
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
                    Sequence Alignment
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ orderList.length }}
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
                    <div class="cell-item">Blast Result (blast_result.txt)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="resulturl.blast" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Alignment Result (comparison_link.csv)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="resulturl.circle" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>

        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-start">
                <div class="text-3xl font-500 mb-8">Alignment Result</div>
                <el-popover placement="right" :width="400" trigger="click">
                    <template #reference>
                        <el-button class="ml-10 mt-1" type="primary">
                            Select Plasmid to view result
                        </el-button>
                    </template>
                    <n-data-table
                        :data="orderList"
                        :columns="columns"
                        :max-height="550"
                        :row-key="rowKey"
                        @update:checked-row-keys="handleCheck"
                        v-loading="loading"
                    />
                    <div class="my-3 w-full flex flex-row justify-center">
                        <el-button class="mt-1" type="primary" @click="seeresult">
                            View Result
                        </el-button>
                    </div>
                </el-popover>
            </div>

            <n-data-table
                v-loading="loading"
                :data="result2"
                :columns="columns3"
                :max-height="250"
                :pagination="pagination2"
            />
        </div>

        <div class="flex flex-row justify-between mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500">Alignment Detail Map</div>
                <el-button @click="switchmap" class="ml-10" type="primary" v-if="isShowDetail">
                    see overview
                </el-button>
                <el-button @click="switchmap" class="ml-10" type="primary" v-if="!isShowDetail">
                    see detail
                </el-button>
            </div>
        </div>
        <div class="ml-10" v-show="isShowDetail">
            <comp />
        </div>
        <!-- <div class="ml-10" v-if="false">
            <compcirco />
        </div> -->
        <div class="ml-10" v-show="!isShowDetail">
            <compcirco2 />
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'

import { Download } from '@vicons/fa'
import axios from 'axios'
import { NTag, NButton } from 'naive-ui'
import { Reader } from '@vicons/ionicons5'
import comp from '../../../../visualize/comparison.vue'
import compcirco2 from '../../../../visualize/components/comparisoncirco.vue'
import { usePhageStore } from '@/store/phage'
import log from '../../../log.vue'

const dialogVisible = ref(false)
const phageStore = usePhageStore()
const route = useRoute()
const taskid = computed(() => route.query?.taskid as string)
const loading = ref(true)
const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
    },
})

const alignmentdata = ref({
    sortedlist: [],
    alignment: [],
    circlealignment: [],
})

const isShowDetail = ref(true)

const switchmap = () => {
    isShowDetail.value = !isShowDetail.value
    console.log(isShowDetail.value)
}
onBeforeMount(async () => {
    loading.value = true
    phageStore.alignmentloaded = false
    const response = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response.data

    const response2 = await axios.get(`/view_task_result_modules/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            module: 'alignment',
            taskid: taskid.value,
        },
    })

    alignmentdata.value = response2.data.results

    phageStore.phagecomparisondata = alignmentdata.value
    phageStore.alignmentloaded = true
    loading.value = false
})

const taskdetail = computed(() => {
    return taskdata.value.results
})

const resulturl = computed(() => {
    return {
        blast: `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/alignment/blast_result.txt`,
        circle: `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/alignment/comparison_link_circle.csv`,
    }
})

const pagination2 = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        pagination2.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        pagination2.pageSize = pageSize
        pagination2.page = 1
    },
})
const orderList = computed(() => {
    return alignmentdata.value.sortedlist
})

const result2 = computed(() => {
    return alignmentdata.value.circlealignment
})
type orderListRowData = {
    order: number
    phage_id: string
}

const router = useRouter()

const rowKey = (row: RowData) => {
    return row.phage_id
}
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    if (rowKeys.length > 3) {
        window.$message.warning('Please select no more than three sequences', {
            closable: true,
            duration: 5000,
        })
    } else {
        checkedRowKeysRef.value = rowKeys
    }
}
const createColumns = (): DataTableColumns<orderListRowData> => [
    {
        type: 'selection',
    },
    {
        title: 'Order',
        key: 'order',
        align: 'center',
        width: '100px',
    },
    {
        title: 'Plasmid ID',
        key: 'phage_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
]
const columns = createColumns()

type alignmentRowData = {
    id: number
    Source_Phage_ID: string
    Target_Phage_ID: string
    Source_start_point: number
    Source_end_point: number
    Source_strand: string
    Source_protein_id: string
    Target_start_point: number
    Target_end_point: number
    Target_strand: string
    Target_protein_id: string
    Identity: number
    Coverage: number
}
const createColumns2 = (): DataTableColumns<alignmentRowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
    },
    {
        title: 'Source_Plasmid_ID',
        key: 'Source_Phage_ID',
        align: 'center',
        width: '240px',
        ellipsis: {
            tooltip: true,
        },

        render(row: any) {
            return h('div', [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        color: 'rgb(18,49,73)',
                        onClick: () => {
                            router.push({
                                path: '/task/result/annopipline/annotation/detail',
                                query: { phageid: row.Source_Phage_ID, taskid: taskid.value },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.Source_Phage_ID
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Target_Plasmid_ID',
        key: 'Target_Phage_ID',
        align: 'center',
        width: '240px',
        ellipsis: {
            tooltip: true,
        },
        render(row: any) {
            return h('div', [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        color: 'rgb(18,49,73)',
                        onClick: () => {
                            router.push({
                                path: '/task/result/annopipline/annotation/detail',
                                query: { phageid: row.Target_Phage_ID, taskid: taskid.value },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.Target_Phage_ID
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Source_protein_id',
        key: 'Source_protein_id',
        width: '240px',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Target_protein_id',
        key: 'Target_protein_id',
        width: '240px',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Identity',
        key: 'Identity',
        align: 'center',
        width: '125',
        render(row: any) {
            return h('div', { style: { width: '100px' } }, [
                h(
                    NTag,
                    {
                        round: true,
                        size: 'small',
                        type: 'info',
                    },
                    {
                        default: () => {
                            return `${parseFloat(row.Identity).toFixed(2)}%`
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Coverage',
        key: 'Coverage',
        align: 'center',
        width: '125',
        render(row: any) {
            return h('div', { style: { width: '100px' } }, [
                h(
                    NTag,
                    {
                        size: 'small',
                        round: true,
                        type: 'info',
                    },
                    {
                        default: () => {
                            return `${parseFloat(row.Coverage).toFixed(2)}%`
                        },
                    }
                ),
            ])
        },
    },
]

const columns3 = createColumns2()

const seeresult = async () => {
    if (checkedRowKeysRef.value.length === 0) {
        window.$message.warning('Please select plasmid ids', {
            closable: true,
            duration: 5000,
        })
    } else {
        phageStore.alignmentloaded = false
        const response2 = await axios.get(`/view_task_result_modules/`, {
            baseURL: '/api/analysis',
            timeout: 100000,
            params: {
                module: 'alignment',
                taskid: taskid.value,
                phageids: checkedRowKeysRef.value.join(', '),
            },
        })
        alignmentdata.value = response2.data.results
        phageStore.phagecomparisondata = alignmentdata.value
        phageStore.alignmentloaded = true
    }
}
</script>
