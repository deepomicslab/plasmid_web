<template>
    <div class="h-630 flex flex-col py-10 px-30">
        <div class="flex flex-row ml-1 my-7">
            <div class="text-4xl font-600">Host Information</div>
            <el-button round color="#069" class="ml-5 mt-2" @click="godatahelper">
                Database Helper
            </el-button>
        </div>
        <div class="pr-60">
            <div class="flex flex-row justify-between mb-4">
                <div class="w-3/4">
                    <el-input placeholder="Filter keyword" size="large" v-model="filterText" />
                </div>
                <div>
                    <el-button type="primary" size="large" @click="hostfilter">
                        <el-icon class="mr-1"><ArrowRight /></el-icon>
                        View Selected Plasmids
                    </el-button>
                    <el-button @click="resetChecked" size="large" type="info">reset</el-button>
                </div>
            </div>
            <el-scrollbar class="text-xl h-180 border-gray-300 border-1 p-2" v-loading="loading">
                <el-tree
                    ref="treeRef"
                    :data="hostdata"
                    :props="defaultProps"
                    show-checkbox
                    lazy
                    node-key="label"
                    highlight-current
                    :filter-node-method="filterNode"
                >
                    <template #default="{ node, data }">
                        <div class="flex flex-row justify-between w-full">
                            <div class="custom-tree-node flex flex-row items-center">
                                <el-tag type="primary" class="mr-2" effect="dark">
                                    {{ data.rank }}
                                </el-tag>
                                <span class="text-2xl">{{ data.label }}</span>
                                <span class="ml-2">({{ data.count }})</span>
                            </div>
                            <div class="mr-7">
                                <el-button text type="primary" @click="viewhost(node, data)">
                                    View
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>
        <!-- <div class="mt-10">
            <div>
                <h1 class="text-3xl mt-9 font-500 text-[#3262a8]">Tree Chart</h1>
            </div>
            <div class="w-250 flex flex-row justify-between mt-6 s">
                <n-form-item label="Please choose chart type" class="w-75">
                    <n-select
                        v-model:value="treechartvalue1"
                        :options="treechartoptions1"
                        @update:value="treecharthandleUpdateValue1"
                    ></n-select>
                </n-form-item>
            </div>
            <el-scrollbar class="w-410 h-240 mt-10 mb-20 p-5" style="box-shadow: 0 0 64px #cfd5db">
                <div
                    id="mytreeEcharts"
                    ref="echartDom2"
                    :style="styleObj"
                    v-show="treechartvalue1 !== 'Tree'"
                ></div>
                <div
                    id="mytreeEcharts"
                    ref="echartDom3"
                    class="w-400 h-650"
                    v-show="treechartvalue1 === 'Tree'"
                ></div>
            </el-scrollbar>
        </div> -->
    </div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
// @ts-nocheck
import axios from 'axios'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ArrowRight } from '@element-plus/icons-vue'
// import * as echarts from 'echarts'
import { useQueryStore } from '@/store/query'
// import { treedata } from '@/utils/overview'

const queryStore = useQueryStore()
const router = useRouter()
const hostdata = ref()
const loading = ref(false)

// const echartDom2 = ref<HTMLElement | null>(null)
// const echartDom3 = ref<HTMLElement | null>(null)

interface Tree {
    label: string
    children?: Tree[]
    count?: number
    rank?: string
}
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
    children: 'children',
    label: 'label',
    count: 'count',
    rank: 'rank',
}
watch(filterText, val => {
    treeRef.value!.filter(val)
})
// const level = ref(['Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'])
// const loadNode = async (node: Node, resolve: () => void) => {
//     console.log(node.level)
//     if (node.level === 6) {
//         resolve([] as any[])
//     } else {
//         const response2 = await axios.get(`/host_node/`, {
//             baseURL: '/api/database',
//             timeout: 100000,
//             params: {
//                 rank: level.value[node.level],
//                 node: node.label,
//             },
//         })
//         const { data } = response2
//         resolve(data)
//     }
// }
const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.label.includes(value)
}

const hostfilter = () => {
    if (treeRef.value!.getCheckedNodes(false, false).length === 0) {
        window.$message.warning('Please select at least one node.', { duration: 8000 })
    } else {
        queryStore.selectedhostlist = treeRef.value!.getCheckedNodes(false, false)
        router.push({
            path: `/database/host/result`,
        })
    }
}

const viewhost = (node: Node, data: Tree) => {
    router.push({
        path: `/database/host/list`,
        query: {
            rank: data.rank,
            node: data.label,
        },
    })
}
const resetChecked = () => {
    treeRef.value!.setCheckedKeys([], false)
}

// const styleObj = ref({
//     width: '1600px',
//     height: '920px',
// })
// const treechartvalue1 = ref('Treemap')
// const treechartoptions1 = [
//     {
//         label: 'Treemap',
//         value: 'Treemap',
//     },
//     {
//         label: 'Sunburst',
//         value: 'Sunburst',
//     },
//     {
//         label: 'Tree',
//         value: 'Tree',
//     },
// ]
// const treemapOption: echarts.EChartsOption = {
//     toolbox: {
//         itemSize: 20,
//         iconStyle: {
//             borderColor: 'rgb(18,49,73)',
//         },
//         feature: {
//             saveAsImage: {},
//         },
//     },
//     title: {
//         text: 'Plasmid Host Taxonomy',
//         left: 'center',
//     },
//     tooltip: {
//         trigger: 'item',
//         triggerOn: 'mousemove',
//     },
//     series: [
//         {
//             type: 'treemap',
//             id: 'echarts-package-size',
//             animationDurationUpdate: 1000,
//             visibleMin: 100,
//             roam: false,
//             nodeClick: undefined,
//             data: treedata,
//             universalTransition: true,

