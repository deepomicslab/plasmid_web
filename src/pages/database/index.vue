mt-10 mr-10 w-40 mt-10 mr-10 w-40
<template>
    <div class="mx-30 my-10 h-full pb-10 flex flex-col justify-start">
        <div class="flex felx-row justify-start mt-8">
            <h1 class="text-5xl m-4 font-700">Database Overview</h1>

            <div class="flex flex-row ml-1 my-6">
                <el-button round color="#34498E" class="ml-5" @click="godatalist">
                    Total Data
                </el-button>
                <el-button round color="#34498E" class="ml-5" @click="godatahelper">
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
                            :to="873718"
                            :duration="1000"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700 ml-1">Phage Sequences</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-50">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="4723"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">Host Species</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-75">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="43088582"
                            :duration="1000"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">Annotated Proteins</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-85">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="6462417"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">
                                Transcription Terminators
                            </h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-65">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="702607"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">tRNA & tmRNA Genes</h1>
                        </template>
                    </n-statistic>
                </div>
            </div>
            <div class="flex flex-row mt-12">
                <!-- <div class="w-70 ml-8">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="397896"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">tRNA & tmRNA Genes</h1>
                        </template>
                    </n-statistic>
                </div> -->
                <div class="w-65 ml-3">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="307329"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">Anti-CRISPR Proteins</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-50">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="56652"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">CRISPR Arrays</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-75">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="41609"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">Virulent Factors</h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-85">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="2602"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">
                                Antimicrobial Resistance Genes
                            </h1>
                        </template>
                    </n-statistic>
                </div>
                <div class="w-65">
                    <n-statistic>
                        <n-number-animation
                            ref="numberAnimationInstRef"
                            :from="0"
                            :to="4020770"
                            show-separator
                        />
                        <template #label>
                            <h1 class="text-[#212529] text-lg font-700">Transmembrane Proteins</h1>
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
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Bacillota')"
                >
                    Bacillota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Bacteroidota')"
                >
                    Bacteroidota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Pseudomonadota')"
                >
                    Pseudomonadota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Thermodesulfobacteriota')"
                >
                    Thermodesulfobacteriota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Campylobacterota')"
                >
                    Campylobacterota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Verrucomicrobiota')"
                >
                    Verrucomicrobiota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Fusobacteriota')"
                >
                    Fusobacteriota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Spirochaetota')"
                >
                    Spirochaetota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Cyanobacteriota')"
                >
                    Cyanobacteriota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Synergistota')"
                >
                    Synergistota
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="viewhost('Others')"
                >
                    Others
                </n-button>
            </div>
        </div>
        <div class="mt-3 m-3">
            <div class="border-t-2"></div>
            <h1 class="text-4xl mt-8 ml-6 font-500">Data Source</h1>
            <div class="flex flex-row justify-start w-370 flex-wrap items-start ml-10 mt-6">
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage')"
                >
                    All
                </n-button>

                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_RefSeq')"
                >
                    RefSeq
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_Genbank')"
                >
                    Genbank
                </n-button>

                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_EMBL')"
                >
                    EMBL
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_DDBJ')"
                >
                    DDBJ
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_PhagesDB')"
                >
                    PhagesDB
                </n-button>

                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_GVD')"
                >
                    GVD
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_GPD')"
                >
                    GPD
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_MGV')"
                >
                    MGV
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_TemPhD')"
                >
                    TemPhD
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_CHVD')"
                >
                    CHVD
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_IGVD')"
                >
                    IGVD
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_IMG_VR')"
                >
                    IMG_VR
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_GOV2')"
                >
                    GOV2
                </n-button>
                <n-button
                    class="mt-10 mr-10 w-80 text-[#34498e] text-xl h-11"
                    tertiary
                    @click="gobyset('phage_STV')"
                >
                    STV
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
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#3262a8]">Bar Plot</h1>
                </div>
                <div class="flex flex-row justify-between mt-6 ml-8 w-285">
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
                </div>
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
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#3262a8]">Pie Chart</h1>
                </div>
                <div class="w-285 flex flex-row justify-between mt-6 ml-8">
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
                </div>

                <div class="flex flex-row">
                    <div
                        class="w-200 h-120 mb-10 mt-5 p-5 ml-8"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="mypieEcharts1" class="w-190 h-110" ref="echartpieDom1"></div>
                    </div>
                    <div
                        class="w-200 h-120 mb-10 mt-5 ml-10 p-5"
                        style="box-shadow: 0 0 64px #cfd5db"
                    >
                        <div id="mypieEcharts2" class="w-190 h-110" ref="echartpieDom2"></div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div>
                    <h1 class="text-3xl mt-9 ml-7 font-500 text-[#3262a8]">Tree Chart</h1>
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
                    class="w-410 h-240 ml-8 mt-10 mb-20 p-5"
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

import {
    datasetsOption,
    QualityOption,
    Hostnumber,
    lifestyleoption,
    datasetspieOption,
    qualitypieOption,
    treedata,
    hostTypeOptions,
} from '@/utils/overview'

const router = useRouter()
const godatalist = () => router.push({ path: '/database/phage' })

