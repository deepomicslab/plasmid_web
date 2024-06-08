<template>
    <div class="flex flex-col mx-1/10 justify-start">
        <div class="w-300 mt-18 ml-10">
            <div class="flex flex-row w-350 border-b-2 border-gray-300">
                <div class="text-4xl font-500 mb-8">Plasmid Informtion</div>
                <div class="mt-1.5 ml-10">
                    <el-button class="ml-5" @click="download">
                        <template #icon>
                            <n-icon><di /></n-icon>
                        </template>
                        Download Phage Data
                    </el-button>
                </div>
            </div>
            <el-descriptions
                class="w-350 text-xl mt-8"
                :column="2"
                size="large"
                border
                v-loading="loaddata"
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Plasmid ID</div>
                    </template>

                    <el-button type="text">
                        <a :href="phagedetail.reference" target="_blank" class="btn">
                            {{ phagedetail.plasmid_id }}
                        </a>
                    </el-button>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Data Source</div>
                    </template>
                    <n-tag type="primary" size="small">
                        {{ datasetList[phagedetail.source] }}
                    </n-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Topology</div>
                    </template>

                    {{ phagedetail.topology }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Completeness</div>
                    </template>
                    <n-tag :type="complete(phagedetail.completeness)" size="small">
                        {{ phagedetail.completeness }}
                    </n-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Genome Length(bp)</div>
                    </template>
                    {{ formatLengthNumber(phagedetail.length) }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Host</div>
                    </template>
                    <el-button type="text" @click="gohost">{{ phagedetail.host }}</el-button>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">GC Content(%)</div>
                    </template>
                    {{ parseFloat(phagedetail.gc_content).toFixed(2) }}%
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">MOB_type</div>
                    </template>
                    <n-tag :type="lifestyleColor(phagedetail.mob_type)" size="small">
                        {{ phagedetail.mob_type }}
                    </n-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Predicted_Mobility</div>
                    </template>
                    <n-tag :type="lifestyleColor(phagedetail.mobility)" size="small">
                        {{ phagedetail.mobility }}
                    </n-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Cluster</div>
                    </template>
                    {{ phagedetail.cluster }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Subcluster</div>
                    </template>
                    {{ phagedetail.subcluster }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Gene</div>
                    </template>
                    {{ genes }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of tRNA & tmRNA</div>
                    </template>
                    {{ phageStore.phagetrna.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Secondary Metabolism</div>
                    </template>
                    {{ phageStore.phageanti.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Signal Peptides</div>
                    </template>
                    {{ phageStore.phagesp.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Virulent Factor</div>
                    </template>
                    {{ phageStore.phagevf.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Antimicrobial Resistance Gene</div>
                    </template>
                    {{ phageStore.phagearg.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item"># of Transmembrane Protein</div>
                    </template>
                    {{ phageStore.phagetransprotein.length }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="w-330 mt-15 ml-10">
            <div class="flex flex-row w-350 border-b-2 border-gray-300">
                <div class="text-4xl font-500 mb-8">Gene Annotation</div>
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Gene Annotation Data
                </el-button>

                <!-- <el-input class="w-50" size="small">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input> -->
            </div>
            <div class="w-350" v-loading="loaddata">
                <n-data-table
                    :data="proteinList"
                    :columns="columns"
                    :pagination="pagination"
                    :max-height="250"
                    :row-key="rowKey"
                />
            </div>
        </div>

        <div class="mt-5 ml-15">
            <div class="flex flex-row w-200">
                <div class="text-2xl font-500 mb-5">Annotated Genome Map</div>
                <div class="mt-1.5 ml-10">
                    <el-button @click="showswicth" v-show="annoshow">View in Circo</el-button>
                    <el-button @click="showswicth" v-show="!annoshow">View in Detail</el-button>
                </div>
            </div>
            <div
                style="box-shadow: 0 0 64px #cfd5db"
                class="w-310 h-250 mt-5 ml-10 mb-20"
                v-show="annoshow"
            >
                <annotation />
            </div>
        </div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-350 h-300 ml-2 mt-5 mb-20"
            v-show="!annoshow"
        >
            <circo />
        </div>
        <!-- <div class="mt-20 ml-10" v-show="phageStore.phageterminator.length !== 0">
            <terminator />
        </div> -->
        <!-- <div class="mt-20 ml-10" v-show="phageStore.phageanti.length !== 0"><anti /></div> -->
        <div class="mt-20 ml-10 w-310 h-480" v-show="phageStore.phagesp.length !== 0"><sp /></div>
        <div class="mt-20 ml-10 w-310 h-480" v-show="phageStore.phagearg.length !== 0"><arg /></div>
        <div class="mt-20 ml-10 w-310 h-480" v-show="phageStore.phagevf.length !== 0">
            <vf />
        </div>
        <div
            class="mt-20 ml-10 mb-20 w-310 h-480"
            v-show="phageStore.phagetransprotein.length !== 0"
        >
            <transprotein />
        </div>
        <div class="mt-20 ml-10 mb-20 w-310 h-480" v-show="phageStore.phagetrna.length !== 0">
            <trna />
        </div>
    </div>

    <el-dialog v-model="proteinVisible" title="Protein Detail" width="90%">
        <proteindetail v-model:proteinInfo="proteinInfo" v-model:dataset="datasets" />
    </el-dialog>
    <el-dialog
        v-model="downloadphagedialogVisible"
        title="Select download data type"
        width="30%"
        align-center
    >
        <div>
            <el-checkbox-group v-model="checkList" :max="1">
                <el-checkbox label="Download FASTA Data" />
                <!-- <el-checkbox label="Download GBK Data" /> -->
                <el-checkbox label="Download GFF3 Data" />
                <el-checkbox label="Download Meta Data" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="downloadphagedialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="downloadrequest">Download</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- <el-dialog
        v-model="downloadproteindialogVisible"
        title="Select download data type"
        width="30%"
        align-center
    >
        <div>
            <el-checkbox-group v-model="proteincheckList">
                <el-checkbox label="Download FASTA DATA" />
                <el-checkbox label="Download Meta DATA" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="downloadproteindialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="downloadrequest">Download</el-button>
            </span>
        </template>
    </el-dialog> -->
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable camelcase */
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
//
import axios from 'axios'
import { NButton, NTag } from 'naive-ui'
import _ from 'lodash'
import { datasetList, COGCategoryDict } from '@/utils/phage'
import proteindetail from '../protein/detail.vue'
import annotation from '../../visualize/components/annotation.vue'
import circo from '../../visualize/components/circo.vue'
// import terminator from './terminator.vue'
import sp from './sp.vue'
import arg from './arg.vue'
import trna from './trna.vue'
import transprotein from './transprotein.vue'
import vf from './vf.vue'
import { usePhageStore } from '@/store/phage'
// import { useVisualizeStore } from '@/store/visualize'
// const visualizeStore = useVisualizeStore()

const phageStore = usePhageStore()
const loaddata = ref(false)
const annoshow = ref(true)
const showswicth = () => {
    annoshow.value = !annoshow.value
}
const route = useRoute()
const plasmid_id = computed(() => route.query?.plasmid_id as number)

const phagedata = ref({
    id: 1,
    plasmid_id: '',
    length: '',
    gc_content: '',
    host: '',
    completeness: '',
    topology: '',
    cluster: '',
    subcluster: '',
    mob_type: '',
    mobility: '',
    source: '',
    reference: '',
})

const proteinVisible = ref(false)
const proteindata = ref([] as any[])
const proteinInfo = ref()
const datasets = ref('')

const downloadphagedialogVisible = ref(false)

const downloadtype = ref('')
const checkList = ref([] as any[])
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const router = useRouter()
const genes = ref()

const downloadrequest = async () => {
    if (checkList.value.length === 0) {
        window.$message.warning('Please select download data type', {
            closable: true,
            duration: 5000,
        })
    } else {
        if (checkList.value.includes('Download Meta Data')) {
            window.open(`/api/phage/meta/?plasmid_id=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(`/api/phage/fasta/?plasmid_id=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            window.open(`/api/phage/gff/?plasmid_id=${checkedRowKeysRef.value[0]}`, '_blank')
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(`/api/phage/gbk/?plasmid_id=${checkedRowKeysRef.value[0]}`, '_blank')
        }
    }
}

const download = () => {
    downloadtype.value = 'single'
    downloadphagedialogVisible.value = true
    checkedRowKeysRef.value = [plasmid_id.value]
}

onBeforeMount(async () => {
    loaddata.value = true
    phageStore.phagedataloaded = false
    phageStore.plasmid_id = plasmid_id.value
    const response = await axios.get(`/plasmid/${plasmid_id.value}/`, {
        baseURL: '/api/database',
        timeout: 10000,
        // params: {
        //     id: plasmid_id.value,
        // },
    })
    const { data } = response
    phagedata.value = data

    const id = phagedata.value.plasmid_id.replace(`${datasetList[phagedata.value.source]}_`, '')
    phagedata.value.reference = `https://www.ncbi.nlm.nih.gov/nuccore/${id}/`
    phageStore.phageaccid = data.plasmid_id
    const response2 = await axios.get(`/protein`, {
        baseURL: '/api/database',
        timeout: 10000,
        params: {
            pagesize: 100000000,
            plasmid_id: plasmid_id.value,
        },
    })
    const prodata = response2.data
    genes.value = prodata.count
    proteindata.value = prodata.results
    phageStore.phageprotein = prodata.results

    const response3 = await axios.get(`get_plasmid_fasta/${plasmid_id.value}/`, {
        baseURL: '/api/database/',
        timeout: 10000,
    })

    phageStore.phagefastadata = response3.data
    loaddata.value = false
    phageStore.phagedataloaded = true
})

const phagedetail = computed(() => phagedata.value)
const proteinList = computed(() => proteindata.value)

const formatLengthNumber = num => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(0)}, ${((num / 1000).toFixed(0) % 1000)
            .toString()
            .padStart(3, '0')}, ${(num % 1000).toString().padStart(3, '0')}`
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}, ${(num % 1000).toString().padStart(3, '0')}`
    }
    return num.toString()
}
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
    plasmid_id: string
    protein_id: string
    cog_category: string
    product: string
    start: string
    end: string
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
        key: 'protein_id',
        align: 'center',
        width: '150px',
    },
    {
        title: 'COG category',
        key: 'cog_category',
        ellipsis: {
            tooltip: true,
        },
        align: 'center',
        width: '250px',
        render(row: any) {
            return h('span', { style: { width: '300px', overflow: 'auto' } }, [
                h(
                    'span',
                    {
                        type: 'info',
                        size: 'small',
                        round: true,
                    },
                    {
                        default: () => {
                            let info = ''
                            Array.from(row.cog_category).forEach(element => {
                                // eslint-disable-next-line no-const-assign
                                info += `${COGCategoryDict[element]}, `
                            })
                            return info
                            // console.log(row.cog_category, '-----------')
                            // return COGCategoryDict[row.cog_category]
                        },
                    }
                ),
            ])
        },
    },
    {
        title: 'Protein Product',
        key: 'product',
        align: 'center',
        width: '250px',
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Start Point',
        key: 'start',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'end',
        align: 'center',
        width: '120px',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'strand',
        width: '90px',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'actions',
        width: 300,
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
                                proteinInfo.value = row
                                proteinVisible.value = true
                            },
                        },
                        { default: () => 'Detail' }
                    ),
                    h(
                        NButton,
                        {
                            strong: true,
                            tertiary: true,
                            size: 'small',
                            type: 'success',
                            onClick: () => {
                                window.open(
                                    `https://alphafold.ebi.ac.uk/search/text/${row.sequence}/`
                                )
                            },
                        },
                        { default: () => 'Structure' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()

const complete = (comp: any) => {
    if (comp === 'Medium-quality') {
        return 'info'
    }
    if (comp === 'High-quality') {
        return 'success'
    }
    if (comp === 'Low-quality') {
        return 'warning'
    }
    if (comp === 'Complete') {
        return 'success'
    }
    return 'warning'
}

const lifestyleColor = (style: any) => {
    if (style === 'virulent') {
        return 'error'
    }
    return 'info'
}
const downloadtsv = () => {
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
        link.download = 'gene_annotation.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
const gohost = () => {
    router.push({
        path: `/database/host/list`,
        query: {
            rank: 'host',
            node: phagedetail.value.host,
        },
    })
}
</script>
