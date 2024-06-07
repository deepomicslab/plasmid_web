<template>
    <div class="h-240">
        <div class="w-310 h-20 bg-gray-200 flex flex-row items-center justify-center">
            <el-button class="" type="primary" @click="downloadsvg">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download SVG Chart
            </el-button>
            <el-button class="ml-3" type="primary" @click="downloadSVGAsPNG">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download PNG Chart
            </el-button>
        </div>
        <el-scrollbar class="h-220" v-loading="loadchart">
            <svg id="Viz_ter" :height="height" :width="width"></svg>
        </el-scrollbar>
        <!-- <div class="w-310 h-30 bg-gray-200 flex justify-center">
            <svg id="Legend_ter" height="120" width="1140"></svg>
        </div> -->
    </div>
</template>
<!-- Function for radial charts -->
<script setup lang="ts">
// @ts-nocheck
/*eslint-disable*/
/* eslint-disable camelcase */ 
import * as d3 from 'd3'
import _ from 'lodash'
import { Document, Operation } from '@element-plus/icons-vue'
import { TypeDict, proteinType, gcTypeDict, gcType, countGC, countGCSkew } from '@/utils/annotation'
import { usePhageStore } from '@/store/phage'

const phageStore = usePhageStore()

const loadchart = ref(true)
const width = ref(1240)
const height = ref(940)
const leftMargin = 0
const innerCircleR = ref(180) // if allowing users dynmically change this value, tick's postion should be changed
const middleCircleR = ref(360)
const outerCircleR = ref(390)

const circleStrokeWidth = 3

const cx = computed(() => leftMargin + width.value / 2)
const cy = computed(() => height.value / 2)
const arrowWidth = ref(20)

const fastaLength = ref()
const gcwindow = ref(30) //set it as 30 - 50, avoid too small so that the curve line is steep

// For calculating GC-content
const gcContentArc = ref(80)
const gcContentBaseR = computed(() => innerCircleR.value + 5)
const gcContentMidR = computed(() => gcContentBaseR.value + gcContentArc.value / 2)
const gcContent = ref()

//For calculating GC - skew
const gcSkewArc = ref(80)
const gcSkewBaseR = computed(() => gcContentBaseR.value + gcContentArc.value)
const gcSkewMidR = computed(() => gcSkewBaseR.value + gcSkewArc.value / 2)
const gcSkewPlus = ref()
const gcSkewMinus = ref()

const proteindata = computed(() => {
    return phageStore.phageprotein
})
const terminators = computed(() => {
    return phageStore.phageterminator
})

const fastadata = computed(() => {
    return phageStore.phagefastadata
})


const getPointPosition = (rad, radius) => {
    return [cx.value + radius * Math.cos(rad), cy.value + radius * Math.sin(rad)]
}

const getPositionOuterC = (rad, offset) => {
    return getPointPosition(rad, outerCircleR.value + offset)
}

const getPositionMiddleC = (rad, offset) => {
    return getPointPosition(rad, middleCircleR.value + offset)
}

const getPositionInnerC = (rad, offset) => {
    return getPointPosition(rad, innerCircleR.value + offset)
}

const lowerBound = 70
const upperBound = 100
const lowerBoundColor = '#ffe5e5'
const upperBoundColor = '#990000'
const colorScaler = d3
    .scaleLinear()
    .range([lowerBoundColor, upperBoundColor])
    .domain([lowerBound, upperBound])
const getColor = confidence => {
    // const lowerBoundColor = '#F7F7F7'
    let resultColor
    if (confidence < lowerBound) {
        resultColor = lowerBoundColor
    } else {
        resultColor = colorScaler(confidence)
    }
    return resultColor
}

