<template>
    <n-modal
        v-model:show="isShowDetail"
        preset="card"
        class="custom-card"
        :style="{
            width: '850px',
        }"
        size="huge"
    >
        <template #header>
            <el-text class="w-200px text-2xl" truncated>{{ phageStore.phageaccid }}</el-text>
        </template>
        <template #header-extra>
            <n-button type="primary" class="mr-3" size="small">
                Download
                <template #icon>
                    <n-icon>
                        <down />
                    </n-icon>
                </template>
            </n-button>
        </template>
        <div class="border-t-2 border-[#FFA000] mb-5"></div>
        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">Start:</p>
            {{ Number(selectProteinData.start) }}
        </div>
        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">Stop:</p>
            {{ Number(selectProteinData.end) }}
        </div>
        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">Strand:</p>
            {{ selectProteinData.strand === '+' ? 'Forward' : 'Backward' }}
        </div>
        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">COG category:</p>
            {{ selectProteinData.cog_category }}
        </div>
        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">Product:</p>
            {{ selectProteinData.product }}
        </div>

        <div class="flex flex-row text-xl">
            <p class="mr-3 font-bold">Protein Sequence:</p>
        </div>
        <div class="font-mono mt-2">
            <el-input
                autosize
                type="textarea"
                class="font-mono mt-1 tracking-wide text-lg"
                readonly
                v-model="selectProteinData.sequence"
            />
        </div>
    </n-modal>

    <div class="flex flex-row bg-gray-50 w-310 h-28">
        <div class="w-120 h-28">
            <div
                v-if="isShowSelect"
                class="text-[18px] text-[#4b89da] mt-17 ml-6 leading-6 flex flex-row"
            >
                <div class="mr-2 text-xl">
                    <n-icon>
                        <info />
                    </n-icon>
                </div>
                Click on a sequence to see details.
            </div>
            <div v-else class="h-28 flex flex-col">
                <div class="flex flex-row p-2 mt-13 w-70 bg-gray-400 h-11">
                    <div class="text-[18px] mt-1 ml-3">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="selectProtein.protein_id"
                            placement="top-start"
                            v-if="selectProtein.protein_id.length > 14"
                        >
                            <el-text class="w-150px text-white text-[18px]" truncated>
                                {{ selectProtein.protein_id }}
                            </el-text>
                        </el-tooltip>
                        <el-text class="w-150px text-white text-[18px]" truncated v-else>
                            {{ selectProtein.protein_id }}
                        </el-text>
                    </div>
                    <n-button
                        size="small"
                        class="text-[12px] ml-6 h-6 mt-0.5"
                        type="info"
                        @click="showDetail"
                    >
                        Detail
                        <template #icon>
                            <n-icon>
                                <info />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </div>
        </div>
        <div class="text-3xl font-800 ml-7 mt-10"></div>

        <el-button class="mt-15 ml-80" type="primary" @click="downloadsvg">
            <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
            Download SVG Chart
        </el-button>
        <el-button class="mt-15 ml-3" type="primary" @click="downloadSVGAsPNG">
            <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
            Download PNG Chart
        </el-button>
    </div>
    <el-scrollbar class="h-165 flex flex-row items-center" v-loading="loadchart">
        <el-button class="mt-5 ml-3 absolute z-10 ml-290" type="primary" v-if="false">
            <el-icon class="text-xl"><Operation /></el-icon>
        </el-button>

        <svg id="Viz_area_annotation" :height="height" :width="width"></svg>
    </el-scrollbar>
    <div class="w-310 h-85 bg-gray-200 flex justify-center">
        <svg id="Legend_area" height="400" width="1140"></svg>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { CloudDownload as down, InformationCircle as info } from '@vicons/ionicons5'
import { Document, Operation } from '@element-plus/icons-vue'
import * as d3 from 'd3'
import _ from 'lodash'
import { TypeDict, proteinType, countGC } from '@/utils/annotation'
import { COGCategoryDict } from '@/utils/phage'
import { usePhageStore } from '@/store/phage'

