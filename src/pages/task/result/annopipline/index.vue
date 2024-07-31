<template>
    <div class="h-800 flex flex-col pt-5 px-20 justify-start">
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
        <div class="">
            <el-descriptions class="text-lg" :column="2" size="large" border v-loading="loading">
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">taskid</div>
                    </template>
                    {{ taskid }}
                </el-descriptions-item>
                <!-- <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">modulelist</div>
                    </template>
                    <div class="flex flex-row justify-start w-110 flex-wrap">
                        <el-tag
                            v-for="key in taskdata.results.modulelist"
                            :key="key"
                            type="primary"
                            class="ml-2 mb-2"
                        >
                            {{ key }}
                        </el-tag>
                    </div>
                </el-descriptions-item> -->
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
                <!-- <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">analysis_type</div>
                    </template>
                    {{ taskdata.results.analysis_type }}
                </el-descriptions-item> -->
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">created_at</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="mt-10 mb-10 flex flex-row">
            <div class="text-4xl ml-1 font-600">Your Selected Modules</div>
            <div class="text-lg text-gray-500 ml-6 mt-3">
                Please click the button below to view more details about the module
            </div>
        </div>
        <div class="flex flex-row mb-8 w-350 justify-start flex-wrap h-45">
            <el-button
                @click="gosubmodule('quality')"
                class="mx-3 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('quality')"
            >
                Completeness Assessment
            </el-button>
            <el-button
                @click="gosubmodule('host')"
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('host')"
            >
                Host Assignment
            </el-button>

            <el-button
                @click="gosubmodule('lifestyle')"
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('lifestyle')"
            >
                Lifestyle Predection
            </el-button>
            <el-button
                effect="dark"
                type="primary"
                class="mx-4 h-10"
                @click="gosubmodule('annotation')"
                v-show="taskdetail.modulelist.includes('annotation')"
            >
                ORF prediction & Protein Classification
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('terminator')"
                @click="gosubmodule('terminator')"
            >
                Transcription Terminator Annotation
            </el-button>
            <el-button
                @click="gosubmodule('taxonomic')"
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('taxonomic')"
            >
                Taxonomic Annotation
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                @click="gosubmodule('trna')"
                v-show="taskdetail.modulelist.includes('trna')"
            >
                tRNA & tmRNA Gene Annotation
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('arvf')"
                @click="gosubmodule('arvf')"
            >
                Virulent Factor & Antimicrobial Resistance Gene Detection
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                @click="gosubmodule('anticrispr')"
                v-show="taskdetail.modulelist.includes('anticrispr')"
            >
                Anti-CRISPR Protein Annotation
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                @click="gosubmodule('crispr')"
                v-show="taskdetail.modulelist.includes('crispr')"
            >
                CRISPR Array Annotation
            </el-button>
            <el-button
                class="mx-4 h-10"
                effect="dark"
                type="primary"
                v-show="taskdetail.modulelist.includes('transmembrane')"
                @click="gosubmodule('trans')"
            >
                Transmembrane Protein Annotation
            </el-button>
        </div>

        <div class="flex flex-row my-5">
            <div class="text-4xl ml-1 font-600">Submitted Plasmids</div>
            <div class="mt-1.5 felx flex-row justify-start items-center ml-5">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download TSV Data
                </el-button>
            </div>
            <div class="text-lg text-gray-500 ml-6 mt-3">
                Please click the Detail to view single plasmid information
            </div>
        </div>
        <div v-loading="loading" class="w-400 mt-1">
            <el-table :data="phageList" border style="width: 100%" max-height="850" always>
                <el-table-column prop="id" label="ID" fixed align="center"></el-table-column>
                <el-table-column
                    prop="Acession_ID"
                    label="Plasmid ID"
                    fixed
                    width="400"
                    align="center"
                ></el-table-column>

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
                    label="Completeness"
                    width="150"
                    align="center"
                    v-if="taskdetail.modulelist.includes('quality')"
                >
                    <template #default="{ row }">
                        <n-tag :type="completetype(row.completeness)" size="small">
                            {{ row.completeness }}
                        </n-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="taxonomy"
                    label="Taxonomy"
                    width="150"
                    align="center"
                    v-if="taskdetail.modulelist.includes('taxonomic')"
                ></el-table-column>
                <el-table-column
                    prop="host"
                    label="Host"
                    width="250"
                    align="center"
                    v-if="taskdetail.modulelist.includes('host')"
                ></el-table-column>
                <el-table-column
                    label="Lifestyle"
                    width="250"
                    align="center"
                    v-if="taskdetail.modulelist.includes('lifestyle')"
                >
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.lifestyle === 'temperate' ? 'primary' : 'warning'"
                            size="large"
                        >
                            {{ scope.row.lifestyle }}
                        </el-tag>
                    </template>
                </el-table-column>
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
        <div v-show="taskdetail.modulelist.includes('quality')">
            <div class="flex flex-row my-10">
                <div class="text-4xl ml-1 font-600">Completeness Assessment Overview</div>
            </div>
            <div class="flex flex-row">
                <div class="w-190 h-90 mb-10 mt-5" style="box-shadow: 0 0 64px #cfd5db">
                    <div id="myEcharts" class="w-190 h-90" ref="echartDom"></div>
                </div>
                <div class="w-190 h-90 mb-10 mt-5 ml-20" style="box-shadow: 0 0 64px #cfd5db">
                    <div id="myEcharts2" class="w-190 h-90" ref="echartDom2"></div>
                </div>
            </div>
        </div>
        <div v-show="taskdetail.modulelist.includes('lifestyle')">
            <div class="flex flex-row my-10">
                <div class="text-4xl ml-1 font-600">Lifestyle Overview</div>
            </div>
            <div class="flex flex-row">
                <div class="w-190 h-90 mb-10 mt-5" style="box-shadow: 0 0 64px #cfd5db">
                    <div id="myEcharts1" class="w-190 h-90" ref="echartDom1"></div>
                </div>
            </div>
        </div>
        <div v-show="taskdetail.modulelist.includes('annotation')">
            <div class="flex flex-row my-5">
                <div class="text-4xl ml-1 font-600">Annotation Overview</div>
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="w-400 h-180 mt-10">
                <heatmap />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import { CloudDownloadOutline as downicon, Reader } from '@vicons/ionicons5'
