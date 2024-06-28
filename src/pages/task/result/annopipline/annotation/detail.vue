<template>
    <div class="flex flex-col mx-1/10 justify-start">
        <div class="w-300 mt-18 ml-10">
            <div class="flex flex-row w-380 border-b-2 border-gray-300 pb-4 mb-10">
                <div class="text-4xl font-500">Plasmid Informtion</div>
                <!-- <div class="mt-1.5 ml-10">
                    <el-button class="ml-5">
                        <template #icon>
                            <n-icon><di /></n-icon>
                        </template>
                        Download Phage Result
                    </el-button>
                </div> -->
            </div>
            <el-descriptions
                class="w-380 text-xl"
                :column="2"
                size="large"
                border
                v-loading="phagedetailloading"
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Plasmid ID</div>
                    </template>
                    {{ phagedetail.Acession_ID }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Genome Length(bp)</div>
                    </template>
                    {{ phagedetail.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">GC Content(%)</div>
                    </template>
                    {{ parseFloat(phagedetail.gc_content).toFixed(2) }}%
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Genes</div>
                    </template>
                    {{ genes }}
                </el-descriptions-item>

                <el-descriptions-item v-if="hascheckv">
                    <template #label>
                        <div class="cell-item">Completeness</div>
                    </template>
                    <el-tag effect="dark" type="success">{{ phagedetail.completeness }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item v-if="hascheckv">
                    <template #label>
                        <div class="cell-item">Taxonomy</div>
                    </template>
                    {{ phagedetail.taxonomy }}
                </el-descriptions-item>
                <el-descriptions-item v-if="hashost">
                    <template #label>
                        <div class="cell-item">Host</div>
                    </template>
                    {{ phagedetail.host }}
                </el-descriptions-item>
                <el-descriptions-item v-if="haslifestyle">
                    <template #label>
                        <div class="cell-item">Lifestyle</div>
                    </template>
                    {{ phagedetail.lifestyle }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-380 mt-15 ml-10">
            <div class="flex flex-row w-380 border-b-2 border-gray-300 mb-8 pb-4">
                <div class="text-4xl font-500">Gene Annotation</div>
            </div>
            <div class="flex flex-row w-330 justify-between mb-5" v-if="false">
                <el-dropdown>
                    <el-button>
                        <template #icon>
                            <n-icon><di /></n-icon>
                        </template>
                        Download Sequence
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="downloadall">All Data</el-dropdown-item>
                            <el-dropdown-item @click="downloadselected">
                                Selected Data
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!-- <el-input class="w-50" size="small">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input> -->
            </div>
            <n-data-table
                :data="proteinList"
                :columns="columns"
                :pagination="pagination"
                :max-height="350"
                :row-key="rowKey"
                v-loading="proteinloading"
            />
        </div>

        <div class="mt-5 ml-15 mb-10">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-5">Annotated Genome Map</div>
                <div class="mt-1.5 ml-10">
                    <el-button @click="showswicth" v-show="annoshow">View in Circo</el-button>
                    <el-button @click="showswicth" v-show="!annoshow">View in Detail</el-button>
                </div>
            </div>
            <div
                style="box-shadow: 0 0 64px #cfd5db"
                class="w-310 h-200 mt-5 ml-10"
                v-show="annoshow"
            >
                <annotation />
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="w-310" v-show="!annoshow">
                <circo />
            </div>
        </div>
        <div class="mb-10">
            <div class="mt-30 ml-10" v-if="moduelshowdict.terminator">
                <term :taskid="taskid" type="taskresult" />
            </div>

            <div class="mt-30 ml-10" v-if="moduelshowdict.trna">
                <trna :taskid="taskid" type="taskresult" />
            </div>

            <div class="mt-15 ml-10" v-if="moduelshowdict.crispr">
                <crispr :taskid="taskid" type="taskresult" />
            </div>
            <div class="mt-30 ml-10" v-if="moduelshowdict.arvf">
                <arvf :taskid="taskid" type="taskresult" />
            </div>
            <div class="ml-10" v-if="moduelshowdict.transmembrane">
                <transprotein :taskid="taskid" type="taskresult" />
            </div>
            <div class="mt-30 ml-10" v-if="moduelshowdict.transmembrane">
                <anti :taskid="taskid" type="taskresult" />
            </div>
        </div>
    </div>

    <el-dialog v-model="proteinVisible" title="Protein Detail" width="90%">
        <proteindetail
            v-model:proteinInfo="proteinInfo"
            v-model:dataset="datasets"
            type="taskresult"
        />
    </el-dialog>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import { ArrowDown } from '@element-plus/icons-vue'
import axios from 'axios'
import { NButton, NTag } from 'naive-ui'

// import { dataset } from '@/utils/phage'
import proteindetail from '../../../../database/protein/detail.vue'
import annotation from '../../../../visualize/components/annotation.vue'
// import circo from '../../../../visualize/components/circo.vue'
// import term from '../../../../database/phage/terminator.vue'
// import trna from '../../../../database/phage/trna.vue'
// import crispr from '../../../../database/phage/crispr.vue'
// import arvf from '../../../../database/phage/arvf.vue'
// import transprotein from '../../../../database/phage/transprotein.vue'
// import anti from '../../../../database/phage/anti.vue'
// import phageService from '@/api/phage'
import { usePhageStore } from '@/store/phage'

const annoshow = ref(true)
const showswicth = () => {
    annoshow.value = !annoshow.value
}

const phagedata = ref({
    id: 1,
    Acession_ID: '',
    length: '',
    gc_content: '',
})

const moduelshowdict = ref({
    terminator: false,
    trna: false,
    crispr: false,
    arvf: false,
    transmembrane: false,
    anticrispr: false,
})
const proteinVisible = ref(false)
const proteindata = ref([] as any[])

const proteinInfo = ref()
const phageStore = usePhageStore()
const route = useRoute()
const phageid = computed(() => route.query?.phageid as string)
const taskid = computed(() => route.query?.taskid as string)
const phagedetailloading = ref(false)
const proteinloading = ref(false)
const taskdata = ref({
    results: {
        modulelist: [],
    },
})

onBeforeMount(async () => {
    phageStore.phageid = phageid.value
    phagedetailloading.value = true
    proteinloading.value = true
    const responsetask = await axios.get(`/view_task_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            taskid: taskid.value,
        },
    })
    taskdata.value = responsetask.data
    if (taskdata.value.results.modulelist.includes('terminator')) {
        moduelshowdict.value.terminator = true
    }
    if (taskdata.value.results.modulelist.includes('trna')) {
        moduelshowdict.value.trna = true
    }
    if (taskdata.value.results.modulelist.includes('crispr')) {
        moduelshowdict.value.crispr = true
    }
    if (taskdata.value.results.modulelist.includes('arvf')) {
        moduelshowdict.value.arvf = true
    }
    if (taskdata.value.results.modulelist.includes('transmembrane')) {
        moduelshowdict.value.transmembrane = true
    }
    if (taskdata.value.results.modulelist.includes('anticrispr')) {
        moduelshowdict.value.anticrispr = true
    }
    const response = await axios.get(`/view_task_result_plasmid_detail/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            phageid: phageid.value,
            taskid: taskid.value,
        },
    })
    const { data } = response
    phagedata.value = data.results
    phagedetailloading.value = false
    phageStore.phagedataloaded = false
    const response1 = await axios.get(`/view_task_result_plasmid_fasta/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            phageid: phageid.value,
            taskid: taskid.value,
        },
    })
    const response2 = await axios.get(`/view_task_result_proteins/`, {
        baseURL: '/api/analysis',
        timeout: 100000,
        params: {
            phageid: phageid.value,
            taskid: taskid.value,
        },
    })

    const prodata = response2.data
    proteindata.value = prodata.results
    proteinloading.value = false
    phageStore.phagefastadata = response1.data
    phageStore.phageprotein = prodata.results
    phageStore.phagedataloaded = true
})

const phagedetail = computed(() => phagedata.value)

const proteinList = computed(() => proteindata.value)

const genes = computed(() => {
    return proteinList.value.length
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
    Phage_Acession_ID: string
    protein_id: string
    annotate_Source: string
    protein_product: string
    Protein_function_classification: string
    start_point: string
    end_point: string
    strand: string
}
const rowKey = (row: RowData) => {
    return row.id
}
const createColumns = (): DataTableColumns<RowData> => [
    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
    },

    {
        title: 'Function classification',
        key: 'Protein_function_classification',
        align: 'center',
        width: '200px',
        filterOptions: [
            {
                label: 'hypothetical',
                value: 'hypothetical',
            },
            {
                label: 'infection',
                value: 'infection',
            },
            {
                label: 'assembly',
                value: 'assembly',
            },
            {
                label: 'unsorted',
                value: 'unsorted',
            },
            {
                label: 'replication',
                value: 'replication',
            },
            {
                label: 'packaging',
                value: 'packaging',
            },
            {
                label: 'lysis',
                value: 'lysis',
            },
            {
                label: 'regulation',
                value: 'regulation',
            },
            {
                label: 'immune',
                value: 'immune',
            },
            {
                label: 'integration',
                value: 'integration',
            },
            {
                label: 'tRNA',
                value: 'tRNA',
            },
            {
                label: 'mix',
                value: 'mix',
            },
        ],
        filter(value: any, row: any) {
            return row.Protein_function_classification.includes(value)
        },
        render(row: any) {
            const tagnode = []
            const classlist = row.Protein_function_classification.split(';').slice(
                0,
                -1
            ) as string[]
            classlist.forEach((item, index) => {
                tagnode.push(
                    h(
                        NTag,
                        {
                            size: 'small',
                            type: 'info',
                        },
                        {
                            default: () => {
                                return classlist[index]
                            },
                        }
                    )
                )
            })

            return h(
                'div',
                { style: { width: '200px', display: 'flex', justifyContent: 'space-around' } },
                tagnode
            )
        },
    },
    {
        title: 'Protein Product',
        key: 'Protein_product',
        align: 'center',
        width: '250px',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Function Prediction Source',
        key: 'protein_function_prediction_source',
        align: 'center',
        width: '250px',
        render(row: any) {
            return h('div', {}, [
                h(
                    NTag,
                    {
                        type: 'info',
                        size: 'small',
                    },
                    {
                        default: () => {
                            return row.protein_function_prediction_source
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Start Point',
        key: 'Start_location',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'Stop_location',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'Strand',
        width: '90px',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'actions',
        width: 100,
        align: 'center',
        render(row) {
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
                                console.log(row)
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
</script>