const phageStore = usePhageStore()

// const props = defineProps({
//     proteinUrl: String,
//     geneUrl: String,
// })
const loadchart = ref(true)
// For layout
const width = ref(1200)
const height = ref(800)
// const marginTop = ref(20)
const marginLeft = ref(40)
const lineHeight = ref(180)
// for draw arrow
const barareaMarginLeft = ref(70)
const barHeight = ref(30)
const triangleOffset = ref(15)
const arrowWeight = ref(7)
// for note label
// const regionHeight = ref(51)

// For calculate GC-content
const gcwindow = ref(20)
const gcContentData = ref()

const isShowDetail = ref(false)
const isShowSelect = ref(true)
const selectProtein = reactive({
    Protein_id: '',
})

const title = ref('')

const selectProteinData = ref()

const showDetail = () => {
    isShowDetail.value = true
}
// draw arrow method
function forwordtriangle(start, end, y) {
    if (end - start > triangleOffset.value) {
        return `M ${end} ${y + barHeight.value / 2} L ${end - triangleOffset.value} ${y} V ${
            y + arrowWeight.value
        }  H ${start} V ${y + barHeight.value - arrowWeight.value} H  ${
            end - triangleOffset.value
        } V ${y + barHeight.value} Z`
    }
    return `M ${end} ${y + barHeight.value / 2} L ${start} ${y}  V ${y + barHeight.value}  Z`
}
function backtriangle(start, end, y) {
    if (end - start > triangleOffset.value) {
        return `M ${end} ${y + arrowWeight.value} H ${
            start + triangleOffset.value
        } V ${y} L ${start} ${y + barHeight.value / 2}  L ${start + triangleOffset.value} ${
            y + barHeight.value
        } V  ${y + barHeight.value - arrowWeight.value}   H ${end} Z`
    }
    return `M ${end} ${y} V ${y + barHeight.value}  L ${start}  ${y + barHeight.value / 2}  Z`
}

// draw region method
// function regionLine(start, end, y, close) {
//     if (close === '[1, 1]') {
//         return `M ${start} ${y} V ${y - regionHeight.value}  H ${end} V ${y}`
//     }
//     if (close === '[1, 0]') {
//         return `M ${start} ${y} V ${y - regionHeight.value}  H ${end} `
//     }
//     if (close === '[0, 0]') {
//         return `M ${start} ${y - regionHeight.value}  H ${end}  `
//     }
//     return `M ${start} ${y - regionHeight.value}  H ${end} V ${y} `
// }
const fastadata = computed(() => {
    return phageStore.phagefastadata
})
const proteindata = computed(() => {
    return phageStore.phageprotein
})

