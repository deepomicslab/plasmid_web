<template>
    <div class="mx-30 my-10 h-full pb-10 flex flex-col justify-start">
        <div class="flex felx-row justify-start mt-8">
            <h1 class="text-5xl m-4 font-700">Database Overview</h1>

            <div class="flex flex-row ml-1 my-6">
                <el-button round color="#069" class="ml-5" @click="godatalist">
                    Total Data
                </el-button>
                <el-button round color="#069" class="ml-5" @click="godatahelper">
                    Database Helper
                </el-button>
            </div>
        </div>
        <div class="mb-4 mt-12 p-1">
            <div class="flex flex-row">
                <div class="w-65 ml-3">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.plasmid}`"
                            :duration="1000"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700 ml-1">Plasmid Sequences</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-60">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.host}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Host Species</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-75">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.protein}`"
                            :duration="1000"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Annotated Proteins</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-85">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.arg}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">
                                Antibiotic Resistance Genes
                            </h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-55">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.tmh}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Transmembrane Proteins</h1>
                        </template>
                    </n-statistic>
                </div>
            </div>
            <div class="flex flex-row mt-12">
                <div class="w-65 ml-3">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.trna}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">tRNAs & tmRNAs</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-60">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.sm}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Secondary Metabolites</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-75">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.vf}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Virulence Factors</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-85">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.crispr}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">CRIRSPR-CAS systems</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-55">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="+`${overview_data.overview.sp}`"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#069] text-lg font-700">Signal Peptides</h1>
                        </template>
                    </n-statistic>
                </div>
            </div>
        </div>
        <div class="mt-12 m-3">
            <div class="border-t-2"></div>
            <h1 class="text-4xl mt-8 ml-6 font-500">Host Phylum</h1>
            <div class="flex flex-row justify-start w-370 flex-wrap items-start ml-10 mt-6 mb-6">
                <n-button
                    class="mt-10 mr-10 w-80 text-[#069] text-xl h-11"
                    tertiary
                    @click="viewhost(`${host}`)"
                    v-for="host in overview_data.hosts"
                    :key="host"
                >
                    {{ host }}
                </n-button>
            </div>
        </div>
        <div class="mt-3 m-3">
            <div class="border-t-2"></div>
            <h1 class="text-4xl mt-8 ml-6 font-500">Data Source</h1>
            <div class="flex flex-row justify-start w-370 flex-wrap items-start ml-10 mt-6">
                <n-button
                    class="mt-10 mr-10 w-80 text-[#069] text-xl h-11"
                    tertiary
                    @click="gobyset(`${datasource.value}`)"
                    v-for="datasource in datasetDict"
                    :key="datasource.label"
                >
                    {{ datasource.label }}
                </n-button>
            </div>
        </div>
        <div class="mt-23 m-3">
            <div class="border-t-2"></div>
            <div class="flex felx-row justify-start">
                <h1 class="text-3xl mt-8 ml-6 font-600">Database overview visualization</h1>
                <n-button round type="default" class="mt-9 ml-8" size="small" v-show="false">
                    <template #icon>
                        <n-icon><downicon /></n-icon>
                    </template>
                    Download all charts
                </n-button>
            </div>
            <div>
                <div>
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#069]">Bar Plot</h1>
                </div>
                <!-- <div class="flex flex-row justify-between mt-6 ml-8 w-285">
                    <n-form-item label="Please choose plot type" class="w-75">
                        <n-select
                            v-model:value="barchartvalue1"
                            :options="barchartoptions1"
                            @update:value="barcharthandleUpdateValue1"
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose plot type" class="w-75">
                        <n-select
                            v-model:value="barchartvalue2"
                            :options="barchartoptions2"
                            @update:value="barcharthandleUpdateValue2"
                        ></n-select>
                    </n-form-item>
                </div> -->
                <div class="flex flex-row">
                    <div
                        class="w-200 h-140 mb-10 mt-5 p-5 ml-8"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="myEcharts" class="h-130" ref="echartbarDom1"></div>
                    </div>
                    <div
                        class="w-200 h-140 mb-10 mt-5 ml-10 p-5"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="myEcharts" class="h-130" ref="echartbarDom2"></div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div>
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#069]">Pie Chart</h1>
                </div>
                <!-- <div class="w-285 flex flex-row justify-between mt-6 ml-8">
                    <n-form-item label="Please choose chart type" class="w-75">
                        <n-select
                            v-model:value="piechartvalue1"
                            :options="piechartoptions1"
                            @update:value="piecharthandleUpdateValue1"
                        ></n-select>
                    </n-form-item>
                    <n-form-item label="Please choose chart type" class="w-75">
                        <n-select
                            v-model:value="piechartvalue2"
                            :options="piechartoptions2"
                            @update:value="piecharthandleUpdateValue2"
                        ></n-select>
                    </n-form-item>
                </div> -->

                <div class="flex flex-row">
                    <div
                        class="w-200 h-120 mb-10 mt-5 p-5 ml-8"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="mypieEcharts1" class="h-110" ref="echartpieDom1"></div>
                    </div>
                    <div
                        class="w-200 h-120 mb-10 mt-5 ml-10 p-5"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="mypieEcharts2" class="h-110" ref="echartpieDom2"></div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div>
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#069]">Tree Chart</h1>
                </div>
                <div class="w-250 flex flex-row justify-between mt-6 ml-8">
                    <n-form-item label="Please choose chart type" class="w-75">
                        <n-select
                            v-model:value="treechartvalue1"
                            :options="treechartoptions1"
                            @update:value="treecharthandleUpdateValue1"
                        ></n-select>
                    </n-form-item>
                </div>
                <el-scrollbar
                    class="h-240 ml-8 mt-10 mb-20 p-5"
                    style="box-shadow: 0 0 64px #cfd5db"
                >
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
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CloudDownloadOutline as downicon } from '@vicons/ionicons5'
import * as echarts from 'echarts'
import axios from 'axios'
import { datasetDict } from '@/utils/phage'