const drawConfidenceLegend = () => {
    const vizArea = d3.select('#Viz_ter')
    const confidenceLegend = vizArea
        .append('svg')
        .attr('x', width.value-120)
        .attr('y', height.value-190)
        .attr('width', 140)
        .attr('height', 190)

    confidenceLegend
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .text('Confidence Level')
        .attr('font-size', '12px')
        .style('fill','#333639')
        .style('alignment-baseline', 'hanging')
    // Define the linear gradient
    const gradient = confidenceLegend
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')

    gradient.append('stop').attr('offset', '0%').attr('stop-color', lowerBoundColor)

    gradient.append('stop').attr('offset', '100%').attr('stop-color', upperBoundColor)
    const ml = 20
    const rectH = 150
    const mt = 30
    // Use the gradient as the fill style of a rectangle
    confidenceLegend
        .append('rect')
        .attr('x', ml)
        .attr('y', mt)
        .attr('width', 20)
        .attr('height', rectH)
        .style('fill', 'url(#gradient)')
        .style('stroke', 'gray')

    const axisScale = d3.scaleLinear().domain([70, 100]).range([mt, mt+rectH])

    const axis = d3
        .axisRight(axisScale)
        .ticks(5)
        .tickFormat(d => (d === 70 ? '<=70' : d))

    // Draw the axis
    confidenceLegend.append('g').attr('transform', `translate(${ml+30}, 0)`).call(axis)
}

const drawLegend = () => {
    const legendSvg = d3.select('#Viz_ter')
                        .append('svg')
                        .attr('id', 'Legend_ter')
                        .attr('x',0)
                        .attr('y',height.value-180)
    const legendType = [...proteinType]

    // lengendSvg
    
    legendSvg
        .selectAll('legendLabel')
        .data(legendType)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            return (i % 2) * 140 + 15
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return ((i / 2) | 0) * 30 
        })
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', function (d) {
            return TypeDict[d].color
        })
    legendSvg
        .selectAll('legendText')
        .data(legendType)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
            return  (i % 2) * 140 + 40
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return  ((i / 2) | 0) * 30 + 12
        })
        .style('fill', '#818181')
        .text(function (d) {
            return TypeDict[d].name
        })
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
}

const drawGCLegend = () => {
    const legendSvg = d3.select('#Viz_ter')
                        .append('svg')
                        .attr('x',15)
                        .attr('y',15)
    
    // lengendSvg
    legendSvg
        .selectAll('legend')
        .data(gcType)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            return 0
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return i*30 
        })
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', function (d) {
            return gcTypeDict[d].color
        })
    legendSvg
        .selectAll('legendText')
        .data(gcType)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
            return  40
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return  i*30+13
        })
        .style('fill', '#818181')
        .text(function (d) {
            return gcTypeDict[d].name
        })
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
}

const distance = (p1, p2) => {
        const dx = p1[0] - p2[0]
        const dy = p1[1] - p2[1]
        return Math.sqrt(dx * dx + dy * dy)
}
const getTextAnchorPosition = (markEnd: [number, number], radMid: number) => {
    //note: range of radMid: [0, 359*(Math.PI/180)]
    let anchor
    const anchorPos = [markEnd[0], markEnd[1]]
    // right upper, right lower
    if (radMid < Math.PI * (0.5 - 1 / 6) || radMid > Math.PI * (1.5 + 1 / 6)) {
        anchor = 'start'
        anchorPos[0] += 5 * Math.cos(radMid)
        anchorPos[1] += 5 * Math.sin(radMid)
    }
    // middle lower
    else if (radMid < Math.PI * (0.5 + 1 / 6)) {
        anchor = 'middle'
        anchorPos[0] += 10 * Math.cos(radMid)
        anchorPos[1] += 10 * Math.sin(radMid)
    }
    // middle upper
    else if (radMid > Math.PI * (1.5 - 1 / 6)) {
        anchor = 'middle'
        anchorPos[0] += 10 * Math.cos(radMid)
        anchorPos[1] += 10 * Math.sin(radMid)
    }
    // left upper, left lower
    else {
        anchor = 'end'
        anchorPos[0] += 5 * Math.cos(radMid)
        anchorPos[1] += 5 * Math.sin(radMid)
    }
    return [anchor, anchorPos]
}

const loadeddata = computed(() => {
    return phageStore.terminatorloaded && phageStore.phagedataloaded
})