import _ from 'lodash'
import axios from 'axios'
import * as echarts from 'echarts'
import { usetaskStore } from '@/store/task'
import heatmap from '../../../visualize/components/heatmap.vue'
import { usePhageStore } from '@/store/phage'
import log from '../../log.vue'

const phageStore = usePhageStore()
// import phageService from '@/api/phage'
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

    const response = await axios.get(`/view_task_result/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    phagedata.value = response.data
    phageStore.taskphagelist = phagedata.value.results
    const response2 = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = response2.data
    taskStore.taskdetail = taskdata.value

    loading.value = false

    const response3 = await axios.get(`/view_task_result_proteins/`, {
        baseURL: '/api/analysis',
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

const gosubmodule = (key: any) => {
    router.push({
        path: `/task/result/annopipline/${key}`,
        query: { taskid: taskid.value },
    })
}

const completetype = (comp: any) => {
    if (comp === 'Medium-quality') {
        return 'info'
    }
    if (comp === 'High-quality') {
        return 'success'
    }
    if (comp === 'Low-quality') {
        return 'warning'
    }
    if (comp === 'Complete') {
        return 'success'
    }
    return 'warning'
}
const echartDom = ref<HTMLElement | null>(null)
const echartDom1 = ref<HTMLElement | null>(null)
const echartDom2 = ref<HTMLElement | null>(null)

const baseOption = {
    title: {
        text: 'Plasmid Quality Tier Distribution',
        left: 'center',
    },
    tooltip: {},
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: 'rgb(18,49,73)',
        },
        feature: {
            dataView: { readOnly: true },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        data: ['Not-determined', 'Low-quality', 'Medium-quality', 'High-quality', 'Complete'],
        axisLabel: {
            interval: 0,
            fontSize: 16,
        },
    },
    yAxis: {},
    series: [
        {
            name: 'Plamisds',
            type: 'bar',
            data: [6, 19, 3, 2, 1],
        },
    ],
}
const baseOption1 = {
    title: {
        text: 'PLasmid Lifestyle',
    },
    tooltip: {},
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 18, name: 'virulent' },
                { value: 11, name: 'temperate' },
            ],
        },
    ],
}
const baseOption2 = {
    title: {
        text: 'Phage Taxonomy Distribution',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: 'rgb(18,49,73)',
        },
        feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
        },
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        top: '6',
        left: 'left',
        itemHeight: 14,
        textStyle: {
            fontSize: 14,
        },
    },
    series: [
        {
            name: 'Phages',
            type: 'pie',
            data: [
                { value: 1, name: 'Na' },
                { value: 28, name: 'Caudovirales' },
                { value: 5, name: 'Microviridae' },
                { value: 8, name: 'Inoviridae' },
            ],
        },
    ],
}

watch(taskdata, () => {
    if (taskdata.value.results.modulelist.includes('quality')) {
        const completenesscount = _.countBy(phagedata.value.results, 'completeness')
        baseOption.xAxis.data = _.keys(completenesscount)
        baseOption.series[0].data = _.values(completenesscount)
        const myEcharts = echarts.init(echartDom.value as HTMLElement)
        myEcharts.setOption(baseOption)
        const taxonomycount = _.countBy(phagedata.value.results, 'taxonomy')
        baseOption2.series[0].data = _.map(taxonomycount, (value, key) => {
            if (key === '') {
                return { value, name: 'Na' }
            }
            return { value, name: key }
        })
        const myEcharts2 = echarts.init(echartDom2.value as HTMLElement)
        myEcharts2.setOption(baseOption2)
    }
    if (taskdata.value.results.modulelist.includes('lifestyle')) {
        const lifestylecount = _.countBy(phagedata.value.results, 'lifestyle')
        baseOption1.series[0].data = _.map(lifestylecount, (value, key) => {
            if (key === '') {
                return { value, name: 'Na' }
            }
            return { value, name: key }
        })
        const myEcharts1 = echarts.init(echartDom1.value as HTMLElement)
        myEcharts1.setOption(baseOption1)
    }
})

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
    const response = await axios.get(`/view_task_result_plasmid_fasta/`, {
        baseURL: '/api/analysis',
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
