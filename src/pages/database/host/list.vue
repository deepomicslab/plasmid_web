<template>
    <div class="h-680 flex flex-col py-10 px-30">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl ml-1 my-10 font-600 flex flex-row items-center">
                <el-tag type="primary" class="mr-5 h-9 text-lg" effect="dark">
                    {{ rank }}
                </el-tag>
                {{ host }}
                <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                    Database Helper
                </el-button>
            </div>
        </div>
        <div class="flex flex-row justify-between mb-4">
            <div class="mt-1.5 ml-1 felx flex-row justify-start items-center">
                <el-button class="mb-1" @click="gofilter">
                    <n-icon class="mr-2"><FunnelOutline /></n-icon>
                    Sequence Filter
                </el-button>

                <el-dropdown class="mx-4">
                    <el-button>
                        <template #icon>
                            <n-icon><downicon /></n-icon>
                        </template>
                        Download Sequence
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!-- <el-dropdown-item @click="downloadall">All Data</el-dropdown-item> -->
                            <el-dropdown-item @click="downloadselected">
                                Selected Data
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div v-loading="loading">
            <n-data-table
                :columns="columns"
                :data="phageList"
                :bordered="false"
                :row-key="rowKey"
                :scroll-x="1800"
                :max-height="1600"
                @update:checked-row-keys="handleCheck"
            />
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
    <el-dialog
        v-model="downloaddialogVisible"
        title="Select download data type"
        width="30%"
        align-center
    >
        <div>
            <el-checkbox-group v-model="checkList" :max="1">
                <el-checkbox label="Download FASTA Data" />
                <el-checkbox label="Download GBK Data" />
                <el-checkbox label="Download GFF3 Data" />
                <el-checkbox label="Download Meta Data" />
            </el-checkbox-group>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="downloaddialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="downloadrequest">Download</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { h } from 'vue'
import { NButton, NTag, NTooltip } from 'naive-ui'
import {
    CloudDownloadOutline as downicon,
    ChevronBack,
    ChevronForward,
    FunnelOutline,
} from '@vicons/ionicons5'
import axios from 'axios'
import { datasetList } from '@/utils/phage'

const pagevalue = ref(1)
const pageSize = ref(30)
const route = useRoute()
const host = computed(() => route.query?.node as string)
const rank = computed(() => route.query?.rank as string)
const loading = ref(false)
const phagedata = ref()

onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get('/host_view/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            host: host.value,
            rank: rank.value,
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
})