const loaddata = computed(() => {
    return phageStore.phagedataloaded
})
watch(loaddata, () => {
    if (loaddata.value) {
        d3.select('#Viz_area_annotation').selectAll('*').remove()
        d3.select('#Legend_area').selectAll('*').remove()
        const textList = _.drop(_.split(fastadata.value, '\n'))
        const fastastring = _.join(textList, '')
        let x = 0
        const calArray = []
        while (x + gcwindow.value < fastastring.length) {
            const gcContent = countGC(fastastring.slice(x, x + gcwindow.value))
            calArray.push([x + gcwindow.value / 2, gcContent])
            x += gcwindow.value
        }
        const splitGC = _.groupBy(calArray, d => {
            // eslint-disable-next-line no-bitwise
            return (Number(d[0]) / 10000) | 0
        })
        gcContentData.value = splitGC

        const data = proteindata.value
        title.value = data[0].plasmid_id
        // const copydata = JSON.parse(JSON.stringify(data))
        const splitdata = _.groupBy(data, d => {
            // eslint-disable-next-line no-bitwise
            return (Number(d.start) / 10000) | 0
        })
        _.forEach(splitdata, (group, k) => {
            _.forEach(group, d => {
                // eslint-disable-next-line no-bitwise
                const s = (Number(d.start) / 10000) | 0
                if (s !== Number(k)) {
                    const newDict = { ...d }
                    newDict.end = k * 10000
                    // eslint-disable-next-line no-param-reassign
                    d.start = newDict.end
                    splitdata[String(s)].push(newDict)
                }
            })
        })
        // The legend at the bottom
        const legnedSvg = d3.select('#Legend_area')
        legnedSvg
            .selectAll('legendLabel')
            .data(proteinType)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
                // eslint-disable-next-line no-bitwise
                return ((i / 9) | 0) * 400 + 50
            })
            .attr('y', function (d, i) {
                return (i % 9) * 30 + 35
            })
            .attr('width', 20)
            .attr('height', 20)
            .style('fill', function (d) {
                return TypeDict[d].color
            })
        legnedSvg
            .selectAll('legendText')
            .data(proteinType)
            .enter()
            .append('text')
            .attr('x', function (d, i) {
                // eslint-disable-next-line no-bitwise
                return ((i / 9) | 0) * 400 + 75
            })
            .attr('y', function (d, i) {
                return (i % 9) * 30 + 47
            })
            .style('fill', '#818181')
            .text(function (d) {
                return TypeDict[d].name
            })
            .attr('text-anchor', 'start')
            .style('alignment-baseline', 'middle')

        height.value = (_.size(splitdata) - 1) * lineHeight.value + 250
        const svg = d3
            .select('#Viz_area_annotation')
            .attr('transform', `translate(${marginLeft.value}, 0)`)
            .on('dblclick', function () {
                console.log('666')
            })

        const gcY = d3.scaleLinear().domain([20, 80]).range([40, 0])

        const bararea = svg
            .append('svg')
            .attr('height', height.value)
            .attr('width', 1000)
            .attr('x', barareaMarginLeft.value)
            .attr('y', 0)
        _.forEach(splitdata, (d, k) => {
            const start = Number(k) * 10000
            const end = (Number(k) + 1) * 10000
            // Main X axis
            svg.append('g')
                .attr(
                    'transform',
                    `translate(${barareaMarginLeft.value},${k * lineHeight.value + 100})`
                )
                .attr('color', '#818181')
                .call(
                    d3
                        .axisBottom(d3.scaleLinear().domain([start, end]).range([0, 1000]))
                        .ticks(10)
                        .tickFormat(function (t) {
                            return t === 0 ? 0 : `${t / 1000}`
                        })
                )

            // Add some text in figure
            svg.append('text')
                .attr(
                    'transform',
                    `translate(${1000 + barareaMarginLeft.value + 8},${
                        k * lineHeight.value + 115.5
                    })`
                )
                .style('fill', '#818181')
                .text('(kb)')
                .style('font-size', 11)

            // GC-Content Y axis
            svg.append('g')
                .attr(
                    'transform',
                    `translate(${1000 + barareaMarginLeft.value + 2},${k * lineHeight.value + 130})`
                )
                .attr('color', '#818181')
                .call(
                    d3
                        .axisRight(gcY)

                        .tickValues([20, 50, 80])
                        .tickFormat(function (t) {
                            return `${t}%`
                        })
                )
                .style('font-size', 10)
            svg.append('text')
                .attr('transform', `translate(13,${k * lineHeight.value + 149})`)
                .style('fill', '#818181')
                .text('GC-')
                .style('font-size', 14)
            svg.append('text')
                .attr('transform', `translate(0,${k * lineHeight.value + 168})`)
                .style('fill', '#818181')
                .text('Content')
                .style('font-size', 14)

            // Draw GC-Content plot
            // backgrad for GC-Content plot
            svg.append('rect')
                .attr('x', 0)
                .attr('width', 1000)
                .attr('height', 40)
                .style('fill', '#8ab3e7')
                .style('opacity', '0.2')
                .attr(
                    'transform',
                    `translate(${barareaMarginLeft.value},${k * lineHeight.value + 130})`
                )
            // draw GC-Content line
            svg.append('path')
                .datum(gcContentData.value[k])
                .attr('fill', '#367dd6')
                .attr(
                    'd',
                    d3
                        .area()
                        .x(function (c) {
                            return d3.scaleLinear().domain([start, end]).range([0, 1000])(c['0'])
                        })
                        .y0(gcY(50))
                        .y1(function (c) {
                            // A bug in d3.area() when the value is NaN
                            if (Number.isNaN(c['1'])) {
                                return gcY(50)
                            }
                            return gcY(c['1'] * 100)
                        })
                )
                .attr(
                    'transform',
                    `translate(${barareaMarginLeft.value},${k * lineHeight.value + 130})`
                )
            const toolarea = svg
                .append('svg')
                .attr('height', 100)
                .attr('width', 260)
                .style('opacity', 0)
            toolarea
                .append('rect')
                .attr('x', 0)
                .attr('width', 260)
                .attr('height', 70)
                .style('fill', 'black')
                .style('opacity', 0.6)
            const toolText1 = toolarea
                .append('text')
                .style('fill', 'white')
                .attr('transform', `translate(10,20)`)
                .style('font-size', 12)
            const toolText2 = toolarea
                .append('text')
                .style('fill', 'white')
                .attr('transform', `translate(10,40)`)
                .style('font-size', 12)
            const toolText3 = toolarea
                .append('text')
                .style('fill', 'white')
                .attr('transform', `translate(10,60)`)
                .style('font-size', 12)

            // Arrow Bar
            const mouseenter = function (md, mv) {
                bararea.selectAll('.geneline').style('opacity', 0.3)
                d3.select(this).style('opacity', 1)
                toolarea
                    .style('opacity', 1)
                    .attr('x', md.layerX - 30)
                    .attr('y', md.layerY - 30)
                toolText1.text(function () {
                    return `COG category : ${COGCategoryDict[mv.cog_category]}`
                })
                toolText2.text(function () {
                    return `Product : ${mv.product}`
                })
                toolText3.text(function () {
                    return `location : ${Number(mv.start)}-${Number(mv.end)}`
                })
            }
            const mouseleave = function () {
                bararea.selectAll('.geneline').style('opacity', 1)
                toolarea.style('opacity', 0).attr('x', 0).attr('y', 0)
            }
            const click = function (md, mv) {
                bararea
                    .selectAll('.geneline')
                    .style('stroke', '#818181')
                    .attr('stroke-width', '1px')
                isShowSelect.value = false
                d3.select(this).style('stroke', '#FE0e79').attr('stroke-width', '2px')
                selectProtein.Protein_id = mv.Protein_id
                selectProteinData.value = mv
            }
            bararea
                .selectAll('geneline')
                .data(d)
                .enter()
                .append('path')
                .attr('class', 'geneline')
                .attr('d', function (i) {
                    const startX = d3.scaleLinear().domain([start, end]).range([0, 1000])(
                        Number(i.start)
                    )
                    const endX = d3.scaleLinear().domain([start, end]).range([0, 1000])(
                        Number(i.end)
                    )
                    return i.strand === '+'
                        ? forwordtriangle(startX, endX, k * lineHeight.value + 65)
                        : backtriangle(startX, endX, k * lineHeight.value + 65)
                })
                .attr('fill', function (i) {
                    if (i.cog_category in TypeDict) return TypeDict[i.cog_category].color
                    return TypeDict.S.color
                })
                .attr('stroke', '#5b5b5b')
                .attr('stroke-width', '1px')
                .on('mouseenter ', mouseenter)
                .on('mouseleave', mouseleave)
                .on('click', click)
        })
        loadchart.value = false
    }
})

