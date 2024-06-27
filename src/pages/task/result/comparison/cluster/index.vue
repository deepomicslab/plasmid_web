<template>
    <div class="flex flex-col mx-1/10 justify-start h-880">
        <div class="mt-15 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Sequence Clustering</div>
                <div class="mt-1.5 ml-10">
                    <!-- <el-button @click="detailinfo = !detailinfo">
                        <el-icon class="mr-2 text-base"><View /></el-icon>
                        Detail
                    </el-button> -->
                    <el-button size="medium" round ghost @click="dialogVisible = true">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                        <log
                            v-model:taskid="taskid"
                            moduleName="cluster"
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
                    Sequence Clustering
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ resultList.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="w-300 mt-15 ml-10">
            <div class="flex flex-row w-350 justify-start">
                <div class="text-4xl font-500 mb-8">Clustering Result</div>
                <div class="mt-1.5 felx flex-row justify-start items-center ml-5">
                    <el-button @click="downloadtsv">
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        Download TSV Data
                    </el-button>
                </div>
            </div>

            <n-data-table
                v-loading="loading"
                :data="resultList"
                :columns="columns"
                :max-height="550"
                :pagination="pagination"
            />
        </div>
        <div class="mt-5 mb-10 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-5">Sequence Clustering Tree</div>
                <el-select
                    v-model="tree_value"
                    class="ml-5"
                    placeholder="Select"
                    @change="clusterchange"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>

            <el-scrollbar style="box-shadow: 0 0 64px #cfd5db" class="h-240 w-330 mt-10">
                <newtree />
            </el-scrollbar>

            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-5 mt-10">Sequence Clustering Heatmap</div>
                <!-- <el-select
                    v-model="tree_value"
                    class="ml-5"
                    placeholder="Select"
                    @change="clusterchange"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select> -->
            </div>
            <el-scrollbar style="box-shadow: 0 0 64px #cfd5db" class="h-240 w-330 mt-10">
                <heatmaptree />
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import axios from 'axios'

import _ from 'lodash'
import { NButton } from 'naive-ui'
import { CloudDownloadOutline as downicon, Reader } from '@vicons/ionicons5'
import log from '../../../log.vue'
// import tree from '../../../../visualize/components/tree1.vue'
import newtree from '../../../../visualizer/tree/index.vue'
import heatmaptree from '../../../../visualizer/treeheatmap/index.vue'
import { useClusterStore } from '@/store/cluster'

// const detailinfo = ref(true)
const dialogVisible = ref(false)
const clusterStore = useClusterStore()
const loading = ref(false)
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
const clusterdata = ref([] as any[])
const tree_value = ref('all')
const options = ref([] as any[])

const annlist = ref([] as any[])
const treedata = ref('')
onBeforeMount(async () => {
    loading.value = true
    clusterStore.dataload = false
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
            module: 'cluster',
            taskid: taskid.value,
        },
    })
    const { data } = response2
    clusterdata.value = data.results.cluster
    clusterStore.taskclusterdata = data.results.cluster
    clusterStore.taskclustercount = data.results.count

    options.value = _.map(_.keys(_.countBy(clusterdata.value, 'cluster')), item => {
        return {
            value: item,
            label: item,
        }
    })
    options.value = _.concat(
        [
            {
                value: 'all',
                label: 'all',
            },
        ],
        options.value
    )

    annlist.value = _.filter(clusterdata.value, { cluster: tree_value.value })
    const response3 = await axios.get(`tasks/result/tree/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            clsuter_id: 'all',
            taskid: taskid.value,
        },
    })
    treedata.value = response3.data
    clusterStore.tasktreetext = treedata.value

    clusterStore.dataload = true
    loading.value = false
})
const resultList = computed(() => {
    return clusterdata.value
})
const taskdetail = computed(() => {
    return taskdata.value.results
})

const clusterchange = async (value: string) => {
    clusterStore.dataload = false
    tree_value.value = value
    const response = await axios.get(`tasks/result/tree/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            clsuter_id: value,
            taskid: taskid.value,
        },
    })
    treedata.value = response.data
    clusterStore.tasktreetext = treedata.value
    if (value === 'all') {
        clusterStore.taskclusterdata = clusterdata.value
    } else {
        clusterStore.taskclusterdata = _.filter(clusterdata.value, { cluster: value })
    }
    clusterStore.dataload = true
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
type resultRowData = {
    phage_id: string
    cluster: string
    subcluster: string
}
const createColumns = (): DataTableColumns<resultRowData> => [
    {
        title: 'Phage ID',
        key: 'phage_id',
        align: 'center',
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
                                query: { phageid: row.phage_id, taskid: taskid.value },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.phage_id
                        },
                    }
                ),
            ])
        },
    },

    {
        title: 'Cluster',
        key: 'cluster',
        align: 'center',
        width: '270',
        render(row: any) {
            return h('div', { style: { width: '250px' } }, [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        color: 'rgb(18,49,73)',
                        onClick: () => {
                            router.push({
                                path: '/task/result/comparison/cluster/clusterdetail',
                                query: {
                                    clusterid: row.cluster,
                                    type: 'cluster',
                                    taskid: taskid.value,
                                },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.cluster
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Subcluster',
        key: 'subcluster',
        align: 'center',
        width: '270',
        render(row: any) {
            return h('div', { style: { width: '250px' } }, [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        color: 'rgb(18,49,73)',
                        onClick: () => {
                            router.push({
                                path: '/task/result/comparison/cluster/clusterdetail',
                                query: {
                                    subclusterid: row.subcluster,
                                    type: 'subcluster',
                                    taskid: taskid.value,
                                },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.subcluster
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Source',
        key: 'Source',
        align: 'center',
        width: '270',
    },
]

const columns = createColumns()

const downloadtsv = () => {
    window.open(
        `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/cluster/result.txt`
    )
}
</script>