const phageList = computed(() => {
    return phagedata.value?.results
})
const count = computed(() => phagedata.value?.count)
const nextPage = async () => {
    loading.value = true
    const response = await axios.get('/host_view/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            host: host.value,
            rank: rank.value,
            page: pagevalue.value + 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}
const prevPage = async () => {
    loading.value = true
    const response = await axios.get('/host_view/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            host: host.value,
            rank: rank.value,
            page: pagevalue.value - 1,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}

const pagechange = async () => {
    loading.value = true
    const response = await axios.get('/host_view/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            host: host.value,
            rank: rank.value,
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}
const pagesizechange = async () => {
    loading.value = true
    const response = await axios.get('/host_view/', {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            host: host.value,
            rank: rank.value,
            page: pagevalue.value,
            pagesize: pageSize.value,
        },
    })
    const { data } = response
    phagedata.value = data
    loading.value = false
}
const router = useRouter()
const detail = (row: any) => {
    router.push({ path: '/database/plasmid/detail', query: { plasmid_id: row.plasmid } })
}
const gofilter = () => {
    router.push({ path: '/database/filter' })
}

type RowData = {
    plasmid: number
    plasmid_id: string
    name: string
    source: string
    species: string
    genus: string
    family: string
    order: string
    host_class: string
    phylum: string
}

const downloaddialogVisible = ref(false)
const downloadtype = ref('')
const checkList = ref([] as any[])
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys
}

const downloadrequest = async () => {
    if (checkList.value.length === 0) {
        window.$message.warning('Please select download data type', {
            closable: true,
            duration: 5000,
        })
    } else if (downloadtype.value === 'selected') {
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(
                `/api/database/download_plasmid_fasta/?plasmid_ids=${checkedRowKeysRef.value}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            console.log('88888')
            window.open(
                `/api/database/download_plasmid_gff/?plasmid_ids=${checkedRowKeysRef.value}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(
                `/api/database/download_plasmid_gbk/?plasmid_ids=${checkedRowKeysRef.value}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download Meta Data')) {
            window.open(
                `/api/database/download_plasmid_meta/?plasmid_ids=${checkedRowKeysRef.value}`,
                '_blank'
            )
        }
    } else if (downloadtype.value === 'single') {
        if (checkList.value.includes('Download Meta Data')) {
            window.open(
                `/api/database/download_plasmid_meta/?plasmid_id=${checkedRowKeysRef.value[0]}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(
                `/api/database/download_plasmid_fasta/?plasmid_id=${checkedRowKeysRef.value[0]}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            window.open(
                `/api/database/download_plasmid_gff/?plasmid_id=${checkedRowKeysRef.value[0]}`,
                '_blank'
            )
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(
                `/api/database/download_plasmid_gbk/?plasmid_id=${checkedRowKeysRef.value[0]}`,
                '_blank'
            )
        }
    } else {
        if (checkList.value.includes('Download Meta Data')) {
            window.open(`/api/database/download_plasmid_meta/`, '_blank')
        }
        if (checkList.value.includes('Download FASTA Data')) {
            window.open(`/api/database/download_plasmid_fasta/`, '_blank')
        }
        if (checkList.value.includes('Download GFF3 Data')) {
            window.open(`/api/database/download_plasmid_gff/`, '_blank')
        }
        if (checkList.value.includes('Download GBK Data')) {
            window.open(`/api/database/download_plasmid_gbk/`, '_blank')
        }
    }
}
const downloadselected = () => {
    if (checkedRowKeysRef.value.length === 0) {
        window.$message.warning('Please select data', {
            closable: true,
            duration: 5000,
        })
    } else {
        downloaddialogVisible.value = true
        downloadtype.value = 'selected'
    }
}
// const downloadall = () => {
//     downloaddialogVisible.value = true
//     downloadtype.value = 'all'
// }
const download = (row: any) => {
    downloadtype.value = 'single'
    downloaddialogVisible.value = true
    checkedRowKeysRef.value = [row.plasmid]
}
const renderTooltip = (trigger: any, content: any) => {
    return h(NTooltip, null, {
        trigger: () => trigger,
        default: () => content,
    })
}
const rowKey = (row: RowData) => {
    return row.plasmid
}
const createColumns = (): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
            fixed: 'left',
            width: 50,
        },
        {
            title() {
                return renderTooltip(h('div', null, { default: () => 'Plasmid ID' }), 'Plasmid ID')
            },
            key: 'plasmid_id',
            align: 'center',
            fixed: 'left',
            width: 250,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Host' }),
                    'host taxonomy in lowest rank'
                )
            },
            key: 'name',
            align: 'center',
            ellipsis: {
                tooltip: true,
            },
            render(row: any) {
                return h('div', { style: { overflow: 'auto', 'text-overflow': 'ellipsis' } }, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'host',
                                        node: row.name,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.name
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Host source' }),
                    'source of the host annotation'
                )
            },
            key: 'source',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', { style: { width: '100px' } }, [
                    h(
                        NTag,
                        {
                            type: 'info',
                            size: 'small',
                            round: true,
                        },
                        {
                            default: () => {
                                return datasetList[row.source]
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Species' }),
                    'host taxonomy in species rank'
                )
            },
            key: 'species',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Species',
                                        node: row.species,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.species
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Genus' }),
                    'host taxonomy in genus rank'
                )
            },
            key: 'genus',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Genus',
                                        node: row.genus,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.genus
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Family' }),
                    'host taxonomy in family rank'
                )
            },
            key: 'family',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Family',
                                        node: row.family,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.family
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Order' }),
                    'host taxonomy in order rank'
                )
            },
            key: 'order',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Order',
                                        node: row.order,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.order
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Class' }),
                    'host taxonomy in class rank'
                )
            },
            key: 'host_class',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Class',
                                        node: row.host_class,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.host_class
                            },
                        }
                    ),
                ])
            },
        },
        {
            title() {
                return renderTooltip(
                    h('div', null, { default: () => 'Phylum' }),
                    'host taxonomy in phylum rank'
                )
            },
            key: 'phylum',
            ellipsis: {
                tooltip: true,
            },
            align: 'center',
            render(row: any) {
                return h('div', {}, [
                    h(
                        NButton,
                        {
                            type: 'info',
                            text: true,
                            size: 'small',
                            onClick: () => {
                                router.push({
                                    path: `/database/host/list`,
                                    query: {
                                        rank: 'Phylum',
                                        node: row.phylum,
                                    },
                                })
                            },
                        },
                        {
                            default: () => {
                                return row.phylum
                            },
                        }
                    ),
                ])
            },
        },
        {
            title: 'Action',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            render(row: any) {
                return h(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                        },
                    },
                    [
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'info',
                                onClick: () => detail(row),
                            },
                            { default: () => 'Detail' }
                        ),
                        h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                type: 'primary',
                                onClick: () => download(row),
                            },
                            {
                                default: () => 'Download',
                            }
                        ),
                    ]
                )
            },
        },
    ]
}
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'Database_introduction' },
    })
}
const columns = createColumns()
</script>
