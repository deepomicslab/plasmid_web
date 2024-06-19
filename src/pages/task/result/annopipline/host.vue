<template>
    <div class="h-600 flex flex-col py-10 px-20">
        <div class="mt-5">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Host Assignment</div>
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
                            :moduleName="'host'"
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
                    Host Assignment
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Use Tools</div>
                    </template>
                    <el-tag type="info">DeepHost</el-tag>
                    <el-tag type="info" class="ml-4">BLAST</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ hostlist.length }}
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
        <div class="flex flex-row justify-between mt-8 mb-4">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Prediction Result</div>
                <div class="mt-1.5 ml-4">
                    <n-button @click="donwloadresult">
                        Download TSV Result
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                    </n-button>
                </div>
            </div>
        </div>
        <div>
            <div class="w-400">
                <el-table :data="hostlist" border max-height="850" style="width: 100%">
                    <el-table-column
                        prop="accesion_id"
                        label="Phage ID"
                        fixed
                        width="250"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="host_source"
                        label="Host Source"
                        fixed
                        width="150"
                        align="center"
                    >
                        <template #default="scope">
                            <el-tag
                                :type="scope.row.host_source === 'DeepHost' ? '' : 'success'"
                                disable-transitions
                            >
                                {{ scope.row.host_source }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Genus" label="Genus" width="190" align="center">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Genus"
                                placement="top"
                                :disabled="scope.row.Genus.length < 27"
                            >
                                {{ scope.row.Genus }}
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Family" label="Family" width="190" align="center">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Family"
                                placement="top"
                                :disabled="scope.row.Family.length < 27"
                            >
                                {{ scope.row.Family }}
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Order" label="Order" width="190" align="center">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Order"
                                placement="top"
                                :disabled="scope.row.Order.length < 27"
                            >
                                {{ scope.row.Order }}
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Class" label="Class" width="190" align="center">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Class"
                                placement="top"
                                :disabled="scope.row.Class.length < 27"
                            >
                                {{ scope.row.Class }}
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Phylum" label="Phylum" width="190" align="center">
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.Phylum"
                                placement="top"
                                :disabled="scope.row.Phylum.length < 27"
                            >
                                {{ scope.row.Phylum }}
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="host"
                        label="Host"
                        fixed="right"
                        width="260"
                        align="center"
                    >
                        <template #default="scope">
                            <el-tooltip
                                :content="scope.row.host"
                                placement="top"
                                :disabled="scope.row.host.length < 27"
                            >
                                <p class="text-orange-400">{{ scope.row.host }}</p>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import _ from 'lodash'

import { CloudDownloadOutline as downicon, Reader } from '@vicons/ionicons5'
import * as echarts from 'echarts'
import log from '../../log.vue'

const dialogVisible = ref(false)
const route = useRoute()
const echartDom = ref<HTMLElement | null>(null)
const taskid = computed(() => route.query?.taskid as string)
const hostdata = ref([] as any[])
const taskdata = ref({
    results: {
        id: '',
        status: '',
        modulelist: [],
        uploadpath: '',
        created_at: '',
    },
})
const hostTypeOptions = {
    title: {
        text: 'Host Phylum Distribution',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: 'rgb(175,44,94)',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 167542, name: 'Bacillota' },
                { value: 101632, name: 'Bacteroidota' },
                { value: 77669, name: 'Pseudomonadota' },
                { value: 21341, name: 'Actinomycetota' },
                { value: 7264, name: 'Thermodesulfobacteriota' },
                { value: 66189, name: 'Others' },
            ],
            label: {
                fontSize: 15,
            },
        },
    ],
}

const onClick = () => {
    dialogVisible.value = true
}

onBeforeMount(async () => {
    const response = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 10000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response.data

    const response2 = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 10000,
        params: {
            module: 'host',
            taskid: taskid.value,
        },
    })
    const { data } = response2
    hostdata.value = data.results

    const hostCounts = _.countBy(data.results, 'Phylum')

    const result = _.map(hostCounts, (value, key) => {
        return { value, name: key }
    })
    hostTypeOptions.series[0].data = result
    const myEcharts = echarts.init(echartDom.value as HTMLElement)
    myEcharts.setOption(hostTypeOptions)
})
const hostlist = computed(() => hostdata.value)

const donwloadresult = () => {
    if (hostlist.value.length !== 0) {
        const headers = _.keys(hostlist.value[0])
        const formattedData = [headers]
        hostlist.value.forEach((item: any) => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'host_assignment_result.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