// import // treedata,
// // hostTypeOptions,
// '@/utils/overview'

const loading = ref(false)
// eslint-disable-next-line camelcase
const overview_data = ref({
    overview: {
        plasmid: 953438,
        host: 14382,
        protein: 39172224,
        trna: 109510,
        arg: 32240953,
        sm: 63737,
        sp: 4142979,
        tmh: 8672432,
        vf: 514503,
        crispr: 10088,
    },
    hosts: [
        'Pseudomonadota',
        'Bacillota',
        'Bacteroidota',
        'Actinomycetota',
        'Spirochaetota',
        'Cyanobacteriota',
        'Campylobacterota',
        'Euryarchaeota',
        'Deinococcota',
        'Fusobacteriota',
    ],
    datasources: {
        sources: [],
        counts: [],
    },
    datahosts: {
        hosts: [],
        counts: [],
    },
    piedatasource: [],
    piehosts: [],
    treedata: [],
})
const router = useRouter()
const godatalist = () => router.push({ path: '/database/plasmid' })

const gobyset = (seturl: string) => {
    router.push({ path: '/database/plasmid', query: { dataset: seturl } })
}
const viewhost = (node: string) => {
    router.push({
        path: `/database/host/list`,
        query: {
            rank: 'Phylum',
            node,
        },
    })
}
const styleObj = ref({
    width: '1600px',
    height: '920px',
})

// const barchartvalue1 = ref('Phage Quality Tier Distribution')
// const barchartvalue2 = ref('Host Phylum Distribution')