//             label: {
//                 show: true,
//             },
//             itemStyle: {
//                 borderColor: '#fff',
//             },
//             breadcrumb: {
//                 show: false,
//             },
//             levels: [
//                 {
//                     itemStyle: {
//                         borderWidth: 0,
//                         gapWidth: 5,
//                     },
//                 },
//                 {
//                     itemStyle: {
//                         gapWidth: 1,
//                     },
//                 },
//                 {
//                     colorSaturation: [0.35, 0.5],
//                     itemStyle: {
//                         gapWidth: 1,
//                         borderColorSaturation: 0.6,
//                     },
//                 },
//             ],
//         },
//     ],
// }
// const sunburstOption: echarts.EChartsOption = {
//     title: {
//         text: 'Plasmid Host Taxonomy',
//         left: 'left',
//     },
//     toolbox: {
//         itemSize: 20,
//         iconStyle: {
//             borderColor: 'rgb(18,49,73)',
//         },
//         feature: {
//             saveAsImage: {},
//         },
//     },
//     tooltip: {
//         trigger: 'item',
//         triggerOn: 'mousemove',
//     },
//     series: [
//         {
//             type: 'sunburst',
//             id: 'echarts-package-size',
//             radius: ['20%', '90%'],
//             animationDurationUpdate: 1000,

//             nodeClick: undefined,
//             data: treedata,
//             universalTransition: true,
//             itemStyle: {
//                 borderWidth: 2,
//                 borderRadius: 7,
//             },
//             emphasis: {
//                 focus: 'ancestor',
//             },
//             levels: [
//                 {},
//                 {
//                     r0: '15%',
//                     r: '45%',
//                     itemStyle: {
//                         borderWidth: 2,
//                     },
//                     label: {
//                         rotate: 'tangential',

//                         formatter(data: any) {
//                             console.log(data)
//                             if (data.data.value < 23000) {
//                                 return ' '
//                             }
//                             return data.data.name
//                         },
//                     },
//                 },
//                 {
//                     r0: '45%',
//                     r: '70%',
//                     label: {
//                         silent: true,
//                         rotate: 'tangential',

//                         formatter(data: any) {
//                             console.log(data)
//                             if (data.data.value < 23000) {
//                                 return ' '
//                             }
//                             return data.data.name
//                         },
//                     },
//                 },
//                 {
//                     r0: '70%',
//                     r: '80%',
//                     label: {
//                         position: 'outside',
//                         padding: 5,
//                         silent: false,
//                         formatter(data: any) {
//                             console.log(data)
//                             if (data.data.value < 1000) {
//                                 return ' '
//                             }
//                             return data.data.name
//                         },
//                     },
//                     itemStyle: {
//                         borderWidth: 3,
//                     },
//                 },
//             ],
//         },
//     ],
// }
// const treeoption = {
//     title: {
//         text: 'Plasmid Host Taxonomy',
//         left: 'center',
//     },
//     toolbox: {
//         itemSize: 20,
//         iconStyle: {
//             borderColor: 'rgb(18,49,73)',
//         },
//         feature: {
//             saveAsImage: {},
//         },
//     },
//     tooltip: {
//         trigger: 'item',
//         triggerOn: 'mousemove',
//     },
//     series: [
//         {
//             type: 'tree',
//             data: [{ name: 'Hosts', value: '441637', children: treedata }],
//             top: '2%',
//             left: '7%',
//             bottom: '2%',
//             right: '20%',
//             symbol: 'emptyCircle',
//             expandAndCollapse: true,
//             label: {
//                 position: 'right',
//                 verticalAlign: 'middle',
//                 align: 'left',
//                 fontSize: 15,
//             },
//             leaves: {
//                 label: {
//                     position: 'bottom',
//                     verticalAlign: 'middle',
//                     align: 'left',
//                 },
//             },
//             animationDurationUpdate: 750,
//             breadcrumb: {
//                 show: false,
//             },
//         },
//     ],
// }
// const treecharthandleUpdateValue1 = (value: string) => {
//     treechartvalue1.value = value
//     if (value === 'Treemap') {
//         const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
//         mytreeEcharts.setOption(treemapOption)
//     } else if (value === 'Sunburst') {
//         const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
//         mytreeEcharts.setOption(sunburstOption)
//     } else {
//         const mytreeEcharts = echarts.init(echartDom3.value as HTMLElement)
//         mytreeEcharts.setOption(treeoption)
//         mytreeEcharts.resize()
//     }
// }
onBeforeMount(async () => {
    const response = await axios.get(`/host_node/`, {
        baseURL: '/api/database',
        timeout: 100000,
        params: {
            rank: 'Phylum',
        },
    })
    const { data } = response
    hostdata.value = data
    console.log(hostdata.value.length)
    // const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
    // mytreeEcharts.setOption(treemapOption)
})
const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'Database_introduction' },
    })
}
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__content) {
    height: 45px !important;
}
</style>
