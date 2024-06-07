<template>
    <div v-show="arList.length !== 0 || vfList.length !== 0">
        <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
            Virulent Factor / Antimicrobial Resistance Gene
        </div>
        <div v-if="vfList.length !== 0" class="flex flex-row w-350 justify-between mb-5 mt-8">
            <el-button @click="downloadtsv_vf">
                <template #icon>
                    <n-icon><di /></n-icon>
                </template>
                Download Virulent Factor Gene Data
            </el-button>
        </div>
        <div v-if="vfList.length !== 0" class="flex-col w-350">
            <div class="text-2xl font-500 mb-4 w-350 pb-4">Virulent Factor</div>
            <n-data-table
                v-loading="loading"
                :data="vfList"
                :columns="vfColumns"
                :max-height="250"
                :pagination="vfPagination"
            />
        </div>
        <div v-if="arList.length !== 0" class="flex flex-row w-350 justify-between mb-5 mt-8">
            <el-button @click="downloadtsv_ar">
                <template #icon>
                    <n-icon><di /></n-icon>
                </template>
                Download Antimicrobial Resistance Gene Data
            </el-button>
        </div>
        <div v-if="arList.length !== 0" class="flex-col w-350 mt-10">
            <div class="text-2xl font-500 mb-4 w-350 pb-4">Antimicrobial Resistance Gene</div>
            <n-data-table
                v-loading="loading"
                :data="arList"
                :columns="arColumns"
                :max-height="250"
                :pagination="arPagination"
            />
        </div>

        <div class="text-2xl font-500 my-10">Annotated Genome Map</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-300 h-220 ml-20"
            v-if="arList.length !== 0 || vfList.length !== 0"
        >
            <arvfcirco />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
// import { NButton } from 'naive-ui'
import axios from 'axios'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import _ from 'lodash'
import { usePhageStore } from '@/store/phage'
import arvfcirco from '../../visualize/components/arvfcirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const phageStore = usePhageStore()
const arvfdata = ref({ ar: [], vf: [] })
const loading = ref(false)

onBeforeMount(async () => {
    loading.value = true
    phageStore.arvfloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`tasks/result/phage/arvgs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        arvfdata.value = response.data.results
    } else {
        const response = await axios.get(`/vf/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                plasmid_id: phageStore.plasmid_id,
            },
        })
        arvfdata.value = response.data.results
    }

    console.log(arvfdata.value)
    loading.value = false
    phageStore.arvfloaded = true
    phageStore.phagearvf = arvfdata.value
    console.log(arvfdata.value)
})

const vfList = computed(() => {
    return arvfdata.value?.vf
})

const arList = computed(() => {
    return arvfdata.value?.ar
})

const vfPagination = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        vfPagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        vfPagination.pageSize = pageSize
        vfPagination.page = 1
    },
})
type VfRowData = {
    id: number
    Protein_id: string
    Aligned_Protein_in_VFDB: string
    Phage_Acession_ID: string
    dataset: string
}
const createVfColumns = (): DataTableColumns<VfRowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        width: 130,
    },
    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Aligned Protein in VFDB',
        key: 'Aligned_Protein_in_VFDB',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Dataset',
        key: 'dataset',
        align: 'center',
        width: 130,
        disabled: false,
    },
]
const vfColumns = createVfColumns()

const arPagination = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        arPagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        arPagination.pageSize = pageSize
        arPagination.page = 1
    },
})
type ArRowData = {
    id: number
    Protein_id: string
    Aligned_Protein_in_CARD: string
    Phage_Acession_ID: string
    dataset: string
}
const createArColumns = (): DataTableColumns<ArRowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        width: 130,
    },
    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Aligned Protein in CARD',
        key: 'Aligned_Protein_in_CARD',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },
]
const arColumns = createArColumns()
const downloadtsv_vf = () => {
    if (vfList.value.length !== 0) {
        const headers = _.keys(vfList.value[0])
        const formattedData = [headers]
        vfList.value.forEach(item => {
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
const downloadtsv_ar = () => {
    if (arList.value.length !== 0) {
        const headers = _.keys(arList.value[0])
        const formattedData = [headers]
        arList.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'antimicrobial_resistance_gene.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
