<template>
    <div class="flex flex-col mx-1/10 justify-start h-680">
        <div class="mt-15">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Comparative Tree Construction</div>
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
                            moduleName="tree"
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
                    Comparative Tree Construction
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    105
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="flex flex-row justify-between mt-18 mb-4">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Download Result</div>
            </div>
        </div>
        <el-descriptions class="w-330 text-xl" :column="1" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Comparative Tree Results (sequence.phy)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="treeurl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Alfree Result (demotree.txt)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="alfree_outputurl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="mt-5 mb-10">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-5">Comparative Tree</div>
            </div>
            <el-scrollbar
                style="box-shadow: 0 0 64px #cfd5db"
                class="h-240 w-300 flex flex-col justify-center items-center pt-25"
            >
                <tree />
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */

import axios from 'axios'
// import tree from '../../../../visualize/components/tree1.vue'
import { Reader } from '@vicons/ionicons5'
import tree from '../../../../visualizer/simpletree/index.vue'
import { useClusterStore } from '@/store/cluster'
import log from '../../../log.vue'

const dialogVisible = ref(false)
const clusterStore = useClusterStore()
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

onBeforeMount(async () => {
    clusterStore.dataload = false
    const response = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response.data
    const response2 = await axios.get(`/view_task_result_tree/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    clusterStore.tasktreetext = response2.data
    clusterStore.dataload = true
})
const taskdetail = computed(() => {
    return taskdata.value.results
})
/// home/platform/phage_db/phage_api/workspace/user_task/1690162280_8759/output/rawdata/tree/sequence.phy
const treeurl = computed(() => {
    return `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/tree/sequence.phy`
})
/// home/platform/phage_db/phage_api/workspace/user_task/1690162280_8759/output/rawdata/tree/alfree_output.txt
const alfree_outputurl = computed(() => {
    return `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/tree/alfree_output.txt`
})
</script>