const gobyset = (seturl: string) => {
    router.push({ path: '/database/phage', query: { dataset: seturl } })
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

const treemapOption: echarts.EChartsOption = {
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
        },
        feature: {
            saveAsImage: {},
        },
    },
    title: {
        text: 'Phage Host Taxonomy',
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
            data: treedata,
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
        text: 'Phage Host Taxonomy',
        left: 'left',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
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
            data: treedata,
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

                        formatter(data: any) {
                            console.log(data)
                            if (data.data.value < 23000) {
                                return ' '
                            }
                            return data.data.name
                        },
                    },
                },
                {
                    r0: '45%',
                    r: '70%',
                    label: {
                        silent: true,
                        rotate: 'tangential',

                        formatter(data: any) {
                            console.log(data)
                            if (data.data.value < 23000) {
                                return ' '
                            }
                            return data.data.name
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
                        formatter(data: any) {
                            console.log(data)
                            if (data.data.value < 1000) {
                                return ' '
                            }
                            return data.data.name
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
        text: 'Phage Host Taxonomy',
        left: 'center',
    },
    toolbox: {
        itemSize: 20,
        iconStyle: {
            borderColor: '#34498e',
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
            data: [{ name: 'Hosts', value: '441637', children: treedata }],
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

const barchartvalue1 = ref('Phage Quality Tier Distribution')
const barchartvalue2 = ref('Host Phylum Distribution')

const barchartoptions1 = [
    {
        label: 'Phage Quality Tier Distribution',
        value: 'Phage Quality Tier Distribution',
    },
    {
        label: 'Data Source Distribution',
        value: 'Data Source Distribution',
    },
]
const barchartoptions2 = [
    {
        label: 'Host Phylum Distribution',
        value: 'Host Phylum Distribution',
    },
]
const piechartvalue1 = ref('Data Source Distribution')
const piechartvalue2 = ref('Phage Lifestyle Distribution')
const piechartoptions1 = [
    {
        label: 'Data Source Distribution',
        value: 'Data Source Distribution',
    },
    {
        label: 'Phage Quality Tier Distribution',
        value: 'Phage Quality Tier Distribution',
    },
]
const piechartoptions2 = [
    {
        label: 'Phage Lifestyle Distribution',
        value: 'Phage Lifestyle Distribution',
    },

    {
        label: 'Host Phylum Distribution',
        value: 'Host Phylum Distribution',
    },
]
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
const echartbarDom1 = ref<HTMLElement | null>(null)
const echartbarDom2 = ref<HTMLElement | null>(null)
const echartpieDom1 = ref<HTMLElement | null>(null)
const echartpieDom2 = ref<HTMLElement | null>(null)

const echartDom2 = ref<HTMLElement | null>(null)
const echartDom3 = ref<HTMLElement | null>(null)

const treecharthandleUpdateValue1 = (value: string) => {
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
onMounted(() => {
    const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
    mybarEcharts1.setOption(QualityOption)
    const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
    mybarEcharts2.setOption(Hostnumber)

    const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
    mypieEcharts1.setOption(datasetspieOption)
    const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
    mypieEcharts2.setOption(lifestyleoption)

    const mytreeEcharts = echarts.init(echartDom2.value as HTMLElement)
    mytreeEcharts.setOption(treemapOption)
})

const barcharthandleUpdateValue1 = (value: string) => {
    barchartvalue1.value = value
    if (value === 'Data Source Distribution') {
        const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
        mybarEcharts1.setOption(datasetsOption)
    } else if (value === 'Phage Quality Tier Distribution') {
        const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
        mybarEcharts1.setOption(QualityOption)
    } else if (value === 'Host Phylum Distribution') {
        const mybarEcharts1 = echarts.init(echartbarDom1.value as HTMLElement)
        mybarEcharts1.setOption(Hostnumber)
    }
}
const barcharthandleUpdateValue2 = (value: string) => {
    barchartvalue2.value = value
    if (value === 'Data Source Distribution') {
        const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
        mybarEcharts2.setOption(datasetsOption)
    } else if (value === 'Phage Quality Tier Distribution') {
        const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
        mybarEcharts2.setOption(QualityOption)
    } else if (value === 'Host Phylum Distribution') {
        const mybarEcharts2 = echarts.init(echartbarDom2.value as HTMLElement)
        mybarEcharts2.setOption(Hostnumber)
    }
}

const piecharthandleUpdateValue1 = (value: string) => {
    piechartvalue1.value = value
    if (value === 'Data Source Distribution') {
        const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
        mypieEcharts1.setOption(datasetspieOption)
    } else if (value === 'Phage Lifestyle Distribution') {
        const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
        mypieEcharts1.setOption(lifestyleoption)
    } else if (value === 'Phage Quality Tier Distribution') {
        const mypieEcharts1 = echarts.init(echartpieDom1.value as HTMLElement)
        mypieEcharts1.setOption(qualitypieOption)
    }
}
const piecharthandleUpdateValue2 = (value: string) => {
    piechartvalue2.value = value
    if (value === 'Data Source Distribution') {
        const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
        mypieEcharts2.setOption(datasetspieOption)
    } else if (value === 'Phage Lifestyle Distribution') {
        const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
        mypieEcharts2.setOption(lifestyleoption)
    } else if (value === 'Phage Quality Tier Distribution') {
        const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
        mypieEcharts2.setOption(qualitypieOption)
    } else {
        const mypieEcharts2 = echarts.init(echartpieDom2.value as HTMLElement)
        mypieEcharts2.setOption(hostTypeOptions)
    }
}

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
    color: #34498e;
    font-weight: bold;
}
</style>