const calculateGC = () => {
    const textList = _.drop(_.split(fastadata.value, '\n'))
    const fastastring = _.join(textList, '')
    fastaLength.value = fastastring.length
    
    let x = 0
    const contentArr = []
    const skewPlusArr = []
    const skewMinusArr = []
    let plusGroup = {
        start: undefined,
        mid: [],
        end: undefined,
    }
    let minusGroup = {
        start: undefined,
        mid: [],
        end: undefined,
    }
    let isPlus = false
    while (x + gcwindow.value < fastastring.length) {
        const contentValue = countGC(fastastring.slice(x, x + gcwindow.value))
        const endPoint = x+gcwindow.value-1
        //x+gcwindow-1 is endpoint of the window
        const middlePoint = (x+endPoint)/2
        if(isNaN(contentValue)){
            console.log(contentValue)
            console.log(x,x+gcwindow.value,fastastring.slice(x, x + gcwindow.value))
        }
        
        contentArr.push([middlePoint, contentValue])

        const skewValue = countGCSkew(fastastring.slice(x, x + gcwindow.value))
        if(isNaN(skewValue)){
            console.log(skewValue)
            console.log(x,x+gcwindow.value,fastastring.slice(x, x + gcwindow.value))
        }

        if(x==0){
            plusGroup.start = x
            minusGroup.start = x
            isPlus = skewValue>=0
        }
        if(skewValue>=0){
            
            if(!isPlus){
                minusGroup.end = x-1
                skewMinusArr.push(minusGroup)
                minusGroup = {
                    start: x,
                    mid: [[middlePoint,0]],
                    end: undefined,
                }

                plusGroup.end = x-1
                skewPlusArr.push(plusGroup)
                plusGroup = {
                    start: x,
                    mid: [[middlePoint, skewValue]],
                    end: undefined,
                }
                isPlus = true
            }else{
                minusGroup.mid.push([middlePoint, 0])
                plusGroup.mid.push([middlePoint, skewValue])
            }
        }else if(skewValue<0){
            if(isPlus){
                plusGroup.end = x-1
                skewPlusArr.push(plusGroup)
                plusGroup = {
                    start: x,
                    mid: [[middlePoint,0]],
                    end: undefined,
                }

                minusGroup.end = x-1
                skewMinusArr.push(minusGroup)
                minusGroup = {
                    start: x,
                    mid: [[middlePoint, skewValue]],
                    end: undefined,
                }
                isPlus = false
            }else{
                plusGroup.mid.push([middlePoint, 0])
                minusGroup.mid.push([middlePoint, skewValue])
            }
        }
        
        
        x += gcwindow.value
    }
    //the end point of last window
    plusGroup.end = x-1
    skewPlusArr.push(plusGroup)

    minusGroup.end = x-1
    skewMinusArr.push(minusGroup)
    
    gcContent.value = contentArr
    gcSkewPlus.value = skewPlusArr
    gcSkewMinus.value = skewMinusArr
    
}

