<template>
    <div class="h-450 flex flex-col pt-5 px-20 justify-start">
        <div class="flex flex-row w-200 mt-12">
            <div class="text-4xl ml-1 font-600 mb-12">
                {{ taskdata.results.analysis_type }}
            </div>
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
                        :moduleName="''"
                        :enableTab="true"
                        :enableTable="false"
                    />
                </el-dialog>
            </div>
        </div>
        <div class="w-400">
            <el-descriptions class="text-lg" :column="2" size="large" border v-loading="loading">
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">taskid</div>
                    </template>
                    {{ taskid }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">task_status</div>
                    </template>
                    <el-tag
                        :type="taskdata.results.status === 'Success' ? 'success' : 'warning'"
                        size="large"
                    >
                        {{ taskdata.results.status }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">created_at</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <div class="mt-10 mb-10 flex flex-row">
                <div class="text-4xl ml-1 font-600">Your Selected Modules</div>
                <div class="text-lg text-gray-500 ml-6 mt-3">
                    Please click the button below to view more details about the module
                </div>
            </div>
            <div class="flex flex-row mb-8 w-350 justify-start flex-wrap h-20">
                <el-button
                    effect="dark"
                    type="primary"
                    class="mr-4 h-10"
                    @click="gosubcompmodule('cluster')"
                    v-show="taskdetail.modulelist.includes('cluster')"
                >
                    Sequence Clustering
                </el-button>
                <el-button
                    effect="dark"
                    type="primary"
                    class="mr-4 h-10"
                    @click="gosubcompmodule('alignment')"
                    v-show="taskdetail.modulelist.includes('alignment')"
                >
                    Sequence Alignment
                </el-button>
                <el-button
                    effect="dark"
                    type="primary"
                    class="mr-4 h-10"
                    @click="gosubcompmodule('tree')"
                    v-show="taskdetail.modulelist.includes('tree')"
                >
                    Comparative Tree Construction
                </el-button>
            </div>
        </div>
        <n-alert
            type="info"
            closable
            :bordered="false"
            class="w-220 bg-[#9ab4c5]"
            v-if="taskdetail.modulelist.includes('comparedatabse')"
        >
            <template #icon>
                <el-icon class="text-[14px] text-[#069]">
                    <InfoFilled />
                </el-icon>
            </template>
            <template #header>
                <p class="text-[16px] text-gray-50">Note</p>
            </template>
            <p class="text-[16px] text-gray-50">
                Found {{ relatedphagecount }} sequences related to the query sequence.
            </p>
        </n-alert>
        <div class="flex flex-row my-5 mt-10">
            <div class="text-4xl ml-1 font-600">Submitted Phages</div>
            <div class="mt-1.5 felx flex-row justify-start items-center ml-5">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download TSV Data
                </el-button>
            </div>
            <div class="text-lg text-gray-500 ml-6 mt-3">
                Please click the Detail to view single phage information
            </div>
        </div>
        <div v-loading="loading" class="w-400 mt-1">
            <el-table :data="phageList" border style="width: 100%" max-height="850" always>
                <el-table-column prop="id" label="ID" fixed align="center"></el-table-column>
                <el-table-column
                    prop="Acession_ID"
                    label="Phage ID"
                    fixed
                    width="520"
                    align="center"
                >
                    <template #default="{ row }">
                        <div v-if="taskdetail.modulelist.includes('comparedatabse')">
                            <div class="text-red-500" v-if="row.source == 'Query'">
                                {{ row.Acession_ID }}
                            </div>
                            <div class="text-sky-800" v-else>{{ row.Acession_ID }}</div>
                        </div>
                        <div v-else class="text-sky-800">
                            {{ row.Acession_ID }}
                        </div>
                    </template>
                </el-table-column>

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
                <el-table-column
                    prop="genes"
                    label="Genes"
                    width="150"
                    align="center"
                    v-if="taskdetail.modulelist.includes('annotation')"
                ></el-table-column>
                <el-table-column
                    prop="source"
                    label="Source"
                    width="200"
                    align="center"
                    v-if="taskdetail.modulelist.includes('comparedatabse')"
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
        <!-- <div v-show="taskdetail.modulelist.includes('annotation')">
            <div class="flex flex-row my-5">
                <div class="text-4xl ml-1 font-600">Annotation Overview</div>
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="w-310 h-150 mt-10">
                <heatmap />
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import { CloudDownloadOutline as downicon, Reader } from '@vicons/ionicons5'
import _ from 'lodash'
import axios from 'axios'
import { InfoFilled } from '@element-plus/icons-vue'
import { usetaskStore } from '@/store/task'
// import heatmap from '../../../visualize/components/heatmap.vue'
import { usePhageStore } from '@/store/phage'
// import phageService from '@/api/phage'
import log from '../../log.vue'

const phageStore = usePhageStore()
const dialogVisible = ref(false)
const loading = ref(false)
const router = useRouter()

const phagedata = ref()
const route = useRoute()
const taskid = computed(() => route.query?.taskid as string)

const taskdata = ref({
    results: {
        modulelist: [],
    },
})
const taskdetail = computed(() => {
    return taskdata.value.results
})

const taskStore = usetaskStore()
onBeforeMount(async () => {
    loading.value = true
    phageStore.heatmaploaded = false

    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response2.data
    taskStore.taskdetail = taskdata.value

    const response = await axios.get(`/tasks/result/phage/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })

    phagedata.value = response.data
    phageStore.taskphagelist = phagedata.value.results
    loading.value = false

    const response3 = await axios.get(`/tasks/result/proteins/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    phageStore.taskproteinlist = response3.data.results

    phageStore.heatmaploaded = true
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

const relatedphagecount = computed(() => {
    return _.filter(phagedata.value?.results, { source: 'PhageScope Database' }).length
})
// const gosubmodule = (key: any) => {
//     router.push({
//         path: `/task/result/annopipline/${key}`,
//         query: { taskid: taskid.value },
//     })
// }

const gosubcompmodule = (key: any) => {
    router.push({
        path: `/task/result/comparison/${key}`,
        query: { taskid: taskid.value },
    })
}

const downloadtsv = () => {
    if (phagedata.value.results.length !== 0) {
        const headers = _.keys(phagedata.value.results[0])
        const formattedData = [headers]
        phagedata.value.results.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'result.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
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