// watch(fastadata, () => {
//     d3.select('#Viz_area_annotation').selectAll('*').remove()
//     d3.select('#Legend_area').selectAll('*').remove()
//     const textList = _.drop(_.split(fastadata.value, '\n'))
//     const fastastring = _.join(textList, '')
//     let x = 0
//     const calArray = []
//     while (x + gcwindow.value < fastastring.length) {
//         const gcContent = countGC(fastastring.slice(x, x + gcwindow.value))
//         calArray.push([x + gcwindow.value / 2, gcContent])
//         x += gcwindow.value
//     }
//     const splitGC = _.groupBy(calArray, d => {
//         // eslint-disable-next-line no-bitwise
//         return (Number(d[0]) / 10000) | 0
//     })
//     gcContentData.value = splitGC
// })

// watch(gcContentData, () => {
//     const data = proteindata.value
//     title.value = data[0].Phage_Acession_ID
//     // const copydata = JSON.parse(JSON.stringify(data))

//     const splitdata = _.groupBy(data, d => {
//         // eslint-disable-next-line no-bitwise
//         return (Number(d.end) / 10000) | 0
//     })

//     _.forEach(splitdata, (group, k) => {
//         _.forEach(group, d => {
//             // eslint-disable-next-line no-bitwise
//             const s = (Number(d.start) / 10000) | 0
//             if (s !== Number(k)) {
//                 const newDict = { ...d }
//                 newDict.end = k * 10000
//                 // eslint-disable-next-line no-param-reassign
//                 d.start = newDict.end
//                 splitdata[String(s)].push(newDict)
//             }
//         })
//     })