// const barchartoptions1 = [
//     {
//         label: 'Phage Quality Tier Distribution',
//         value: 'Phage Quality Tier Distribution',
//     },
//     {
//         label: 'Data Source Distribution',
//         value: 'Data Source Distribution',
//     },
// ]
// const barchartoptions2 = [
//     {
//         label: 'Host Phylum Distribution',
//         value: 'Host Phylum Distribution',
//     },
// ]
// const piechartvalue1 = ref('Data Source Distribution')
// const piechartvalue2 = ref('Phage Lifestyle Distribution')
// const piechartoptions1 = [
//     {
//         label: 'Data Source Distribution',
//         value: 'Data Source Distribution',
//     },
//     {
//         label: 'Phage Quality Tier Distribution',
//         value: 'Phage Quality Tier Distribution',
//     },
// ]
// const piechartoptions2 = [
//     {
//         label: 'Phage Lifestyle Distribution',
//         value: 'Phage Lifestyle Distribution',
//     },

//     {
//         label: 'Host Phylum Distribution',
//         value: 'Host Phylum Distribution',
//     },
// ]
const treechartvalue1 = ref('Treemap')
const treechartoptions1 = [
    {
        label: 'Treemap',
        value: 'Treemap',
    },
    {
        label: 'Sunburst',
        value: 'Sunburst',
    },
    {
        label: 'Tree',
        value: 'Tree',
    },
]
console.log(overview_data.value)

const echartbarDom1 = ref<HTMLElement | null>(null)
const echartbarDom2 = ref<HTMLElement | null>(null)
const echartpieDom1 = ref<HTMLElement | null>(null)
const echartpieDom2 = ref<HTMLElement | null>(null)

const echartDom2 = ref<HTMLElement | null>(null)
const echartDom3 = ref<HTMLElement | null>(null)