watch(loadeddata, () => {
    if(!loadeddata.value){
        return 
    }
    calculateGC()
    const content = gcContent.value
    const plus = gcSkewPlus.value
    const minus = gcSkewMinus.value
    // if (typeof proteindata.value === 'undefined' 
    // || typeof terminators.value === 'undefined'
    // || typeof content==='undefined'
    // || typeof plus==='undefined'
    // || typeof minus==='undefined') {
    //     console.log('no data. waiting...')
    //     return
    // }
    drawLegend()
    drawConfidenceLegend()
    drawGCLegend()

    const protein = _.sortBy(proteindata.value, o => {
        return parseInt(o.Start_location)
    })

    const axisEnd = Math.max(fastaLength.value,
            Number(
                _.maxBy(protein, o => {
                    return Number(o.Stop_location)
                })?.Stop_location
            )
    )

    const terData = _.sortBy(terminators.value, o=>{
        return Number(o.Start)
    })

    const svgArea = d3.select('#Viz_ter').attr('transform', `translate(0, 0)`)

    const radScaler = d3
        .scaleLinear()
        .range([0, 359 * (Math.PI / 180)])
        .domain([0, axisEnd])

    // draw OUTER axis circle
    // const outer_axis_start = getPointPosition(0, null)
    // const outer_axis_end = getPointPosition(radScaler(axisEnd), null)
    const outer_axis_start = getPositionOuterC(0, 0)
    const outer_axis_end = getPositionOuterC(radScaler(axisEnd), 0)
    const outer_axis_path = `M ${outer_axis_start[0]}, ${outer_axis_start[1]}
     A ${outerCircleR.value}, ${outerCircleR.value} 0 1 1 ${outer_axis_end[0]}, ${outer_axis_end[1]} `

    svgArea
        .append('path')
        .attr('d', outer_axis_path)
        .attr('stroke', 'gray')
        .attr('stroke-width', `${circleStrokeWidth}`)
        .attr('fill', 'none')

    // draw MIDDLE axis circle
    const middle_axis_start = getPositionMiddleC(0, 0)
    const middle_axis_end = getPositionMiddleC(radScaler(axisEnd), 0)

    const middle_axis_path = `M ${middle_axis_start[0]}, ${middle_axis_start[1]}
     A ${middleCircleR.value}, ${middleCircleR.value} 0 1 1 ${middle_axis_end[0]}, ${middle_axis_end[1]} `

    svgArea
        .append('path')
        .attr('d', middle_axis_path)
        .attr('stroke', 'gray')
        .attr('stroke-width', `${circleStrokeWidth}`)
        .attr('fill', 'none')

    // draw INNER(tick) axis circle
    // const tick_axis_start = getPointPosition(0, null, 0 - radiusDiff.value)
    // const tick_axis_end = getPointPosition(radScaler(axisEnd), null, 0 - radiusDiff.value)
    const tick_axis_start = getPositionInnerC(0, 0)
    const tick_axis_end = getPositionInnerC(radScaler(axisEnd), 0)

    const tick_axis_path = `M ${tick_axis_start[0]}, ${tick_axis_start[1]} A ${innerCircleR.value}, ${innerCircleR.value} 0 1 1 ${tick_axis_end[0]}, ${tick_axis_end[1]} `
    svgArea
        .append('path')
        .attr('d', tick_axis_path)
        .attr('stroke', 'gray')
        .attr('fill', 'none')

    // draw ticks on axis
    // calculate gap between two ticks
    //  一大格里面有五个小格子，总共有八个大格子+最末端的几个小格子
    // 把长度分成40分(5*8), gap取整百/整千的数字

    let gap = Math.round(axisEnd / 40)
    const digitLen = gap.toString().length
    const zeroNum = digitLen - 1
    const division = 10 ** zeroNum
    gap = Math.round(gap / division) * division

    // build tick arr. 'tick' is the point used as tick.
    const tickArr = []
    let i = 0
    let tick = i * gap
    while (tick < axisEnd) {
        tickArr[tickArr.length] = tick
        i += 1
        tick = i * gap
    }
    // tickArr[tickArr.length]=axisEnd
    // draw ticks on axis
    for (let i = 0; i < tickArr.length; i++) {
        tick = tickArr[i]
        // if isBig == true, the tick should be big
        let isBig
        i % 5 == 0 ? (isBig = true) : (isBig = false)

        let offset
        isBig ? (offset = -23) : (offset = -13)

        const tick_start = getPositionInnerC(radScaler(tick), 0)
        const tick_end = getPositionInnerC(radScaler(tick), offset)

        svgArea
            .append('path')
            .attr('d', `M ${tick_start[0]},${tick_start[1]} L ${tick_end[0]}, ${tick_end[1]}`)
            .attr('stroke', 'gray')

        if (isBig) {
            // set the rotate angle for ticks
            let rotateAngle
            let offset_r // used to adjust position of text-anchor of tick text
            if (radScaler(tick) < Math.PI / 2) {
                // rotateAngle = Math.PI / 2 + radScaler(tick)
                rotateAngle = Math.PI / 2 + radScaler(tick) - Math.PI

                offset_r = -0.07 * innerCircleR.value
            } else if (radScaler(tick) < Math.PI) {
                rotateAngle = Math.PI * -1.5 + radScaler(tick) + Math.PI

                offset_r = -0.07 * innerCircleR.value
            } else if (radScaler(tick < Math.PI * 1.5)) {
                rotateAngle = radScaler(tick) - Math.PI * 1.5

                offset_r = -0.1 * innerCircleR.value
            } else {
                rotateAngle = radScaler(tick) - Math.PI * 1.5

                offset_r = -0.1 * innerCircleR.value
            }

            const textAnchor = [
                tick_end[0] + offset_r * Math.cos(radScaler(tick)),
                tick_end[1] + offset_r * Math.sin(radScaler(tick)),
            ]

            let tickStr = tick.toString()

            if (tickStr.length >= 7) {
                tickStr = `${tick / 10 ** 6} k`
            } else if (tickStr.length >= 4) {
                tickStr = `${tick / 10 ** 3} k`
            } else {
                tickStr = `${tickStr}`
            }


            svgArea
                .append('text')
                .attr('x', textAnchor[0])
                .attr('y', textAnchor[1])
                .attr('text-anchor', 'middle')
                .text(tickStr)
                .attr(
                    'transform',
                    `rotate(${(rotateAngle * 180) / Math.PI},${textAnchor[0]},${textAnchor[1]})`
                )
        }
    }

    const arrowG = svgArea.append('g')
    // const labelG = svgArea.append('g')
    // const terG = svgArea.append('g')
    

    const minDiffRad = 2 * (Math.PI / 180)

    // add one element in the end of array, to help draw the mark of the real last element
    // data[data.length] = data[0]

    _.map(protein, (d, i) => {
        const start_rad = radScaler(d.Start_location)
        const end_rad = radScaler(d.Stop_location)

        const start = getPositionMiddleC(start_rad, 0)
        const end = getPositionMiddleC(end_rad, 0)

        const start_outer = getPositionMiddleC(start_rad, arrowWidth.value / 2)
        const start_inner = getPositionMiddleC(start_rad, -arrowWidth.value / 2)

        const end_outer = getPositionMiddleC(end_rad, arrowWidth.value / 2)
        const end_inner = getPositionMiddleC(end_rad, -arrowWidth.value / 2)

        const len = d.Stop_location - d.Start_location

        let head
        let arrow_outer
        let arrow_inner
        let tail_outer
        let tail_inner
        let arrowRad

        if (end_rad - start_rad < minDiffRad) {
            arrowRad = radScaler(len)
        } else {
            arrowRad = minDiffRad
        }

        if (d.Strand == '-') {
            head = start

            arrow_outer = getPositionMiddleC(start_rad + arrowRad, arrowWidth.value / 2)
            arrow_inner = getPositionMiddleC(start_rad + arrowRad, -arrowWidth.value / 2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else if (d.Strand == '+') {
            head = end

            arrow_outer = getPositionMiddleC(end_rad - arrowRad, arrowWidth.value / 2)
            arrow_inner = getPositionMiddleC(end_rad - arrowRad, -arrowWidth.value / 2)

            tail_outer = start_outer
            tail_inner = start_inner
        }

        const outerArcR = middleCircleR.value + arrowWidth.value / 2
        const innerArcR = middleCircleR.value - arrowWidth.value / 2

        // path of arrow
        const arrowOuterLine = `M ${head[0]},${head[1]} L ${arrow_outer[0]} ,${arrow_outer[1]} `
        const outerArc = `A ${outerArcR}, ${outerArcR} 0 0 ${d.Strand == '+' ? 0 : 1} ${
            tail_outer[0]
        }, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${d.Strand == '+' ? 1 : 0} ${
            arrow_inner[0]
        }, ${arrow_inner[1]} `

        // draw arrow
        const thisArrow = arrowG
            .append('path')
            .attr('d', `${arrowOuterLine + outerArc + tailLine + innerArc}Z`)
            .attr('fill', ()=>{
                const classlist = d.Protein_function_classification?.split(';').slice(
                    0,
                    -1
                ) as string[]
                if (classlist.length === 1) {
                    if (classlist[0] in TypeDict) {
                        return TypeDict[classlist[0]].color
                    }
                    return TypeDict.mix.color
                }
                return TypeDict.mix.color
            })
            .attr('stroke', 'black')
            .attr('stroke-width', '0.5px')
    })

    //GC Section Start
    //GC-Content
    const gcContentDiv = svgArea.append('g')
    
    const mid_start = getPointPosition(0, gcContentMidR.value)
    const mid_end = getPointPosition(radScaler(fastaLength.value), gcContentMidR.value)
    const mid_axis_end = getPointPosition(radScaler(axisEnd), gcContentMidR.value)    

    // mid arc at 50%
    gcContentDiv
        .append('path')
        .attr(
            'd',
            `M ${mid_axis_end[0]} ${mid_axis_end[1]} 
            A ${gcContentMidR.value} ${gcContentMidR.value} 0 1 0 ${mid_start[0]} ${mid_start[1]}`
        )
        .attr('fill','none')
        .attr('stroke','gray')
    
    //draw curve line
    const contentPath = [`M ${mid_start[0]},${mid_start[1]}`]
    // const heightArr = []
    _.forEach(content, function (ele, i) {
        const point = ele[0]
        const height = ele[1] * gcContentArc.value

        const pos = getPointPosition(radScaler(point), gcContentBaseR.value + height)
        // heightArr.push(height)
        // if(height === heightArr[i-1]){
        //     console.log('Same Height, ',height, point)
        // }
        contentPath.push( `L ${pos[0]} ${pos[1]}`)
        
    })
    
    contentPath.push(`L ${mid_end[0]} ${mid_end[1]} 
    A ${gcContentMidR.value} ${gcContentMidR.value} 
    0 1 0 ${mid_start[0]} ${mid_start[1]}`)

    gcContentDiv
        .append('path')
        .attr('d', contentPath.join(' '))
        .attr('stroke', 'none')
        .attr('fill', gcTypeDict['content']['color']) 

    //Draw GC skew Plot
    const gcSkewDiv = svgArea.append('g')

    const skew_base_start = getPointPosition(0, gcSkewBaseR.value)
        
    svgArea.append('path')
    .attr('d', `M ${skew_base_start[0]} ${skew_base_start[1]}
    A ${gcSkewBaseR.value} ${gcSkewBaseR.value} 
    0 1 1 ${skew_base_start[0]} ${skew_base_start[1]}`)
    .attr('stroke', 'gray')
    .attr('stroke-width', `${1}`)
    .attr('fill', 'none')

    svgArea.append('circle')
    .attr('cx',cx.value)
    .attr('cy',cy.value)
    .attr('r', gcSkewBaseR.value)
    .attr('stroke', 'gray')
    .attr('stroke-width', `${1}`)
    .attr('fill', 'none')
    
    const skew_mid_start = getPointPosition(radScaler(0),gcSkewMidR.value)
    const skew_axis_end = getPointPosition(radScaler(axisEnd),gcSkewMidR.value)

    const skewPlusPath = [`M ${skew_mid_start[0]} ${skew_mid_start[1]}`]
    const skewMinusPath = [`M ${skew_mid_start[0]} ${skew_mid_start[1]}`]

    //draw curve line
    _.forEach(minus, function (ele) {
        const start = getPointPosition(radScaler(ele.start),gcSkewMidR.value)
        skewMinusPath.push(`L ${start[0]} ${start[1]}`)
        
        _.forEach(ele.mid, (m)=>{
            const height = m[1]*gcSkewArc.value/2
            const mid = getPointPosition(radScaler(m[0]),gcSkewMidR.value+height)
            skewMinusPath.push(`L ${mid[0]} ${mid[1]}`)
        })
        const end = getPointPosition(radScaler(ele.end),gcSkewMidR.value)
        skewMinusPath.push(`L ${end[0]} ${end[1]}`)
    })

    _.forEach(plus, function (ele) {
        const start = getPointPosition(radScaler(ele.start),gcSkewMidR.value)
        skewPlusPath.push(`L ${start[0]} ${start[1]}`)
        _.forEach(ele.mid, (pos)=>{
            const height = pos[1]*gcSkewArc.value/2
            const mid = getPointPosition(radScaler(pos[0]),gcSkewMidR.value+height)
            skewPlusPath.push(`L ${mid[0]} ${mid[1]}`)

        })
        const end = getPointPosition(radScaler(ele.end),gcSkewMidR.value)
        skewPlusPath.push(`L ${end[0]} ${end[1]}`)
    })
    
    skewMinusPath.push(`A ${gcSkewMidR.value} ${gcSkewMidR.value} 0 1 0 
    ${skew_mid_start[0]} ${skew_mid_start[1]}`)

    skewPlusPath.push(`A ${gcSkewMidR.value} ${gcSkewMidR.value} 0 1 0 
    ${skew_mid_start[0]} ${skew_mid_start[1]}`)

    gcSkewDiv
        .append('path')
        .attr('d', skewMinusPath.join(' '))
        .attr('stroke', 'none')
        .attr('fill', '#019992')
        // .attr('fill','none')

    gcSkewDiv
        .append('path')
        .attr('d', skewPlusPath.join(' '))
        .attr('stroke', 'none')
        .attr('fill', '#fb475e')
        // .attr('fill','none')

    svgArea.append('path')
    .attr('d', `M ${skew_mid_start[0]} ${skew_mid_start[1]}
    A ${gcSkewMidR.value} ${gcSkewMidR.value} 
    0 1 1 ${skew_axis_end[0]} ${skew_axis_end[1]}`)
    .attr('stroke', 'gray')
    .attr('stroke-width', `${1}`)
    .attr('fill', 'none')
    //GC section end

    //For Tooltip: shared code, put it outside the loop
    const toolTextPositions = []
    const total = 6
    const posGap = 25
    for (let i = 0; i < total; i++) {
        toolTextPositions.push((i + 1) * posGap)
    }
    
    //draw terminator mark and tooltip
    _.map(terData, (d, i) => {
        const start_rad = radScaler(Number(Number(d.Start)))
        const end_rad = radScaler(Number(Number(d.Stop)))
        const mid_rad = (start_rad + end_rad) / 2

        const rectHeight = 20
        const color = getColor(Number(d.Confidence))

        const start_bottom = getPositionOuterC(start_rad, -circleStrokeWidth / 2)
        const end_bottom = getPositionOuterC(end_rad, -circleStrokeWidth / 2)

        const topRect_to_OuterC = -circleStrokeWidth / 2 + rectHeight
        const start_top = getPositionOuterC(start_rad, topRect_to_OuterC)
        const end_top = getPositionOuterC(end_rad, topRect_to_OuterC)

        let markPath =
            `M ${start_top[0]} ${start_top[1]} ` +
            `L ${start_bottom[0]} ${start_bottom[1]} ` +
            `L ${end_bottom[0]} ${end_bottom[1]} ` +
            `L ${end_top[0]} ${end_top[1]} `
        

        // METHOD1: radiu is not fixed
        // const arrowRad = 60 * (Math.PI/180)

        // const center_to_rect = (rect_width/2) / Math.tan(arrowRad/2)
        // const radius = (rect_width/2) / Math.sin(arrowRad/2)
        // const center = getPositionOuterC(mid_rad, topRect_to_OuterC + center_to_rect)

        const radius = 12
        const rect_width = distance(start_top, end_top)
        const half_rect_width = rect_width / 2
        
        
        if (half_rect_width>radius){
            markPath += `Z`
        }else{
            markPath += `A ${radius} ${radius} 0 1 0 ${start_top[0]} ${start_top[1]} Z`
        }
        const mark = svgArea
            .append('path')
            .attr('d', markPath)
            .attr('fill', color)
            .attr('stroke', 'none')
            .attr('class', `mark_${i} mark`)

        // const center_to_rect = Math.sqrt(radius * radius - half_rect_width * half_rect_width)
        //     const center = getPositionOuterC(mid_rad, topRect_to_OuterC + center_to_rect)
        //     console.log(half_rect_width, half_rect_width/center_to_rect,Math.atan(half_rect_width/center_to_rect)*180/Math.PI)
        //     const thisCir = svgArea
        //         .append('circle')
        //         .attr('cx', center[0])
        //         .attr('cy', center[1])
        //         .attr('r', radius)
        //         .attr('fill', color)
        //         .attr('class', `mark_${i} mark`)

        const areaW = 160
        const areaH = 160
        const toolArea = svgArea
            .append('svg')
            .attr('width', areaW)
            .attr('height', areaH)
            .style('opacity', 0)
        toolArea
            .append('rect')
            .attr('x', 0)
            .attr('width', areaW)
            .attr('height', areaH)
            .style('fill', 'black')
            .style('opacity', 0.6)

        const mouseenter_ter = function () {
            svgArea.selectAll('.mark').style('opacity', '0.2')
            // // select both circle and rect
            // const className = d3.select(this).attr('class').split(' ')[0]
            d3.select(this).style('opacity', '1')
            const radMid = radScaler((Number(Number(d.Start)) + Number(Number(d.Stop))) / 2)
            const atAxis = getPositionOuterC(radMid, 0)
            let position
            if(radMid<=Math.PI/2){
                //put right bottom corner at the axis
                position = [atAxis[0]-areaW, atAxis[1]-areaH]
            }
            else if(radMid<=Math.PI){
                //put left bottom corner at the axis
                position = [atAxis[0], atAxis[1]-areaH]
            }
            else if (radMid <= Math.PI * 1.5){
                //left upper
                position = atAxis
            }
            else{
                //right upper
                position = [atAxis[0]-areaW, atAxis[1]]
            }
            toolArea
                .style('opacity', '1')
                .attr('x', position[0])
                .attr('y', position[1])

            const textContent = [
                `Terminator ID: ${d.Terminator_Id}`,
                `Start Point: ${Number(d.Start)}`,
                `End Point: ${Number(d.Stop)}`,
                `Strand: ${d.Sense}`,
                `Loc: ${d.Loc}`,
                `Confidence: ${d.Confidence}`,
            ]
            toolArea
                .selectAll('text')
                .data(toolTextPositions)
                .join('text')
                .style('fill', 'white')
                .attr('transform', e => `translate(10,${e})`)
                .text((e, i) => {
                    return textContent[i]
                })
                .style('font-size', 12)
        }
        const mouseleave_ter = function () {
            svgArea.selectAll('circle').style('opacity', '1')
            svgArea.selectAll('path').style('opacity', '1')
            toolArea.style('opacity', 0).attr('x', 0).attr('y', 0)
            // toolArea.selectAll('text').style('opacity',0)
        }
            
        mark.on('mouseenter ', mouseenter_ter).on('mouseleave', mouseleave_ter)
    })

    //obtain grouped terminators to draw label
    const group = {
        Start: undefined,    
        Stop: undefined,
        Id: []
    }
    let index = 0
    const groupeTer  = _.reduce(terData, (acc)=>{
        const d = terData[index]
        const Id = Number(d.Terminator_Id.split('_')[1])
        
        if (index === 0){
            group.Start = Number(d.Start)
            group.Stop = Number(d.Stop)
            group.Id.push(Id)
        }else{
            if(Number(d.Start) < group.Start){
                console.log('ERROR!')
            }//TEMP
            //Number(d.Start) <= group.Stop || 
            //(radScaler(Number(d.Start) - group.Stop) < 0.003 && Number(d.Start) > group.Stop)
            //
            if(Number(d.Start) <= group.Stop ){
                group.End = Math.max(group.Stop, Number(d.Stop))
                group.Id.push(Id)
            }else{
                const groupCopy = {
                    Start: group.Start,
                    Stop: group.Stop,
                    Id: group.Id.map(e=>e)
                }
                acc.push(groupCopy)
                group.Start = Number(d.Start)
                group.Stop = Number(d.Stop)
                group.Id = [Id]
            }
        }
        index = index+1
        return acc
    }, [])
    groupeTer.push({
                    Start: group.Start,
                    Stop: group.Stop,
                    Id: group.Id.map(e=>e)
                })
    console.log(groupeTer)
    const offset = 45
    const length = 15
    svgArea.selectAll('.label')
    .data(groupeTer)
    .enter()
    .append('path')
    .attr('d', g=>{
        const gStart = Number(g.Start)
        const gStop = Number(g.Stop)
        const midRad = radScaler((gStart+gStop)/2)
        const start = getPositionOuterC(midRad, offset)
        const end = getPositionOuterC(midRad, offset + length)
        const line = `M ${start[0]}, ${start[1]} L ${end[0]},${end[1]}`
        return line
    })
    .attr('stroke', 'gray')

    svgArea.selectAll('.label-text')
    .data(groupeTer)
    .enter()
    .append('text')
    .attr('x', g=>{
        const gStart = Number(g.Start)
        const gStop = Number(g.Stop)
        const midRad = radScaler((gStart+gStop)/2)
        return getTextAnchorPosition(getPositionOuterC(midRad, offset + length), midRad)[1][0]
    })
    .attr('y', g=>{
        const gStart = Number(g.Start)
        const gStop = Number(g.Stop)
        const midRad = radScaler((gStart+gStop)/2)
        return getTextAnchorPosition(getPositionOuterC(midRad, offset + length), midRad)[1][1]
    })
    .text(g =>{
        return g.Id.join(',')
    })
    .attr('font-size', 11)
    .attr('text-anchor', g=>{
        const gStart = Number(g.Start)
        const gStop = Number(g.Stop)
        const midRad = radScaler((gStart+gStop)/2)
        return getTextAnchorPosition(getPositionOuterC(midRad, offset + length), midRad)[0]
    })
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'gray')

    loadchart.value = false
})

function downloadsvg() {
    const svgElement = document.getElementById('Viz_ter') as HTMLElement
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
    const svgElement = document.getElementById('Viz_ter') as HTMLElement
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
            link.download = 'terminator_circo.png'
            link.click()

            URL.revokeObjectURL(url)
        }
    }, 'image/png')
}
</script>
