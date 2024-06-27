<template>
    <div class="h-600 flex flex-col py-10 px-30 pl-80">
        <div class="mt-5">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Lifestyle Prediction</div>
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
                            :moduleName="'lifestyle'"
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
                    Lifestyle Prediction
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ lifestylelist.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="flex flex-row w-200 mt-10">
            <div class="text-4xl font-500 mb-4">Overview</div>
        </div>
        <div class="flex flex-row">
            <div class="w-190 h-90 mb-10 mt-5" style="box-shadow: 0 0 64px #cfd5db">
                <div id="myEcharts" class="w-190 h-90" ref="echartDom"></div>
            </div>
        </div>
        <div class="flex flex-row w-200 mt-10">
            <div class="text-4xl font-500 mb-4">Result</div>
            <div class="text-4xl font-500 mb-4">
                <el-button type="primary" class="ml-5" @click="donwloadresult">
                    Download Result
                </el-button>
            </div>
        </div>
        <div class="w-260 mt-5">
            <el-table :data="lifestylelist" style="width: 100%" border max-height="850">
                <el-table-column
                    prop="phageid"
                    label="Phage ID"
                    align="center"
                    fixed
                ></el-table-column>
                <el-table-column label="Lifestyle" width="300" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.lifestyle === 'temperate' ? 'primary' : 'warning'"
                            size="large"
                        >
                            {{ scope.row.lifestyle }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'
// import { usetaskStore } from '@/store/task'
// import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import { Reader } from '@vicons/ionicons5'
import { lifestyleoption } from '@/utils/overview'
import log from '../../log.vue'

const dialogVisible = ref(false)
const route = useRoute()
const echartDom = ref<HTMLElement | null>(null)
// const taskStore = usetaskStore()
const taskid = computed(() => route.query?.taskid as string)
const lifestyledata = ref([] as any[])

const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
    },
})

const onClick = () => {
    dialogVisible.value = true
}

onBeforeMount(async () => {
    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response2.data

    const response = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'lifestyle',
            taskid: taskid.value,
        },
    })
    const { data } = response
    lifestyledata.value = data.results

    const lifestyleCounts = _.countBy(data.results, 'lifestyle')

    const result = _.map(lifestyleCounts, (value, key) => {
        return { value, name: key }
    })
    lifestyleoption.series[0].data = result
    const myEcharts = echarts.init(echartDom.value as HTMLElement)
    myEcharts.setOption(lifestyleoption)
})

const lifestylelist = computed(() => lifestyledata.value)

const donwloadresult = () => {
    if (lifestylelist.value.length !== 0) {
        const headers = _.keys(lifestylelist.value[0])
        const formattedData = [headers]
        lifestylelist.value.forEach((item: any) => {
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
</script>
