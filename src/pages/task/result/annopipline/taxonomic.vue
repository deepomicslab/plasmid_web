<template>
    <div class="h-650 flex flex-col py-10 px-20">
        <div class="mt-5 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Taxonomic Annotation</div>
                <div class="mt-1.5 ml-10">
                    <el-button size="medium" round ghost @click="onClick">
                        <template #icon>
                            <n-icon size="18"><Reader /></n-icon>
                        </template>
                        Task Log
                    </el-button>
                </div>
                <el-dialog v-model="dialogVisible" title="Task Log" width="75%">
                    <log v-model:taskid="taskid" :enableTab="false" :enableTable="false" />
                </el-dialog>
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
                    Taxonomic Annotation
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Submit Sequences</div>
                    </template>
                    {{ taxdata.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Created Time</div>
                    </template>
                    {{ taskdata.results.created_at }}
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="flex flex-row justify-between mt-10 mb-4 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-3xl font-500">Phage List</div>
            </div>
        </div>
        <div v-loading="loading" class="w-330 mt-1 ml-10">
            <el-table :data="phageList" border style="width: 100%" max-height="850">
                <el-table-column prop="id" label="ID" fixed align="center"></el-table-column>
                <el-table-column
                    prop="Acession_ID"
                    label="Phage ID"
                    fixed
                    width="450"
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
                    prop="taxonomy"
                    label="Taxonomy"
                    width="150"
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
        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-400 justify-start">
                <div class="text-4xl font-500 mb-8">Result</div>
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
                :columns="columns"
                :data="taxdata"
                :max-height="1600"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck

// import * as echarts from 'echarts'
import { NTag } from 'naive-ui'
import axios from 'axios'
import _ from 'lodash'
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import log from '../../log.vue'

const dialogVisible = ref(false)
const route = useRoute()
const router = useRouter()
const phagedata = ref({ results: [] })
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
const taxdata = ref([] as any)
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
    loading.value = false

    const response1 = await axios.get(`/tasks/result/phage/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    phagedata.value = response1.data

    const response3 = await axios.get(`tasks/result/modules/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            module: 'taxonomic',
            taskid: taskid.value,
        },
    })
    taxdata.value = response3.data.results
    console.log(taxdata.value)
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

type taxRowData = {
    phage_id: string
    Predicted_Taxonomy: string
    Percentage_of_Hits_to_the_Predicted_Taxonomy: string
    Number_of_HMM_Hits: string
}

const createColumns = (): DataTableColumns<taxRowData> => [
    {
        title: 'Phage ID',
        key: 'phage_id',
        align: 'center',
        width: 200,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Predicted Taxonomy',
        key: 'Predicted_Taxonomy',
        align: 'center',
        width: 200,
    },
    {
        title: 'Percentage_of_Hits_to_the_Predicted_Taxonomy',
        key: 'Percentage_of_Hits_to_the_Predicted_Taxonomy',
        align: 'center',
        sorter: 'default',
        width: '50',
        render(row: any) {
            return h('div', { style: { width: '100px' } }, [
                h(
                    NTag,
                    {
                        type: 'info',
                    },
                    {
                        default: () => row.Percentage_of_Hits_to_the_Predicted_Taxonomy,
                    }
                ),
            ])
        },
    },
    {
        title: 'Number_of_HMM_Hits',
        key: 'Number_of_HMM_Hits',
        align: 'center',
        sorter: 'default',
        width: 50,
        render(row: any) {
            return h('div', { style: { width: '100px' } }, [
                h(
                    NTag,
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => row.Number_of_HMM_Hits,
                    }
                ),
            ])
        },
    },
]

const columns = createColumns()

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

const downloadtsv = () => {
    if (taxdata.value.length !== 0) {
        const headers = _.keys(taxdata.value[0])
        const formattedData = [headers]
        taxdata.value.forEach(item => {
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