//     //  region data processing
//     // const region = []
//     // let count = 0

//     // _.forEach(copydata, proData => {
//     //     if (count !== 0) {
//     //         const classlist = proData.Protein_function_classification?.split(';').slice(
//     //             0,
//     //             -1
//     //         ) as string[]
//     //         if (
//     //             region[count - 1].Protein_function_classification ===
//     //                 proData.Protein_function_classification ||
//     //             _.intersection(classlist, region[count - 1].proteinType).length > 0
//     //         ) {
//     //             region[count - 1].idlist.push(proData.id)
//     //             region[count - 1].end = proData.end
//     //         } else {
//     //             region[count] = {
//     //                 idlist: [proData.id],
//     //                 proteinType: proData.Protein_function_classification?.split(';').slice(
//     //                     0,
//     //                     -1
//     //                 ) as string[],
//     //                 Protein_function_classification: proData.Protein_function_classification,
//     //                 start: proData.start,
//     //                 end: proData.end,
//     //             }
//     //             count += 1
//     //         }
//     //     } else {
//     //         const classlist = proData.Protein_function_classification?.split(';').slice(
//     //             0,
//     //             -1
//     //         ) as string[]
//     //         region[count] = {
//     //             idlist: [proData.id],
//     //             proteinType: classlist,
//     //             start: proData.start,
//     //             end: proData.end,
//     //             Protein_function_classification: proData.Protein_function_classification,
//     //         }
//     //         count += 1
//     //     }
//     // })

//     // const filterRegion = _.filter(region, function (o) {
//     //     return (
//     //         o.Protein_function_classification !== 'unsorted;' &&
//     //         o.Protein_function_classification !== 'hypothetical;' &&
//     //         o.idlist.length > 1
//     //     )
//     // })
//     // let regionText = []
//     // _.forEach(filterRegion, r => {
//     //     // eslint-disable-next-line no-bitwise
//     //     let sInt = (Number(r.start) / 10000) | 0
//     //     // eslint-disable-next-line no-bitwise
//     //     const eInt = (Number(r.end) / 10000) | 0
//     //     const templist = []
//     //     if (sInt !== eInt) {
//     //         templist.push({
//     //             proteinType: r.proteinType,
//     //             start: r.start,
//     //             end: (sInt + 1) * 10000,
//     //             close: '[1, 0]',
//     //             showText: false,
//     //         })
//     //         sInt += 1
//     //         while (sInt !== eInt) {
//     //             templist.push({
//     //                 proteinType: r.proteinType,
//     //                 start: sInt * 10000,
//     //                 end: (sInt + 1) * 10000,
//     //                 close: '[0, 0]',
//     //                 showText: false,
//     //             })
//     //             sInt += 1
//     //         }
//     //         templist.push({
//     //             proteinType: r.proteinType,
//     //             start: sInt * 10000,
//     //             end: r.end,
//     //             close: '[0, 1]',
//     //             showText: false,
//     //         })
//     //         _.maxBy(templist, function (o) {
//     //             return o.end - o.start
//     //         }).showText = true
//     //         regionText = _.concat(regionText, templist)
//     //     } else {
//     //         regionText.push({
//     //             proteinType: r.proteinType,
//     //             start: r.start,
//     //             end: r.end,
//     //             close: '[1, 1]',
//     //             showText: true,
//     //         })
//     //     }
//     // })

