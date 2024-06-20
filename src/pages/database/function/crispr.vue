<template>
    <div class="h-680 flex flex-col py-5 px-20">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">CRISPR Information</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1 felx flex-row justify-start items-center">
                <el-button class="mb-1" @click="gofilter">
                    <n-icon class="mr-2"><FunnelOutline /></n-icon>
                    Sequence Filter
                </el-button>
            </div>
        </div>
        <div>
            <el-menu
                :default-active="dataset"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectSet"
            >
                <el-menu-item index="0" class="text-lg">PLSDB</el-menu-item>
                <el-menu-item index="1" class="text-lg">IMG-PR</el-menu-item>
                <el-menu-item index="2" class="text-lg">COMPASS</el-menu-item>
                <el-menu-item index="3" class="text-lg">GenBank</el-menu-item>
                <el-menu-item index="4" class="text-lg">RefSeq</el-menu-item>
                <el-menu-item index="5" class="text-lg">EMBL</el-menu-item>
                <el-menu-item index="6" class="text-lg">Kraken2</el-menu-item>
                <el-menu-item index="7" class="text-lg">DDBJ</el-menu-item>
                <el-menu-item index="8" class="text-lg">TPA</el-menu-item>
            </el-menu>
        </div>
        <div v-loading="loading" class="h-420">
            <n-data-table :columns="columns" :data="phageList" :max-height="1600" />
        </div>
        <div>
            <n-pagination
                class="mt-10 ml-130 mb-20"
                v-model:page="pagevalue"
                v-model:pageSize="pageSize"
                show-size-picker
                :default-page-size="30"
                :page-sizes="[30, 50, 100]"
                show-quick-jumper
                :item-count="count"
                @update:page="pagechange"
                @update:page-size="pagesizechange"
            >
                <template #prev>
                    <n-button @click="prevPage" v-bind:disabled="pagevalue === 1" size="small">
                        <template #icon>
                            <n-icon><ChevronBack /></n-icon>
                        </template>
                    </n-button>
                </template>
                <template #next>
                    <n-button @click="nextPage" size="small">
                        <template #icon>
                            <n-icon><ChevronForward /></n-icon>
                        </template>
                    </n-button>
                </template>
            </n-pagination>
        </div>
    </div>
    <el-dialog v-model="crisprVisible" title="CRISPR Detail" width="80%">
        <el-descriptions class="text-lg" :column="2" size="large" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR ID</div>
                </template>
                {{ crisprInfo.crispr_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR Subcrispr_subtypetype</div>
                </template>
                {{ crisprInfo.crispr_subtype }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Start</div>
                </template>
                {{ crisprInfo.start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">End</div>
                </template>
                {{ crisprInfo.end }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas ID</div>
                </template>
                {{ crisprInfo.cas_id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Start</div>
                </template>
                {{ crisprInfo.cas_start }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas End</div>
                </template>
                {{ crisprInfo.cas_end }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Subtype</div>
                </template>
                {{ crisprInfo.cas_subtype }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">CRISPR-Cas Consenus Prediction</div>
                </template>
                {{ crisprInfo.cas_consenus_prediction }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">Cas Genes</div>
                </template>
                {{ crisprInfo.cas_genes }}
            </el-descriptions-item>
        </el-descriptions>
        <div>
            <el-input
                v-model="crisprInfo.sequence"
                :rows="3"
                type="textarea"
                class="font-mono mt-5 tracking-wide text-lg"
            />
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="crisprVisible = false" type="primary">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import axios from 'axios'
import { FunnelOutline, ChevronBack, ChevronForward } from '@vicons/ionicons5'
// import { Search, RefreshRight } from '@element-plus/icons-vue'

const crisprVisible = ref(false)
const pagevalue = ref(1)
const pageSize = ref(30)
const source = ref(0)
const dataset = ref('0')
const searchinput = ref('')
const loading = ref(false)
// const downloaddialogVisible = ref(false)

// const phagedata = useRequest(() => phageService.getPhageList(pagevalue.value, pageSize.value)).data

const crisprdata = ref()

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get(`/crispr/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    crisprdata.value = response.data
    loading.value = false
})

const phageList = computed(() => {
    return crisprdata.value?.results
})

const count = computed(() => crisprdata.value?.count)
const nextPage = async () => {
    loading.value = true
    const response = await axios.get(`/crispr/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    crisprdata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.get(`/crispr/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    crisprdata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.get(`/crispr/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    crisprdata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.get(`/crispr/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    crisprdata.value = data
    loading.value = false
}
const handleSelectSet = async (key: any) => {
    source.value = key
    loading.value = true
    const response = await axios.get('/crispr/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            page: pagevalue.value,
            pagesize: pageSize.value,
            search: searchinput.value,
            source: source.value,
        },
    })
    const { data } = response
    crisprdata.value = data
    loading.value = false
}
const router = useRouter()

const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}

const crisprInfo = ref({
    crispr_id: '',
    crispr_subtype: '',
    length: '',
    start: '',
    end: '',
    plasmid_id: '',
    plasmid: '',
    cas_id: '',
    cas_start: '',
    cas_end: '',
    cas_subtype: '',
    cas_consenus_prediction: '',
    sequence: '',
    cas_genes: '',
})
type crisprRowData = {
    id: number
    crispr_id: string
    crispr_subtype: string
    length: string
    start: string
    end: string
    plasmid_id: string
    plasmid: string
    cas_id: string
    cas_start: string
    cas_end: string
    cas_subtype: string
    cas_consenus_prediction: string
    consensus_repeat_sequence: string
    cas_genes: string
}
const createColumns = (): DataTableColumns<crisprRowData> => [
    {
        title: 'ID',
        key: 'id',
        align: 'center',
        sorter: 'default',
        defaultSortOrder: 'ascend',
        fixed: 'left',
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'Plasmid ID' }), 'plasmid ID')
        },
        key: 'plasmid_id',
        align: 'center',
        ellipsis: {
            tooltip: true,
        },
        render(row: any) {
            return h('div', { style: { width: '130px' } }, [
                h(
                    NButton,
                    {
                        type: 'info',
                        text: true,
                        size: 'small',
                        color: 'rgb(18,49,73)',
                        onClick: async () => {
                            const response = await axios.get(`/plasmid/${row.plasmid}`, {
                                baseURL: '/api/database',
                                timeout: 10000,
                            })
                            const plasmid_id = response.data.id
                            router.push({
                                path: '/database/plasmid/detail/',
                                query: { plasmid_id },
                            })
                        },
                    },
                    {
                        default: () => {
                            return row.plasmid_id
                        },
                    }
                ),
            ])
        },
    },
    {
        title() {
            return renderTooltip(h('div', null, { default: () => 'CRISPR ID' }), 'CRISPR ID')
        },
        key: 'crispr_id',
        align: 'center',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'CRISPR  Subype' }),
                'CRISPR binding amino acid'
            )
        },
        key: 'crispr_subtype',
        align: 'center',
        render(row: any) {
            return h(
                'div',
                {
                    style: {},
                },
                [row.crispr_subtype.replace(/\?/g, '')]
            )
        },
    },
    // {
    //     title() {
    //         return renderTooltip(h('div', null, { default: () => 'Length' }), 'length of t(m)RNA')
    //     },
    //     key: 'length',
    //     align: 'center',
    //     sorter: 'default',
    // },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'Start Point' }),
                'CRISPR start site on the genome'
            )
        },
        key: 'start',
        align: 'center',
        sorter: 'default',
    },
    {
        title() {
            return renderTooltip(
                h('div', null, { default: () => 'End Point' }),
                'CRISPR stop site on the genome'
            )
        },
        key: 'end',
        align: 'center',
        sorter: 'default',
    },
    // {
    //     title() {
    //         return renderTooltip(h('div', null, { default: () => 'Strand' }), 'strand sense')
    //     },
    //     key: 'strand',
    //     align: 'center',
    // },
    {
        title: 'Actions',
        key: 'actions',
        width: 280,
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
                                const copyrow = { ...row }
                                crisprInfo.value = { ...row }
                                crisprInfo.value.sequence =
                                    copyrow.consensus_repeat_sequence.replace(/(.{50})/g, '$1\n')
                                crisprVisible.value = true
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
                            type: 'warning',
                            onClick: () => {
                                const copyrow = { ...row }
                                crisprInfo.value = { ...row }
                                crisprInfo.value.sequence =
                                    copyrow.consensus_repeat_sequence.replace(/(.{50})/g, '$1\n')
                                const content = `>${crisprInfo.value.crispr_id}\n${crisprInfo.value.sequence}`
                                const element = document.createElement('a')
                                const file = new Blob([content], { type: 'text/plain' })
                                element.href = URL.createObjectURL(file)
                                element.download = `${crisprInfo.value.crispr_id}.fasta`
                                document.body.appendChild(element) // Required for this to work in FireFox
                                element.click()
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

const paginationReactive = reactive({
    page: 1,
    pageSize: 30,
    showSizePicker: true,
    pageSizes: [30, 50, 100],
    showQuickJumper: true,
    onChange: (page: number) => {
        paginationReactive.page = page
    },
})
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'database_intro' },
    })
}
const gofilter = () => {
    router.push({ path: '/database/filter' })
}
</script>
