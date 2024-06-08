<template>
    <div v-show="phageStore.phagevf.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Virulent Factor
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
        </div>

        <div class="text-2xl font-500 my-10">Annotated Genome Map with Virulent Factor</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-300 ml-20"
            v-if="vfList.length !== 0"
        >
            <vfcirco />
        </div>
    </div>
    <el-dialog v-model="detailVisible" title="Virulent Factor Detail" width="80%">
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
            <el-descriptions-item label="Orf Prediction Source">
                {{ detailInfo.orf_source }}
            </el-descriptions-item>
            <el-descriptions-item label="Product">
                {{ detailInfo.product }}
            </el-descriptions-item>
            <el-descriptions-item label="VFSeq_ID">
                {{ detailInfo.vf_seq_id }}
            </el-descriptions-item>
            <el-descriptions-item label="Identity">
                {{ detailInfo.identity }}
            </el-descriptions-item>
            <el-descriptions-item label="E-value">
                {{ detailInfo.e_value }}
            </el-descriptions-item>
            <el-descriptions-item label="Gene_Name">
                {{ detailInfo.gene_name }}
            </el-descriptions-item>
            <el-descriptions-item label="VFID">
                {{ detailInfo.vf_id }}
            </el-descriptions-item>
            <el-descriptions-item label="VF_Name">
                {{ detailInfo.vf_name }}
            </el-descriptions-item>
            <el-descriptions-item label="VF_FullName">
                {{ detailInfo.vf_fullname }}
            </el-descriptions-item>
            <el-descriptions-item label="VFCID">
                {{ detailInfo.vf_cid }}
            </el-descriptions-item>
            <el-descriptions-item label="Vfcategory">
                {{ detailInfo.vf_category }}
            </el-descriptions-item>
            <el-descriptions-item label="Characteristics">
                {{ detailInfo.characteristics }}
            </el-descriptions-item>
            <el-descriptions-item label="Structure">
                {{ detailInfo.structure }}
            </el-descriptions-item>
            <el-descriptions-item label="Function">
                {{ detailInfo.function }}
            </el-descriptions-item>
            <el-descriptions-item label="Mechanism">
                {{ detailInfo.mechanism }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-310 mt-6">
            <div class="flex flex-row w-350">
                <div class="text-xl font-300 mb-4">Protein Sequence</div>
            </div>

            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="detailInfo.sequence"
            />
        </div>
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
import vfcirco from '../../visualize/components/vfcirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const phageStore = usePhageStore()
const vfdata = ref([])
const loading = ref(false)
const detailInfo = ref()
const detailVisible = ref(false)

onBeforeMount(async () => {
    loading.value = true
    phageStore.vfloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`tasks/result/phage/arvgs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        vfdata.value = response.data.results
    } else {
        const response = await axios.get(`/vf/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                plasmid_id: phageStore.plasmid_id,
            },
        })
        vfdata.value = response.data.results
    }
    console.log(vfdata.value, '====')
    loading.value = false
    phageStore.vfloaded = true
    phageStore.phagevf = vfdata.value
    console.log(phageStore.phagevf, '???')
})
const vfList = computed(() => vfdata.value)

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
    plasmid: string
    plasmid_id: string
    protein_id: string
    start: string
    end: string
    strand: string
    product: string
    orf_source: string
    vf_seq_id: string
    identity: string
    e_value: string
    gene_name: string
    vf_id: string
    vf_name: string
    vf_fullname: string
    vf_cid: string
    vf_category: string
    characteristics: string
    structure: string
    function: string
    mechanism: string
    sequence: string
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
        title: 'VF Category',
        key: 'vf_category',
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
const vfColumns = createVfColumns()

const downloadtsv_vf = () => {
    console.log(vfList.value)
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
</script>