//     // The legend at the bottom
//     const legnedSvg = d3.select('#Legend_area')
//     legnedSvg
//         .selectAll('legendLabel')
//         .data(proteinType)
//         .enter()
//         .append('rect')
//         .attr('x', function (d, i) {
//             // eslint-disable-next-line no-bitwise
//             return ((i / 2) | 0) * 140 + 140
//         })
//         .attr('y', function (d, i) {
//             return (i % 2) * 30 + 35
//         })
//         .attr('width', 20)
//         .attr('height', 20)
//         .style('fill', function (d) {
//             return TypeDict[d].color
//         })
//     legnedSvg
//         .selectAll('legendText')
//         .data(proteinType)
//         .enter()
//         .append('text')
//         .attr('x', function (d, i) {
//             // eslint-disable-next-line no-bitwise
//             return ((i / 2) | 0) * 140 + 170
//         })
//         .attr('y', function (d, i) {
//             return (i % 2) * 30 + 47
//         })
//         .style('fill', '#818181')
//         .text(function (d) {
//             return TypeDict[d].name
//         })
//         .attr('text-anchor', 'start')
//         .style('alignment-baseline', 'middle')

//     height.value = (_.size(splitdata) - 1) * lineHeight.value + 250
//     const svg = d3
//         .select('#Viz_area_annotation')
//         .attr('transform', `translate(${marginLeft.value}, 0)`)
//         .on('dblclick', function () {
//             console.log('666')
//         })

//     const gcY = d3.scaleLinear().domain([20, 80]).range([40, 0])

//     // Labeling of functional areas
//     // svg.selectAll('regionText')
//     //     .data(regionText)
//     //     .enter()
//     //     .append('text')
//     //     .text(function (i) {
//     //         return i.showText
//     //             ? _.join(
//     //                   _.map(i.proteinType, t => {
//     //                       return TypeDict[t].name
//     //                   }),
//     //                   ' & '
//     //               )
//     //             : ''
//     //     })
//     //     .attr('transform', function (i) {
//     //         // eslint-disable-next-line no-bitwise
//     //         const k = (Number(i.start) / 10000) | 0
//     //         const startX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.start))
//     //         const endX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.end))
//     //         return `translate(${
//     //             (startX + endX) / 2 + barareaMarginLeft.value
//     //         },${k * lineHeight.value + marginTop.value + 10})`
//     //     })
//     //     .style('fill', '#424242')
//     //     .attr('text-anchor', 'middle')
//     //     .style('font-size', 18)
//     //     .style('font-weight', 800)

//     // svg.selectAll('regionline')
//     //     .data(regionText)
//     //     .enter()
//     //     .append('path')
//     //     .attr('d', function (i) {
//     //         // eslint-disable-next-line no-bitwise
//     //         const k = (Number(i.start) / 10000) | 0
//     //         const startX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.start))
//     //         const endX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.end))
//     //         return regionLine(
//     //             startX + barareaMarginLeft.value - 1,
//     //             endX + barareaMarginLeft.value + 1,
//     //             k * lineHeight.value + 98,
//     //             i.close
//     //         )
//     //     })
//     //     .style('fill', 'None')
//     //     .attr('stroke', '#424242')
//     //     .attr('stroke-width', '1px')
//     //     .attr('stroke-dasharray', '3,3')
//     const bararea = svg
//         .append('svg')
//         .attr('height', height.value)
//         .attr('width', 1000)
//         .attr('x', barareaMarginLeft.value)
//         .attr('y', 0)

