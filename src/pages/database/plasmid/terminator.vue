<template>
    <div v-show="phageStore.phageterminator.length !== 0">
        <div>
            <div class="text-4xl font-500 mb-8 w-350 border-b-2 border-gray-300 pb-4">
                Transcription Terminator
            </div>
            <div class="flex flex-row w-350 justify-between mb-5 mt-8">
                <el-button @click="downloadtsv">
                    <template #icon>
                        <n-icon><di /></n-icon>
                    </template>
                    Download Transcription Terminator Data
                </el-button>
            </div>
            <div class="flex w-350">
                <n-data-table
                    v-loading="loading"
                    :data="terminatorList"
                    :columns="columns"
                    :max-height="250"
                    :pagination="pagination"
                />
            </div>
        </div>
        <el-dialog
            v-model="terminatorVisible"
            title="Transcription Terminator Sequence"
            width="40%"
        >
            <div>
                <div class="flex flex-row w-170">
                    <div class="text-2xl font-500 mb-4">Sequence</div>
                </div>

                <el-input
                    autosize
                    type="textarea"
                    class="font-mono mt-1 tracking-wide text-lg"
                    readonly
                    v-model="temsequence"
                />
            </div>
        </el-dialog>
        <div class="text-2xl font-500 my-10">Annotated Genome Map with Terminator</div>
        <div
            style="box-shadow: 0 0 64px #cfd5db"
            class="w-310 h-245 ml-15"
            v-if="terminatorList.length !== 0"
        >
            <terminatorcirco />
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// @ts-nocheck
// import { Search } from '@element-plus/icons-vue'
import { CloudDownloadOutline as di } from '@vicons/ionicons5'
import axios from 'axios'
import { NTag, NButton } from 'naive-ui'
import _ from 'lodash'
import { usePhageStore } from '@/store/phage'
import terminatorcirco from '../../visualize/components/terminatorcirco.vue'

const phageStore = usePhageStore()
const terminatordata = ref([])
const loading = ref(false)
const terminatorVisible = ref(false)
const temsequence = ref('')

const props = defineProps({
    type: String,
    taskid: String,
})

onBeforeMount(async () => {
    loading.value = true
    phageStore.terminatorloaded = false
    if (props.type === 'taskresult') {
        const response = await axios.get(`/tasks/result/phage/terminators/`, {
            baseURL: '/api',
            timeout: 100000,
            params: {
                phageid: phageStore.phageid,
                taskid: props.taskid,
            },
        })
        const data2 = response.data.results
        terminatordata.value = data2
    } else {
        const response = await axios.get(`/phage/terminator/`, {
            baseURL: '/api',
            timeout: 10000,
            params: {
                phageid: phageStore.phageid,
            },
        })
        const data2 = response.data
        terminatordata.value = data2
    }
    loading.value = false
    phageStore.phageterminator = terminatordata.value
    phageStore.terminatorloaded = true
})

const terminatorList = computed(() => {
    if (terminatordata.value.length === 0) {
        return []
    }
    return terminatordata.value
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

const complete = (comp: any) => {
    if (Number(comp) < 70) {
        return 'warning'
    }
    if (Number(comp) < 90) {
        return 'info'
    }
    return 'success'
}
type terminatorRowData = {
    id: number
    Phage_id: string
    Terminator_Id: string
    Start: string
    Stop: string
    Sense: string
    Loc: string
    Confidence: stringdownloadtsv
}
const createColumns = (): DataTableColumns<terminatorRowData> => [
    {
        title: 'Terminator ID',
        key: 'Terminator_Id',
        align: 'center',
        width: 200,
    },
    {
        title: 'Start Point',
        key: 'Start',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'End Point',
        key: 'Stop',
        align: 'center',
        sorter: 'default',
    },
    {
        title: 'Strand',
        key: 'Sense',
        align: 'center',
    },
    {
        title: 'Loc',
        key: 'Loc',
        align: 'center',
    },
    {
        title: 'Confidence',
        key: 'Confidence',
        align: 'center',
        width: '200px',
        render(row: any) {
            return h('div', {}, [
                h(
                    NTag,
                    {
                        type: complete(row.Confidence),
                        size: 'large',
                    },
                    {
                        default: () => row.Confidence,
                    }
                ),
            ])
        },
    },
    {
        title: 'Action',
        key: 'actions',
        width: 260,
        align: 'center',
        render(row) {
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
                                terminatorVisible.value = true
                                const textList = _.drop(_.split(phageStore.phagefastadata, '\n'))
                                const fastastring = _.join(textList, '')
                                const sequence = _.slice(
                                    fastastring,
                                    Number(row.Start as string),
                                    Number(row.Stop as string)
                                ).join('')
                                const content = `> ${row.Terminator_Id}\n${sequence}`
                                temsequence.value = content
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
                            type: 'info',
                            onClick: () => {
                                const textList = _.drop(_.split(phageStore.phagefastadata, '\n'))
                                const fastastring = _.join(textList, '')
                                const sequence = _.slice(
                                    fastastring,
                                    Number(row.Start as string),
                                    Number(row.Stop as string)
                                ).join('')
                                const content = `> ${row.Terminator_Id}\n${sequence}`
                                const filename = `${row.Terminator_Id}.fasta`
                                const blob = new Blob([content], {
                                    type: 'text/plain;charset=utf-8',
                                })
                                const url = URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.download = filename
                                link.click()
                                URL.revokeObjectURL(url)
                            },
                        },
                        { default: () => 'Download' }
                    ),
                ]
            )
        },
    },
]
const columns = createColumns()
const downloadtsv = () => {
    console.log(terminatorList.value)
    if (terminatorList.value.length !== 0) {
        const headers = _.keys(terminatorList.value[0])
        const formattedData = [headers]
        terminatorList.value.forEach(item => {
            const row = _.values(item)
            formattedData.push(row)
        })
        const tsvContent = formattedData.map(row => row.join('\t')).join('\n')
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'transcription_terminator.tsv'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
}
</script>
