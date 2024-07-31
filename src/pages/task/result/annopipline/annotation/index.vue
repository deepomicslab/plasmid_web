<template>
    <div class="h-800 flex flex-col pt-5 px-20 justify-start">
        <div class="mt-5">
            <div class="flex flex-row w-250">
                <div class="text-4xl font-500 mb-12">ORF prediction & Protein Classification</div>
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
                            :moduleName="'annotation'"
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
                    ORF prediction & Protein Classification
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ phageList.length }}
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
                    <div class="cell-item">Protein Information (acc_list.txt)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="baseurl + 'acc_list.txt'" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Gene Sequence (gene.fna)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="baseurl + 'gene.fna'" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Protein Sequence (gene.faa)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="baseurl + 'gene.faa'" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">GFF3 file (sequence.gff3)</div>
                </template>
                <n-button class="w-23 h-7 text-lg ml-20" text>
                    <template #icon>
                        <n-icon class="text-lg">
                            <Download />
                        </n-icon>
                    </template>
                    <a :href="baseurl + 'sequence.gff3'" target="_blank" class="btn">
                        Click to Download
                    </a>
                </n-button>
            </el-descriptions-item>
        </el-descriptions>
        <div class="flex flex-row my-5 mt-15 ml-10">
            <div class="text-3xl ml-1 font-500">Submitted Plasmids</div>
            <div class="mt-1.5 felx flex-row justify-start items-center ml-5">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download Data
                </el-button>
            </div>
            <div class="text-lg text-gray-500 ml-6 mt-3">
                Please click the Detail to view single plasmid information
            </div>
        </div>
        <div v-loading="loading" class="w-400 mt-1">
            <el-table :data="phageList" border style="width: 100%" max-height="850">
                <el-table-column prop="id" label="ID" fixed align="center"></el-table-column>
                <el-table-column
                    prop="Acession_ID"
                    label="Plasmid ID"
                    fixed
                    width="450"
                    align="center"
                ></el-table-column>

                <el-table-column
                    prop="gc_content"
                    label="GC Content(%)"
                    width="200"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="length"
                    label="Length(bp)"
                    width="200"
                    align="center"
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

        <div class="flex flex-row my-5">
            <div class="text-4xl ml-1 font-500">Annotation Overview</div>
            <div class="mt-1.5 felx flex-row justify-start items-center ml-5">
                <el-button @click="downloadsvg">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download Charts
                </el-button>
            </div>
        </div>
        <div style="box-shadow: 0 0 64px #cfd5db" class="w-400 h-180 mt-10">
            <heatmap />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import { CloudDownloadOutline as downicon, Reader } from '@vicons/ionicons5'
import _ from 'lodash'
import axios from 'axios'

import heatmap from '../../../../visualize/components/heatmap.vue'
import { usePhageStore } from '@/store/phage'
import log from '../../../log.vue'

const phageStore = usePhageStore()
const loading = ref(false)
const router = useRouter()

const dialogVisible = ref(false)
const onClick = () => {
    dialogVisible.value = true
}

const phagedata = ref()
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
function downloadsvg() {
    const svgElement = document.getElementById('Viz_area') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'annotation.svg'
    link.click()
    URL.revokeObjectURL(url)
}
// const taskresultdata = ref({
//     results: { completeness: [], quality_summary: [], checkv_result: [] },
// })

onBeforeMount(async () => {
    loading.value = true
    phageStore.heatmaploaded = false
    const response2 = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    const data2 = response2.data
    taskdata.value = data2
    const response = await axios.get(`/view_task_result/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })

    phagedata.value = response.data
    phageStore.taskphagelist = phagedata.value.results
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
const taskdetail = computed(() => {
    return taskdata.value.results
})

const baseurl = computed(() => {
    return `https://plasmidapi.deepomics.org/api/analysis/download_task_result_output_file/${taskdetail.value.uploadpath}/output/rawdata/annotation/`
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