//     // bararea
//     //     .selectAll('regionArea')
//     //     .data(regionText)
//     //     .enter()
//     //     .append('rect')
//     //     .attr('width', function (i) {
//     //         // eslint-disable-next-line no-bitwise
//     //         const k = (Number(i.start) / 10000) | 0
//     //         const startX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.start))
//     //         const endX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.end))
//     //         return endX - startX
//     //     })
//     //     .attr('height', 50)
//     //     .style('fill', function (i) {
//     //         return i.proteinType.length === 1
//     //             ? TypeDict[i.proteinType[0]].color
//     //             : TypeDict.S.color
//     //     })
//     //     .style('opacity', '0.2')
//     //     .attr('transform', function (i) {
//     //         // eslint-disable-next-line no-bitwise
//     //         const k = (Number(i.start) / 10000) | 0
//     //         const startX = d3
//     //             .scaleLinear()
//     //             .domain([Number(k) * 10000, (Number(k) + 1) * 10000])
//     //             .range([0, 1000])(Number(i.start))

//     //         return `translate(${startX},${k * lineHeight.value + 48})`
//     //     })

//     _.forEach(splitdata, (d, k) => {
//         const start = Number(k) * 10000
//         const end = (Number(k) + 1) * 10000
//         // Main X axis
//         svg.append('g')
//             .attr(
//                 'transform',
//                 `translate(${barareaMarginLeft.value},${k * lineHeight.value + 100})`
//             )
//             .attr('color', '#818181')
//             .call(
//                 d3
//                     .axisBottom(d3.scaleLinear().domain([start, end]).range([0, 1000]))
//                     .ticks(10)
//                     .tickFormat(function (t) {
//                         return t === 0 ? 0 : `${t / 1000}`
//                     })
//             )

//         // Add some text in figure
//         svg.append('text')
//             .attr(
//                 'transform',
//                 `translate(${1000 + barareaMarginLeft.value + 8},${k * lineHeight.value + 115.5})`
//             )
//             .style('fill', '#818181')
//             .text('(kb)')
//             .style('font-size', 11)

//         // GC-Content Y axis
//         svg.append('g')
//             .attr(
//                 'transform',
//                 `translate(${1000 + barareaMarginLeft.value + 2},${k * lineHeight.value + 130})`
//             )
//             .attr('color', '#818181')
//             .call(
//                 d3
//                     .axisRight(gcY)

//                     .tickValues([20, 50, 80])
//                     .tickFormat(function (t) {
//                         return `${t}%`
//                     })
//             )
//             .style('font-size', 10)
//         svg.append('text')
//             .attr('transform', `translate(13,${k * lineHeight.value + 149})`)
//             .style('fill', '#818181')
//             .text('GC-')
//             .style('font-size', 14)
//         svg.append('text')
//             .attr('transform', `translate(0,${k * lineHeight.value + 168})`)
//             .style('fill', '#818181')
//             .text('Content')
//             .style('font-size', 14)

//         // Draw GC-Content plot
//         // backgrad for GC-Content plot
//         svg.append('rect')
//             .attr('x', 0)
//             .attr('width', 1000)
//             .attr('height', 40)
//             .style('fill', '#8ab3e7')
//             .style('opacity', '0.2')
//             .attr(
//                 'transform',
//                 `translate(${barareaMarginLeft.value},${k * lineHeight.value + 130})`
//             )
//         // draw GC-Content line
//         svg.append('path')
//             .datum(gcContentData.value[k])
//             .attr('fill', '#367dd6')
//             .attr(
//                 'd',
//                 d3
//                     .area()
//                     .x(function (c) {
//                         return d3.scaleLinear().domain([start, end]).range([0, 1000])(c['0'])
//                     })
//                     .y0(gcY(50))
//                     .y1(function (c) {
//                         // A bug in d3.area() when the value is NaN
//                         if (Number.isNaN(c['1'])) {
//                             return gcY(50)
//                         }
//                         return gcY(c['1'] * 100)
//                     })
//             )
//             .attr(
//                 'transform',
//                 `translate(${barareaMarginLeft.value},${k * lineHeight.value + 130})`
//             )
//         const toolarea = svg
//             .append('svg')
//             .attr('height', 100)
//             .attr('width', 260)
//             .style('opacity', 0)
//         toolarea
//             .append('rect')
//             .attr('x', 0)
//             .attr('width', 260)
//             .attr('height', 70)
//             .style('fill', 'black')
//             .style('opacity', 0.6)
//         const toolText1 = toolarea
//             .append('text')
//             .style('fill', 'white')
//             .attr('transform', `translate(10,20)`)
//             .style('font-size', 12)
//         const toolText2 = toolarea
//             .append('text')
//             .style('fill', 'white')
//             .attr('transform', `translate(10,40)`)
//             .style('font-size', 12)
//         const toolText3 = toolarea
//             .append('text')
//             .style('fill', 'white')
//             .attr('transform', `translate(10,60)`)
//             .style('font-size', 12)

