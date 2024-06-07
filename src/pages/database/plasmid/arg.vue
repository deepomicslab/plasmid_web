<template>
    <div v-show="phageStore.phagearg.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Antimicrobial Resistance Gene
            </div>
            <div v-if="argList.length !== 0" class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv_arg">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Antimicrobial Resistance Gene Data
                </el-button>
            </div>
            <div v-if="argList.length !== 0" class="flex-col w-350">
                <n-data-table
                    v-loading="loading"
                    :data="argList"
                    :columns="argColumns"
                    :max-height="250"
                    :pagination="argPagination"
                />
            </div>
        </div>

        <div class="text-2xl font-500 my-10">
            Annotated Genome Map with Antimicrobial Resistance Gene
        </div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-300 h-320 ml-20"
            v-if="argList.length !== 0"
        >
            <argcirco />
        </div>
    </div>
    <el-dialog v-model="detailVisible" title="Antimicrobial Resistance Gene Detail" width="80%">
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
            <el-descriptions-item label="Cut_Off">
                {{ detailInfo.cutoff }}
            </el-descriptions-item>
            <el-descriptions-item label="HSP identifier">
                {{ detailInfo.hsp_identifier }}
            </el-descriptions-item>
            <el-descriptions-item label="Best_Hit_ARO">
                {{ detailInfo.best_hit_aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Best_Identities">
                {{ detailInfo.best_identities }}
            </el-descriptions-item>
            <el-descriptions-item label="ARO">
                {{ detailInfo.aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Drug Class">
                {{ detailInfo.drug_class }}
            </el-descriptions-item>
            <el-descriptions-item label="Resistance Mechanism">
                {{ detailInfo.resistance_mechanism }}
            </el-descriptions-item>
            <el-descriptions-item label="AMR Gene Family">
                {{ detailInfo.amr_gene_family }}
            </el-descriptions-item>
            <el-descriptions-item label="Antibiotic">
                {{ detailInfo.antibiotic }}
            </el-descriptions-item>
            <el-descriptions-item label="SNPs_in_Best_Hit_ARO">
                {{ detailInfo.snps_in_best_hit_aro }}
            </el-descriptions-item>
            <el-descriptions-item label="Other_SNPs">
                {{ detailInfo.other_snps }}
            </el-descriptions-item>
        </el-descriptions>
        <div class="w-350 mt-6">
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
import argcirco from '../../visualize/components/argcirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const phageStore = usePhageStore()
const argdata = ref([])
const loading = ref(false)
const detailInfo = ref()
const detailVisible = ref(false)

onBeforeMount(async () => {
    loading.value = true
    phageStore.argloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`tasks/result/phage/arvgs/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        argdata.value = response.data.results
    } else {
        const response = await axios.get(`/arg/`, {
            baseURL: '/api/database/',
            timeout: 100000,
            params: {
                plasmid_id: phageStore.plasmid_id,
            },
        })
        argdata.value = response.data.results
    }
    console.log(argdata.value, '====')
    loading.value = false
    phageStore.argloaded = true
    phageStore.phagearg = argdata.value
    console.log(phageStore.phagearg, '???')
})
const argList = computed(() => argdata.value)

const argPagination = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    onChange: (page: number) => {
        argPagination.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        argPagination.pageSize = pageSize
        argPagination.page = 1
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
    cutoff: string
    hsp_identifier: string
    best_hit_aro: string
    best_identities: string
    aro: string
    drug_class: string
    resistance_mechanism: string
    amr_gene_family: string
    antibiotic: string
    sequence: string
    snps_in_best_hit_aro: string
    other_snps: string
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
        title: 'Drug Class',
        key: 'drug_class',
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
const argColumns = createVfColumns()

const downloadtsv_arg = () => {
    console.log(argList.value)
    if (argList.value.length !== 0) {
        const headers = _.keys(argList.value[0])
        const formattedData = [headers]
        argList.value.forEach(item => {
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