const treecharthandleUpdateValue1 = async (value: string) => {
    const response = await axios.get('get_database_overview', {
        baseURL: '/api/database/',
        timeout: 100000,
        // params: {
        //     page: pagevalue.value,
        //     pagesize: pageSize.value,
        //     search: searchinput.value,
        // },
    })
    const { data } = response
    console.log(data, '===')
    const treemapOption: echarts.EChartsOption = {
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                saveAsImage: {},
            },
        },
        title: {
            text: 'Plasmid Host Taxonomy',
            left: 'left',
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'treemap',
                id: 'echarts-package-size',
                animationDurationUpdate: 1000,
                visibleMin: 100,
                roam: false,
                nodeClick: undefined,
                data: data.treedata,
                universalTransition: true,

                label: {
                    show: true,
                },
                itemStyle: {
                    borderColor: '#fff',
                },
                breadcrumb: {
                    show: false,
                },
                levels: [
                    {
                        itemStyle: {
                            borderWidth: 0,
                            gapWidth: 5,
                        },
                    },
                    {
                        itemStyle: {
                            gapWidth: 1,
                        },
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            gapWidth: 1,
                            borderColorSaturation: 0.6,
                        },
                    },
                ],
            },
        ],
    }
    const sunburstOption: echarts.EChartsOption = {
        title: {
            text: 'Plasmid Host Taxonomy',
            left: 'left',
        },
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                saveAsImage: {},
            },
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'sunburst',
                id: 'echarts-package-size',
                radius: ['20%', '90%'],
                animationDurationUpdate: 1000,

                nodeClick: undefined,
                data: data.treedata,
                universalTransition: true,
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 7,
                },
                emphasis: {
                    focus: 'ancestor',
                },
                levels: [
                    {},
                    {
                        r0: '15%',
                        r: '45%',
                        itemStyle: {
                            borderWidth: 2,
                        },
                        label: {
                            rotate: 'tangential',

                            formatter(tmpdata: any) {
                                console.log(data)
                                if (tmpdata.data.value < 23000) {
                                    return ' '
                                }
                                return tmpdata.data.name
                            },
                        },
                    },
                    {
                        r0: '45%',
                        r: '70%',
                        label: {
                            silent: true,
                            rotate: 'tangential',

                            formatter(tmpdata: any) {
                                console.log(tmpdata)
                                if (tmpdata.data.value < 23000) {
                                    return ' '
                                }
                                return tmpdata.data.name
                            },
                        },
                    },
                    {
                        r0: '70%',
                        r: '80%',
                        label: {
                            position: 'outside',
                            padding: 5,
                            silent: false,
                            formatter(tmpdata: any) {
                                console.log(tmpdata)
                                if (tmpdata.data.value < 1000) {
                                    return ' '
                                }
                                return tmpdata.data.name
                            },
                        },
                        itemStyle: {
                            borderWidth: 3,
                        },
                    },
                ],
            },
        ],
    }
    const treeoption = {
        title: {
            text: 'Plasmid Host Taxonomy',
            left: 'left',
        },
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                saveAsImage: {},
            },
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'tree',
                data: [{ name: 'Hosts', value: '441637', children: data.treedata }],
                top: '2%',
                left: '7%',
                bottom: '2%',
                right: '20%',
                symbol: 'emptyCircle',
                expandAndCollapse: true,
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left',
                    fontSize: 15,
                },
                leaves: {
                    label: {
                        position: 'bottom',
                        verticalAlign: 'middle',
                        align: 'left',
                    },
                },
                animationDurationUpdate: 750,
                breadcrumb: {
                    show: false,
                },
            },
        ],
    }
    treechartvalue1.value = value
    if (value === 'Treemap') {
        const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
        mytreeEcharts.setOption(treemapOption)
    } else if (value === 'Sunburst') {
        const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
        mytreeEcharts.setOption(sunburstOption)
    } else {
        const mytreeEcharts = echarts.init(echartDom3.value as HTMLElement)
        mytreeEcharts.setOption(treeoption)
        mytreeEcharts.resize()
    }
}
onBeforeMount(async () => {
    loading.value = true
    const response = await axios.get('get_database_overview', {
        baseURL: '/api/database/',
        timeout: 100000,
        // params: {
        //     page: pagevalue.value,
        //     pagesize: pageSize.value,
        //     search: searchinput.value,
        // },
    })
    const { data } = response
    overview_data.value = data
    console.log(overview_data.value.datasources)
    loading.value = false
    const datasetsOption = {
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                dataView: { readOnly: true },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {},
            },
        },
        title: {
            text: 'Data Source Distribution',
            left: 'center',
        },
        tooltip: {},
        xAxis: {
            data: overview_data.value.datasources.sources,
            axisLabel: {
                interval: 0,
                fontSize: 12,
                rotate: 19,
            },
        },
        yAxis: {},
        series: [
            {
                name: 'Plasmids',
                type: 'bar',
                data: overview_data.value.datasources.counts,
            },
        ],
    }
    const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
    mybarEcharts1.setOption(datasetsOption)
    const Hostnumber = {
        title: {
            text: 'Host Phylum Distribution',
            left: 'center',
        },
        tooltip: {},
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                dataView: { readOnly: true },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {},
            },
        },
        xAxis: {
            data: overview_data.value.datahosts.hosts,
            axisLabel: {
                interval: 0,
                rotate: 19,
                fontSize: 13,
            },
        },
        yAxis: {},
        series: [
            {
                name: 'Plasmids',
                type: 'bar',
                data: overview_data.value.datahosts.counts,
            },
        ],
    }
    const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
    mybarEcharts2.setOption(Hostnumber)

    const datasetspieOption = {
        title: {
            text: 'Data Source Distribution',
            left: 'center',
        },
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                dataView: { readOnly: true },
                saveAsImage: {},
            },
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                fontSize: 16,
            },
        },
        series: [
            {
                name: 'Plasmids',
                type: 'pie',
                data: overview_data.value.piedatasource,
                label: {
                    fontSize: 15,
                },
            },
        ],
    }
    const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
    mypieEcharts1.setOption(datasetspieOption)
    const hostTypeOptions = {
        title: {
            text: 'Host Phylum Distribution',
            left: 'center',
        },
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                dataView: { readOnly: true },
                saveAsImage: {},
            },
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            left: 'left',
            width: 50,
            orient: 'horizontal',
            itemHeight: 14,
            textStyle: {
                fontSize: 12,
            },
        },
        series: [
            {
                name: 'Plasmids',
                type: 'pie',
                data: overview_data.value.piehosts,
                label: {
                    fontSize: 15,
                },
            },
        ],
    }
    const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
    mypieEcharts2.setOption(hostTypeOptions)
    const inittreemapOption: echarts.EChartsOption = {
        toolbox: {
            itemSize: 20,
            iconStyle: {
                borderColor: 'rgb(18,49,73)',
            },
            feature: {
                saveAsImage: {},
            },
        },
        title: {
            text: 'Plasmid Host Taxonomy',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series: [
            {
                type: 'treemap',
                id: 'echarts-package-size',
                animationDurationUpdate: 1000,
                visibleMin: 100,
                roam: false,
                nodeClick: undefined,
                data: overview_data.value.treedata,
                universalTransition: true,

                label: {
                    show: true,
                },
                itemStyle: {
                    borderColor: '#fff',
                },
                breadcrumb: {
                    show: false,
                },
                levels: [
                    {
                        itemStyle: {
                            borderWidth: 0,
                            gapWidth: 5,
                        },
                    },
                    {
                        itemStyle: {
                            gapWidth: 1,
                        },
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            gapWidth: 1,
                            borderColorSaturation: 0.6,
                        },
                    },
                ],
            },
        ],
    }
    const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
    mytreeEcharts.setOption(inittreemapOption)
})

