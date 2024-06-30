<template>
    <div v-show="phageStore.phagetransprotein.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Transmembrane Protein
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Transmembrane Protein Data
                </el-button>
            </div>
            <div class="flex w-350">
                <n-data-table
                    v-loading="loading"
                    :data="proteinList"
                    :columns="columns"
                    :max-height="250"
                    :pagination="pagination"
                />
            </div>
        </div>
        <div class="text-2xl font-500 my-10">Annotated Genome Map with Transmembrane Protein</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-300 ml-15"
            v-if="proteinList.length !== 0"
        >
            <transprocirco />
        </div>
    </div>
    <el-dialog v-model="proteinVisible" title="Transmembrane Protein Detail" width="90%">
        <el-descriptions title="" :column="2" size="large" border>
            <el-descriptions-item label="ID">{{ proteinInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="Protein ID">
                {{ proteinInfo.protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Plasmid ID">
                {{ proteinInfo.plasmid }}
            </el-descriptions-item>
            <el-descriptions-item label="Length">{{ proteinInfo.length }}</el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ proteinInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ proteinInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item label="Number of predicted TMHs">
                {{ proteinInfo.number_of_predicted_tmhs }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number of AAs in TMHs">
                {{ proteinInfo.exp_number_of_aas_in_tmhs }}
            </el-descriptions-item>
            <el-descriptions-item label="Exp number, first 60 AAs">
                {{ proteinInfo.exp_numberof_first_60_aas }}
            </el-descriptions-item>
            <el-descriptions-item label="Total prob of N-in">
                {{ proteinInfo.total_prob_of_n_in }}
            </el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ proteinInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ proteinInfo.end }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="flex flex-row ml-1 my-7">
            <div class="font-600">Transmembrane Helices Information</div>
        </div>
        <div v-loading="loading" class="h-60" style="overflow: auto">
            <n-data-table
                :columns="helicesColumns"
                :data="proteinInfo.helices"
                :max-height="1600"
            />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
import { NButton } from 'naive-ui'
import axios from 'axios'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import _ from 'lodash'
import { usePhageStore } from '@/store/phage'
import transprocirco from '../../visualize/components/transprocirco.vue'

const proteinVisible = ref(false)
const proteinInfo = ref()
const phageStore = usePhageStore()
const proteindata = ref([])
const helicedata = ref([])
const loading = ref(false)

const props = defineProps({
    type: String,
    taskid: String,
})

onBeforeMount(async () => {
    loading.value = true
    phageStore.transproteinloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`view_task_result_transmembranes/`, {
            baseURL: '/api/analysis/',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        proteindata.value = response.data.results
    } else {
        const response = await axios.get(`/tmh/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                pagesize: 100000000,
                plasmid_id: phageStore.plasmid_id,
            },
        })
        proteindata.value = response.data.results
    }
    phageStore.phagetransprotein = proteindata.value

    const response = await axios.get(`/get_plasmid_tmhs/`, {
        baseURL: '/api/database/',
        timeout: 100000,
        params: {
            plasmid_id: phageStore.plasmid_id,
        },
    })
    helicedata.value = response.data
    phageStore.heliceData = helicedata.value
    loading.value = false
    phageStore.transproteinloaded = true
})

const proteinList = computed(() => {
    if (proteindata.value.length === 0) {
        return []
    }
    return proteindata.value
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

type RowData = {
    id: number
    plasmid: string
    plasmid_id: string
    protein_id: string
    start: string
    end: string
    strand: string
    length: string
    number_of_predicted_tmhs: string
    source: string
    position: string
    self_start: string
    self_end: string
    exp_number_of_aas_in_tmhs: string
    exp_numberof_first_60_aas: string
    total_prob_of_n_in: string
    helices: Array
}

const createHelicesColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Position',
        key: 'position',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'Start',
        key: 'self_start',
        align: 'center',
        sorter: 'default',
        sortOrder: 'ascend',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'End',
        key: 'self_end',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
]
const helicesColumns = createHelicesColumns()

const createColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Protein ID',
        key: 'protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Length',
        key: 'length',
        align: 'center',
        sorter: 'default',
        width: 220,
    },
    {
        title: 'Predicted TMHs Number',
        key: 'number_of_predicted_tmhs',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Action',
        key: 'actions',
        width: '220px',
        align: 'center',
        fixed: 'right',
        render(row: any) {
            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
                [
                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'info',
                            onClick: () => {
                                proteinInfo.value = row
                                proteinVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()
const downloadtsv = () => {
    console.log(proteinList.value)
    if (proteinList.value.length !== 0) {
        const headers = _.keys(proteinList.value[0])
        const formattedData = [headers]
        proteinList.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'transmembrane_protein.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
