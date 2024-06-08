<template>
    <div v-show="phageStore.phagesp.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Signal Peptides
            </div>
            <div v-if="spList.length !== 0" class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv_sp">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Signal Peptides Data
                </el-button>
            </div>
            <div v-if="spList.length !== 0" class="flex-col w-350">
                <div class="text-2xl font-500 mb-4 w-350 pb-4">Signal Peptides</div>
                <n-data-table
                    v-loading="loading"
                    :data="spList"
                    :columns="spColumns"
                    :max-height="250"
                    :pagination="spPagination"
                />
            </div>
        </div>

        <div class="text-2xl font-500 my-10">Annotated Genome Map with Signal Peptides</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-300 ml-20"
            v-if="spList.length !== 0"
        >
            <spcirco />
        </div>
    </div>
    <el-dialog v-model="detailVisible" title="Signal Peptides Detail" width="80%">
        <el-descriptions title="" :column="2" size="large" border>
            <el-descriptions-item label="ID">{{ detailInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="Protein ID">
                {{ detailInfo.protein_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Plasmid ID">
                {{ detailInfo.plasmid }}
            </el-descriptions-item>
            <el-descriptions-item label="Strand">{{ detailInfo.strand }}</el-descriptions-item>
            <el-descriptions-item label="Start">
                {{ detailInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item label="End">
                {{ detailInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item label="Prediction">
                {{ detailInfo.prediction }}
            </el-descriptions-item>
            <el-descriptions-item label="Product">
                {{ detailInfo.product }}
            </el-descriptions-item>
            <el-descriptions-item label="OTHER">
                {{ detailInfo.other }}
            </el-descriptions-item>
            <el-descriptions-item label="SP(Sec/SPI)">
                {{ detailInfo.sp }}
            </el-descriptions-item>
            <el-descriptions-item label="LIPO(Sec/SPII)">
                {{ detailInfo.lipo }}
            </el-descriptions-item>
            <el-descriptions-item label="TAT(Tat/SPI)">
                {{ detailInfo.tat }}
            </el-descriptions-item>
            <el-descriptions-item label="TATLIPO(Tat/SPII)">
                {{ detailInfo.tatlipo }}
            </el-descriptions-item>
            <el-descriptions-item label="PILIN(Sec/SPIII)">
                {{ detailInfo.pilin }}
            </el-descriptions-item>
            <el-descriptions-item label="CS Position">
                {{ detailInfo.cs_position }}
            </el-descriptions-item>
            <el-descriptions-item label="Probability of CS Position">
                {{ detailInfo.probability_of_cs_position }}
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
// import { NButton } from 'naive-ui'
import axios from 'axios'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'
import _ from 'lodash'
import { usePhageStore } from '@/store/phage'
// eslint-disable-next-line import/extensions
import spcirco from '../../visualize/components/spcirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const phageStore = usePhageStore()
const spdata = ref([])
const loading = ref(false)
const detailInfo = ref()
const detailVisible = ref(false)

onBeforeMount(async () => {
    loading.value = true
    phageStore.sploaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`tasks/result/phage/arvgs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        spdata.value = response.data.results
    } else {
        const response = await axios.get(`/sp/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                plasmid_id: phageStore.plasmid_id,
            },
        })
        spdata.value = response.data.results
    }
    console.log(spdata.value, '====')
    loading.value = false
    phageStore.sploaded = true
    phageStore.phagesp = spdata.value
    console.log(phageStore.phagesp, '???')
})
const spList = computed(() => spdata.value)

const spPagination = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        spPagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        spPagination.pageSize = pageSize
        spPagination.page = 1
    },
})
type VfRowData = {
    id: number
    plasmid: string
    plasmid_id: string
    protein_id: string
    start: string
    end: string
    strand: string
    product: string
    prediction: string
    other: string
    sp: string
    lipo: string
    tat: string
    tatlipo: string
    pilin: string
    cs_position: string
    probability_of_cs_position: string
}
const createVfColumns = (): DataTableColumns<VfRowData> => [
    {
        type: 'selection',
    },

    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'Prediction',
        key: 'prediction',
        align: 'center',
    },
    {
        title: 'Start',
        key: 'start',
        align: 'center',
    },
    {
        title: 'End',
        key: 'end',
        align: 'center',
    },
    {
        title: 'Strand',
        key: 'strand',
        align: 'center',
    },
    {
        title: 'Actions',
        key: 'actions',
        width: 250,
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-around',
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
                                detailInfo.value = row
                                detailVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                ]
            )
        },
    },
]
const spColumns = createVfColumns()

const downloadtsv_sp = () => {
    console.log(spList.value)
    if (spList.value.length !== 0) {
        const headers = _.keys(spList.value[0])
        const formattedData = [headers]
        spList.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'virulent_factor_gene.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