// const barcharthandleUpdateValue1 = (value: string) => {
//     barchartvalue1.value = value
//     if (value === 'Data Source Distribution') {
//         const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
//         mybarEcharts1.setOption(datasetsOption)
//     } else if (value === 'Phage Quality Tier Distribution') {
//         const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
//         mybarEcharts1.setOption(QualityOption)
//     } else if (value === 'Host Phylum Distribution') {
//         const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
//         mybarEcharts1.setOption(Hostnumber)
//     }
// }
// const barcharthandleUpdateValue2 = (value: string) => {
//     barchartvalue2.value = value
//     if (value === 'Data Source Distribution') {
//         const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
//         mybarEcharts2.setOption(datasetsOption)
//     } else if (value === 'Phage Quality Tier Distribution') {
//         const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
//         mybarEcharts2.setOption(QualityOption)
//     } else if (value === 'Host Phylum Distribution') {
//         const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
//         mybarEcharts2.setOption(Hostnumber)
//     }
// }

// const piecharthandleUpdateValue1 = (value: string) => {
//     piechartvalue1.value = value
//     if (value === 'Data Source Distribution') {
//         const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
//         mypieEcharts1.setOption(datasetspieOption)
//     } else if (value === 'Phage Lifestyle Distribution') {
//         const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
//         mypieEcharts1.setOption(lifestyleoption)
//     } else if (value === 'Phage Quality Tier Distribution') {
//         const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
//         mypieEcharts1.setOption(qualitypieOption)
//     }
// }
// const piecharthandleUpdateValue2 = (value: string) => {
//     piechartvalue2.value = value
//     if (value === 'Data Source Distribution') {
//         const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
//         mypieEcharts2.setOption(datasetspieOption)
//     } else if (value === 'Phage Lifestyle Distribution') {
//         const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
//         mypieEcharts2.setOption(lifestyleoption)
//     } else if (value === 'Phage Quality Tier Distribution') {
//         const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
//         mypieEcharts2.setOption(qualitypieOption)
//     } else {
//         const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
//         mypieEcharts2.setOption(hostTypeOptions)
//     }
// }

const godatahelper = () => {
    router.push({
        path: '/tutorial',
        query: { type: 'database_intro' },
    })
}
</script>

<style lang="scss" scoped>
:deep(.n-statistic .n-statistic-value .n-statistic-value__content) {
    font-size: 42px;
    color: #069;
    font-weight: bold;
}
</style>