//         // Arrow Bar
//         const mouseenter = function (md, mv) {
//             bararea.selectAll('.geneline').style('opacity', 0.3)
//             d3.select(this).style('opacity', 1)
//             toolarea
//                 .style('opacity', 1)
//                 .attr('x', md.layerX - 30)
//                 .attr('y', md.layerY - 30)
//             toolText1.text(function () {
//                 return `Classification : ${mv.Protein_function_classification}`
//             })
//             toolText2.text(function () {
//                 return `Product : ${mv.Protein_product}`
//             })
//             toolText3.text(function () {
//                 return `location : ${Number(mv.start)}-${Number(mv.end)}`
//             })
//         }
//         const mouseleave = function () {
//             bararea.selectAll('.geneline').style('opacity', 1)
//             toolarea.style('opacity', 0).attr('x', 0).attr('y', 0)
//         }
//         const click = function (md, mv) {
//             bararea.selectAll('.geneline').style('stroke', '#818181').attr('stroke-width', '1px')
//             isShowSelect.value = false
//             d3.select(this).style('stroke', '#FE0e79').attr('stroke-width', '2px')
//             selectProtein.Protein_id = mv.Protein_id
//             selectProteinData.value = mv
//         }
//         bararea
//             .selectAll('geneline')
//             .data(d)
//             .enter()
//             .append('path')
//             .attr('class', 'geneline')
//             .attr('d', function (i) {
//                 const startX = d3.scaleLinear().domain([start, end]).range([0, 1000])(
//                     Number(i.start)
//                 )
//                 const endX = d3.scaleLinear().domain([start, end]).range([0, 1000])(
//                     Number(i.end)
//                 )

//                 return i.Strand === '+'
//                     ? forwordtriangle(startX, endX, k * lineHeight.value + 65)
//                     : backtriangle(startX, endX, k * lineHeight.value + 65)
//             })
//             .attr('fill', function (i) {
//                 const classlist = i.Protein_function_classification?.split(';').slice(
//                     0,
//                     -1
//                 ) as string[]
//                 if (classlist.length === 1) {
//                     if (classlist[0] in TypeDict) {
//                         return TypeDict[classlist[0]].color
//                     }
//                     return TypeDict.S.color
//                 }
//                 return TypeDict.S.color
//             })
//             .attr('stroke', '#5b5b5b')
//             .attr('stroke-width', '1px')
//             .on('mouseenter ', mouseenter)
//             .on('mouseleave', mouseleave)
//             .on('click', click)
//     })
//     loadchart.value = false
// })

function downloadsvg() {
    const svgElement = document.getElementById('Viz_area_annotation') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'annotation.svg'
    link.click()
    URL.revokeObjectURL(url)
}
const downloadSVGAsPNG = async () => {
    const svgElement = document.getElementById('Viz_area_annotation') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const svgDataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`

    const img = new Image()
    img.src = svgDataURL

    await new Promise(resolve => {
        img.onload = () => {
            resolve()
        }
    })

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
        ctx.drawImage(img, 0, 0)
    }

    canvas.toBlob(blob => {
        if (blob) {
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = 'my-svg-image.png'
            link.click()

            URL.revokeObjectURL(url)
        }
    }, 'image/png')
}
</script>
