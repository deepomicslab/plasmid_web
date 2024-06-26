<template>
    <div v-show="phageStore.phagetrna.length !== 0">
        <div>
            <div class="flex flex-row w-350 border-b-2 border-gray-300 mb-8 pb-4">
                <div class="text-4xl font-500 mb-8">tRNA & tmRNA Gene</div>
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download tRNA & tmRNA Gene Data
                </el-button>
            </div>
            <div class="flex w-350">
                <n-data-table
                    :data="trnaList"
                    :columns="columns"
                    :row-key="rowKey"
                    :max-height="250"
                    :pagination="pagination2"
                />
            </div>
        </div>

        <div class="text-2xl font-500 my-10">Annotated Genome Map with TRNA</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-300 ml-15"
            v-if="trnaList.length !== 0"
        >
            <trnacirco />
        </div>
    </div>
    <el-dialog v-model="trnaVisible" title="tRNA Detail" width="80%">
        <el-descriptions class="text-lg" :column="2" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">tRNA ID</div>
                </template>
                {{ trnaInfo.trna_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">tRNA Type</div>
                </template>
                {{ trnaInfo.trna_type }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Length</div>
                </template>
                {{ trnaInfo.length }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Strand</div>
                </template>
                {{ trnaInfo.strand }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Start</div>
                </template>
                {{ trnaInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">End</div>
                </template>
                {{ trnaInfo.end }}
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <el-input
                v-model="seqcontent"
                :rows="3"
                type="textarea"
                class="font-mono mt-5 tracking-wide text-lg"
            />
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="trnaVisible = false">Cancel</el-button>
                <el-button @click="downloadsequence" type="primary">Download Sequence</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import _ from 'lodash'
import { NButton } from 'naive-ui'
import axios from 'axios'
import { usePhageStore } from '@/store/phage'
import trnacirco from '../../visualize/components/trnacirco.vue'

const props = defineProps({
    type: String,
    taskid: String,
})

const trnadata = ref([] as any[])
const phageStore = usePhageStore()

const loading = ref(false)

const trnaInfo = ref({
    trna_id: '',
    trna_type: '',
    length: '',
    start: '',
    end: '',
    strand: '',
    sequence: '',
})
const seqcontent = computed(() => {
    return `>${trnaInfo.value.trna_id}\n${trnaInfo.value.sequence}`
})
const trnaVisible = ref(false)

onBeforeMount(async () => {
    loading.value = true
    phageStore.trnaloaded = false
    if (props.type === 'taskresult') {
        const response3 = await axios.get(`tasks/result/phage/trnas/`, {
            baseURL: '/api/database',
            timeout: 100000,
            params: {
                plasmid_id: phageStore.plasmid_id,
                taskid: props.taskid,
            },
        })
        trnadata.value = response3.data.results
    } else {
        const response3 = await axios.get(`/trna/`, {
            baseURL: '/api/database',
            timeout: 100000,
            params: {
                pagesize: 100000000,
                plasmid_id: phageStore.plasmid_id,
            },
        })
        trnadata.value = response3.data.results
    }

    loading.value = false
    phageStore.trnaloaded = true
    phageStore.phagetrna = trnadata.value
})
const trnaList = computed(() => trnadata.value)
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

type trnaRowData = {
    id: number
    trna_id: string
    trna_type: string
    length: string
    start: string
    end: string
    strand: string
    plasmid_id: string
    plasmid: string
}
const createColumns = (): DataTableColumns<trnaRowData> => [
    {
        type: 'selection',
    },

    {
        title: 'tRNA ID',
        key: 'trna_id',
        align: 'center',
    },
    {
        title: 'tRNA binding amino acid',
        key: 'trna_type',
        align: 'center',
    },
    {
        title: 'Length',
        key: 'length',
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
        title: 'Action',
        key: 'actions',
        width: 100,
        align: 'center',
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
                                const copyrow = { ...row }
                                trnaInfo.value = { ...row }
                                trnaInfo.value.sequence = copyrow.sequence.replace(
                                    /(.{50})/g,
                                    '$1\n'
                                )
                                trnaVisible.value = true
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

const downloadsequence = () => {
    const element = document.createElement('a')
    const content = `>${trnaInfo.value.trna_id}\n${trnaInfo.value.seq}`
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${trnaInfo.value.trna_id}.fasta`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}
const downloadtsv = () => {
    console.log(trnaList.value)
    if (trnaList.value.length !== 0) {
        const headers = _.keys(trnaList.value[0])
        const formattedData = [headers]
        trnaList.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'trna_tmrna.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
