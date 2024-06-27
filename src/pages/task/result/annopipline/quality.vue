<template>
    <div class="h-1580 flex flex-col py-10 px-30">
        <div class="mt-5" v-loading="loading">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Completeness Assessment</div>
                <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="onClick">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="Task Log" width="60%">
                        <log
                            v-model:taskid="taskid"
                            :moduleName="'quality'"
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
                    {{ taskdetail.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Status</div>
                    </template>
                    <el-tag :type="taskdetail.status === 'Success' ? 'success' : 'warning'">
                        {{ taskdetail.status }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Module</div>
                    </template>
                    Completeness Assessment
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Use Tools</div>
                    </template>
                    CheckV v0.8.1
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ completenesList.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdetail.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="flex flex-row justify-between mt-18 mb-4">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Download Output Result</div>
            </div>
        </div>
        <el-descriptions class="w-330 text-xl" :column="1" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">checkv_result.txt</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="checkv_resulturl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">completeness.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="completenessurl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">quality_summary.tsv</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="qualityurl" target="_blank" class="btn">Click to Download</a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="flex flex-row w-200 mt-10">
            <div class="text-3xl font-500 mb-4">Result Overview</div>
        </div>
        <div class="flex flex-row">
            <div class="w-190 h-90 mb-10 mt-5" style="box-shadow: 0 0 64px #cfd5db">
                <div id="myEcharts" class="w-190 h-90" ref="echartDom"></div>
            </div>
            <!-- <div class="w-190 h-90 mb-10 mt-5 ml-20" style="box-shadow: 0 0 64px #cfd5db">
                <div id="myEcharts2" class="w-190 h-90" ref="echartDom2"></div>
            </div> -->
        </div>
        <div class="flex flex-row justify-between mb-4 w-400 mt-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500 mb-8">Completeness</div>
            </div>
        </div>
        <div>
            <div class="w-400">
                <el-table :data="completenesList" style="width: 100%" max-height="800" border>
                    <el-table-column
                        prop="contig_id"
                        label="Contig ID"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="contig_length"
                        label="Contig Length"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="viral_length"
                        label="Viral Length"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_expected_length"
                        label="AAI Expected Length"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_completeness"
                        label="AAI Completeness"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_confidence"
                        label="AAI Confidence"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_error"
                        label="AAI Error"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_num_hits"
                        label="AAI Number of Hits"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_top_hit"
                        label="AAI Top Hit"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_id"
                        label="AAI Identity"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="aai_af"
                        label="AAI Alignment Fraction"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="hmm_completeness_lower"
                        label="HMM Completeness Lower"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="hmm_completeness_upper"
                        label="HMM Completeness Upper"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="hmm_num_hits"
                        label="HMM Number of Hits"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="kmer_freq"
                        label="Kmer Frequency"
                        align="center"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="flex flex-row justify-between mb-4 w-400 mt-20">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500 mb-8">Quality Summary</div>
            </div>
        </div>
        <div>
            <div class="w-400">
                <el-table :data="qualityList" style="width: 100%" max-height="850" border>
                    <el-table-column
                        prop="contig_id"
                        label="Contig ID"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="contig_length"
                        label="Contig Length"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="provirus"
                        label="Provirus"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="proviral_length"
                        label="Proviral Length"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="gene_count"
                        label="Gene Count"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="viral_genes"
                        label="Viral Genes"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="host_genes"
                        label="Host Genes"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="checkv_quality"
                        label="CheckV Quality"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="miuvig_quality"
                        label="miuvig Quality"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="completeness"
                        label="Completeness"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="completeness_method"
                        label="Completeness Method"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="contamination"
                        label="Contamination"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="kmer_freq"
                        label="Kmer Frequency"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="warnings"
                        label="Warnings"
                        align="center"
                    ></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="flex flex-row justify-between mb-4 mt-20">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500 mb-8">CheckV Result</div>
            </div>
        </div>
        <div>
            <el-table :data="result" border max-height="850" class="w-330">
                <el-table-column
                    prop="phageid"
                    label="Phage ID"
                    width="700"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="Completeness"
                    label="Completeness"
                    align="center"
                ></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */

import { Download } from '@vicons/fa'
import * as echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'
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

const taskresultdata = ref({
    results: { completeness: [], quality_summary: [], checkv_result: [] },
})

const onClick = () => {
    dialogVisible.value = true
}

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get(`/tasks/result/quality/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskresultdata.value = response.data
    const response2 = await axios.get(`/tasks/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    const data2 = response2.data
    taskdata.value = data2
    loading.value = false
})

const taskdetail = computed(() => {
    return taskdata.value.results
})
/// home/platform/phage_db/phage_api/workspace/user_task/1688296838_3083/output/rawdata/quality/checkv_result.txt
const checkv_resulturl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/quality/checkv_result.txt`
})
const completenessurl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/quality/completeness.tsv`
})
const qualityurl = computed(() => {
    return `https://phageapi.deepomics.org/tasks/result/download/${taskdetail.value.uploadpath}/output/rawdata/quality/quality_summary.tsv`
})

const completenesList = computed(() => {
    return taskresultdata.value.results?.completeness
})

const qualityList = computed(() => {
    return taskresultdata.value.results?.quality_summary
})
const result = computed(() => {
    return taskresultdata.value.results?.checkv_result
})
const echartDom = ref<HTMLElement | null>(null)
// const echartDom2 = ref<HTMLElement | null>(null)
const QualityOption = {
    title: {
        text: 'Phage Quality Tier Distribution',
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
            name: 'Phages',
            type: 'bar',
            data: [6, 19, 3, 2, 1],
        },
    ],
}

// const TaxonomyOptions = {
//     title: {
//         text: 'Phage Taxonomy',
//         left: 'center',
//     },
//     toolbox: {
//         itemSize: 20,
//         iconStyle: {
//             borderColor: 'rgb(18,49,73)',
//         },
//         feature: {
//             dataView: { readOnly: true },
//             saveAsImage: {},
//         },
//     },
//     tooltip: {
//         trigger: 'item',
//     },
//     legend: { orient: 'vertical', left: 'left' },
//     series: [
//         {
//             name: 'Phages',
//             type: 'pie',
//             data: [
//                 { value: 1, name: 'Na' },
//                 { value: 28, name: 'Caudovirales' },
//                 { value: 5, name: 'Microviridae' },
//                 { value: 8, name: 'Inoviridae' },
//             ],
//             label: {
//                 fontSize: 15,
//             },
//         },
//     ],
// }

watch(taskresultdata, () => {
    const completenesscount = _.countBy(taskresultdata.value.results.checkv_result, 'Completeness')
    QualityOption.xAxis.data = _.keys(completenesscount)
    QualityOption.series[0].data = _.values(completenesscount)
    const myEcharts = echarts.init(echartDom.value as HTMLElement)
    myEcharts.setOption(QualityOption)

    // const taxonomycount = _.countBy(taskresultdata.value.results.checkv_result, 'Taxonomy')
    // TaxonomyOptions.series[0].data = _.map(taxonomycount, (value, key) => {
    //     if (key === '') {
    //         return { value, name: 'Na' }
    //     }
    //     return { value, name: key }
    // })
    // const myEcharts2 = echarts.init(echartDom2.value as HTMLElement)
    // myEcharts2.setOption(TaxonomyOptions)
})
</script>
