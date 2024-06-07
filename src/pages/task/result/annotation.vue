<template>
    <div class="flex flex-col mx-1/10 justify-start h-680">
        <div class="w-300 mt-18 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-12">Phage Informtion</div>
                <div class="mt-1.5 ml-10">
                    <el-dropdown class="ml-5">
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
                </div>
            </div>
            <el-descriptions class="w-330 text-xl" :column="2" size="large" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Phage ID</div>
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
            </el-descriptions>
        </div>
        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-200">
                <div class="text-4xl font-500 mb-8">Gene Annotation</div>
            </div>
            <div class="flex flex-row w-330 justify-between mb-5">
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
                :max-height="250"
                :row-key="rowKey"
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
                v-if="annoshow"
            >
                <annotation
                    proteinUrl="http://localhost:8328/public/dataExample/visualization_demo/annotation/demo2.csv"
                    geneUrl="http://localhost:8328/public/dataExample/visualization_demo/annotation/demo.fasta"
                />
            </div>
            <div style="box-shadow: 0 0 64px #cfd5db" class="w-310" v-else>
                <circo
                    proteinUrl="http://localhost:8328/public/dataExample/visualization_demo/annotation/demo2.csv"
                    geneUrl="http://localhost:8328/public/dataExample/visualization_demo/annotation/demo.fasta"
                />
            </div>
        </div>
    </div>

    <el-dialog v-model="proteinVisible" title="Protein Detail" width="90%">
        <proteindetail v-model:proteinInfo="proteinInfo" v-model:dataset="datasets" />
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
import proteindetail from '../../database/protein/detail.vue'
import annotation from '../../visualize/components/annotation.vue'
import circo from '../../visualize/components/circo.vue'
// import phageService from '@/api/phage'

const annoshow = ref(true)
const showswicth = () => {
    annoshow.value = !annoshow.value
}

const phagedata = ref({
    id: 1,
    Acession_ID: '',
    length: '',
    gc_content: '',
    host: '',
    completeness: '',
    taxonomy: '',
    cluster: '',
    subcluster: '',
    Data_Sets: '',
})

const proteinVisible = ref(false)
const proteindata = ref([] as any[])
const proteinInfo = ref()
// const datasets = ref('')
// const route = useRoute()
// const phageid = computed(() => route.query?.phageid as number)

onBeforeMount(async () => {
    const response = await axios.get(`/tasks/result/phage/detail/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            id: phageid.value,
        },
    })
    const { data } = response
    phagedata.value = data

    const response2 = await axios.get(`/tasks/result/proteins/`, {
        baseURL: '/api',
        timeout: 100000,
        params: {
            phageid: phageid.value,
        },
    })
    const prodata = response2.data
    proteindata.value = prodata
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
    protein_sort_class: string
    start_point: string
    end_point: string
    strand: string
}
const rowKey = (row: RowData) => {
    return row.id
}
const createColumns = (): DataTableColumns<RowData> => [
    {
        type: 'selection',
    },

    {
        title: 'Protein ID',
        key: 'Protein_id',
        align: 'center',
    },
    {
        title: 'Source',
        key: 'Source',
        align: 'center',
        width: '120px',
    },
    {
        title: 'Function classification',
        key: 'Protein_function_classification',
        align: 'center',
        width: '250px',
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
                { style: { width: '250px', display: 'flex', justifyContent: 'space-around' } },
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
