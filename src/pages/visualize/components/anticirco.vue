<template>
    <div class="h-220">
        <div class="w-290 h-20 bg-gray-200 flex flex-row items-center justify-center">
            <el-button class="" type="primary" @click="downloadsvg">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download SVG Chart
            </el-button>
            <el-button class="ml-3" type="primary" @click="downloadSVGAsPNG">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download PNG Chart
            </el-button>
        </div>
        <el-scrollbar class="h-200" v-loading="loadchart">
            <svg id="Viz_anti" :height="height" :width="width"></svg>
        </el-scrollbar>
        <!-- <div class="w-310 h-30 bg-gray-200 flex justify-center">
            <svg id="Legend_trna" height="120" width="1140"></svg>
        </div> -->
    </div>
</template>
<!-- Function for radial charts -->
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import _ from 'lodash'
import { TypeDict, proteinType, gcTypeDict, gcType, countGC, countGCSkew, shallowGray } from '@/utils/annotation'
import { Document, Operation } from '@element-plus/icons-vue'
import { usePhageStore } from '@/store/phage'
const phageStore = usePhageStore()

const loadchart = ref(true)
const width = ref(1160)
const height = ref(800)
const leftMargin = ref(0)
const innerCircleR = ref(180) //if allowing users dynmically change this value, tick's postion should be changed
const middleCircleR = ref(360)
const outerCircleR = ref(400)
const circleStrokeWidth = 3
const cx = computed(() => leftMargin.value + width.value / 2)
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

const fastadata = computed(() => {
    return phageStore.phagefastadata
})

const antidata = computed(() => {
    return phageStore.phageanti
})
const proteindata = computed(() => {
    return phageStore.phageprotein
})

const getPointPosition=(rad, radius)=>{
    return [ cx.value + radius * Math.cos(rad),
            cy.value + radius * Math.sin(rad),
        ]
}

const getPositionMiddleC = (rad, offset)=>{
    return getPointPosition(rad,middleCircleR.value+offset)
}

const getPositionInnerC = (rad, offset)=>{
    return getPointPosition(rad,innerCircleR.value+offset)
}



const outerTypeDict = {
    anti: {
        name: 'Anti-CRISPR Protein',
        color: '#f94eba',
    }
}

const legendType = [...proteinType]
const drawLegend = () => {
    const legendSvg = d3.select('#Viz_anti')
                        .append('svg')
                        .attr('x',0)
                        .attr('y',height.value-180)
    
    // lengendSvg
    legendSvg
        .selectAll('legend')
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

const drawOuterLegend = () => {
    const legendSvg = d3.select('#Viz_anti')
                        .append('svg')
                        .attr('x',width.value-220)
                        .attr('y',height.value-100)

    
    // lengendSvg
    legendSvg
        .selectAll('.legend')
        .data(Object.keys(outerTypeDict))
        .enter()
        .append('rect')
        .attr('class', 'legend')
        .attr('x', function (d, i) {
            return 0
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return i * 60
        })
        .attr('width', 40)
        .attr('height', 40)
        .style('fill', function (d) {
            return outerTypeDict[d].color
        })
    legendSvg
        .selectAll('legendText')
        .data(Object.keys(outerTypeDict))
        .enter()
        .append('text')
        .attr('x', function (d, i) {
            return  50
        })
        .attr('y', function (d, i) {
            // eslint-disable-next-line no-bitwise
            return  i*60+ 22
        })
        .style('fill', '#818181')
        .text(function (d) {
            return outerTypeDict[d].name
        })
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
}

const drawGCLegend = () => {
    const legendSvg = d3.select('#Viz_anti')
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
const loadeddata = computed(() => {
    return phageStore.antiloaded && phageStore.phagedataloaded
})

const calculateGC = () => {
    // if(typeof fastadata.value==='undefined'){
    //     console.log("no data. waiting...")
    //     return
    // }
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
    const anti = antidata.value
    const content = gcContent.value
    const plus = gcSkewPlus.value
    const minus = gcSkewMinus.value
    // if(typeof anti==='undefined' 
    // || typeof proteindata.value==='undefined'
    // || typeof content==='undefined'
    // || typeof plus==='undefined'
    // || typeof minus==='undefined'){
    //     console.log("no data. waiting...")
    //     return
    // }
    
    drawOuterLegend()
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

    const svgArea = d3.select('#Viz_anti')

    const radScaler = d3
        .scaleLinear()
        .range([0, 359 * (Math.PI / 180)])
        .domain([0, axisEnd])


    //draw MIDDLE axis circle
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
    
    //draw INNER(tick) axis circle
    const tick_axis_start = getPositionInnerC(0,0)
    const tick_axis_end = getPositionInnerC(radScaler(axisEnd),0)

    const tick_axis_path = `M ${tick_axis_start[0]}, ${tick_axis_start[1]} A ${innerCircleR.value}, ${innerCircleR.value} 0 1 1 ${tick_axis_end[0]}, ${tick_axis_end[1]} `
    svgArea
        .append('path')
        .attr('d', tick_axis_path)
        .attr('stroke', 'gray')
        .attr('fill', 'none')

    //draw ticks on axis
    // calculate gap between two ticks
    //  一大格里面有五个小格子，总共有八个大格子+最末端的几个小格子
    // 把长度分成40分(5*8), gap取整百/整千的数字

    let gap = Math.round(axisEnd / 40)
    const digitLen = gap.toString().length
    const zeroNum = digitLen - 1
    const division = 10 ** zeroNum
    gap = Math.round(gap / division) * division

    //build tick arr. 'tick' is the point used as tick.
    const tickArr = []
    let i = 0
    let tick = i * gap
    while (tick < axisEnd) {
        tickArr[tickArr.length] = tick
        i += 1
        tick = i * gap
    }
    // tickArr[tickArr.length]=axisEnd
    //draw ticks on axis
    for (let i = 0; i < tickArr.length; i++) {
        tick = tickArr[i]
        //if isBig == true, the tick should be big
        let isBig
        i % 5 == 0 ? (isBig = true) : (isBig = false)

        // const offset = -23
        let offset
        isBig ? (offset = -23) : (offset = -13)

        const tick_start = getPositionInnerC(radScaler(tick), 0)
        const tick_end = getPositionInnerC(radScaler(tick), offset)

        svgArea
            .append('path')
            .attr('d', `M ${tick_start[0]},${tick_start[1]} L ${tick_end[0]}, ${tick_end[1]}`)
            .attr('stroke', 'gray')

        if (isBig) {
            //set the rotate angle for ticks
            let rotateAngle
            let offset_r //used to adjust position of text-anchor of tick text
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
                tickStr = `${tick / (10**6)} k`
            } else if (tickStr.length >= 4) {
                tickStr = `${tick / (10**3)} k`
            }else{
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

    const minDiffRad = 2 * (Math.PI / 180)
    
    const getArrowPath = (startRad, endRad, radius, direction) => {
        const start = getPointPosition(startRad, radius)
        const end = getPointPosition(endRad, radius)

        const start_outer = getPointPosition(startRad, radius+arrowWidth.value / 2)
        const start_inner = getPointPosition(startRad, radius-arrowWidth.value / 2)

        const end_outer = getPointPosition(endRad, radius+arrowWidth.value / 2)
        const end_inner = getPointPosition(endRad, radius-arrowWidth.value / 2)

        let head
        let arrow_outer
        let arrow_inner
        let tail_outer
        let tail_inner
        let arrowRad

        if (endRad - startRad < minDiffRad) {
            arrowRad = endRad - startRad
        }else{
            arrowRad=minDiffRad
        }

        if (direction===false) {
            head = start

            arrow_outer = getPointPosition(startRad+arrowRad, radius+arrowWidth.value/2)
            arrow_inner = getPointPosition(startRad+arrowRad, radius-arrowWidth.value/2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else{
            head = end

            arrow_outer = getPointPosition(endRad-arrowRad, radius+arrowWidth.value/2)
            arrow_inner = getPointPosition(endRad-arrowRad, radius-arrowWidth.value/2)

            tail_outer = start_outer
            tail_inner = start_inner
        }

        const outerArcR = radius + arrowWidth.value / 2
        const innerArcR = radius - arrowWidth.value / 2

        //path of arrow
        const arrowOuterLine = `M ${head[0]},${head[1]} L ${arrow_outer[0]} ,${arrow_outer[1]} `
        const outerArc = `A ${outerArcR}, ${outerArcR} 0 0 ${
            direction ? 0 : 1
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${
            direction ? 1 : 0
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        return `${arrowOuterLine + outerArc + tailLine + innerArc}Z`
    }

    //Common setting for tooltip
    const toolAreaW = 250
    const toolAreaH = 150

    const toolTextPositions = []
    const total = 7
    const posGap = 20
    for (let i = 0; i < total; i++) {
        toolTextPositions.push( (i+1) * posGap )
    }

    _.map(protein, (d) => {

        const start_rad = radScaler(d.Start_location)
        const end_rad = radScaler(d.Stop_location)

        let direction
        if (d.Strand == '-') {
            direction=false
        } else{
            direction= true
        }

        const relatedAnti = _.find(anti,(item)=>d.Protein_id === item.Protein_id)
        const isAnti = ((typeof relatedAnti) !== 'undefined')

        //draw arrow
        const thisArrow = svgArea
            .append('path')
            .attr('d', getArrowPath(start_rad, end_rad, middleCircleR.value,direction))
            .attr('fill', isAnti ? outerTypeDict['anti']['color']: shallowGray)
            .attr('stroke', 'black')
            .attr('stroke-width', '0.5px')
            .attr('class', isAnti ? 'mark-anti':'')

        if(isAnti){
            
            const toolArea = svgArea.append('svg')
                        .attr('width', toolAreaW)
                        .attr('height', toolAreaH)
                        .style('opacity', 0)
            toolArea
                .append('rect')
                .attr('x', 0)
                .attr('width', toolAreaW)
                .attr('height', toolAreaH)
                .style('fill', 'black')
                .style('opacity', 0.6)

            const mouseenter = function () {
                svgArea.selectAll('.mark-anti').style('opacity', '0.3')
                d3.select(this).style('opacity', '1')
                
                const radMid = radScaler((Number(d.Start_location) + Number(d.Stop_location)) / 2)
                const atAxis = getPositionMiddleC(radMid, 0)
                let position
                if(radMid<=Math.PI/2){
                    //put right bottom corner at the axis
                    position = [atAxis[0]-toolAreaW, atAxis[1]-toolAreaH]
                }
                else if(radMid<=Math.PI){
                    //put left bottom corner at the axis
                    position = [atAxis[0], atAxis[1]-toolAreaH]
                }
                else if (radMid <= Math.PI * 1.5){
                    //left upper
                    position = atAxis
                }
                else{
                    //right upper
                    position = [atAxis[0]-toolAreaW, atAxis[1]]
                }
                
                toolArea
                    .style('opacity', '1')
                    .attr('x', position[0])
                    .attr('y', position[1])

                const textContent=[`Protein ID: ${relatedAnti.id}`,
                                    `Source: ${relatedAnti.Source}`,
                                    `Function classification: ${d.Protein_function_classification.slice(0,-1)}`,
                                    `Protein Product: ${d.Protein_product}`,
                                    `Start Point: ${d.Start_location}`,
                                    `End Point: ${d.Stop_location}`,
                                    `Strand: ${d.Strand}`,                                      
                                ]
                // console.log(textContent)
                toolArea.selectAll('text')
                        .data(toolTextPositions)
                        .join('text')
                        .style('fill', 'white')
                        .attr('transform', d => `translate(10,${d})`)
                        .text((d, i) => {
                            return textContent[i]
                        })
                        .style('font-size', 12)
            }
            const mouseleave = function() {
                svgArea.selectAll('.mark-anti').style('opacity', '1')
                toolArea
                    .style('opacity', 0).attr('x', 0).attr('y', 0)
                // toolArea.selectAll('text').style('opacity',0)
            }
            thisArrow.on('mouseenter ', mouseenter).on('mouseleave', mouseleave)
        }

    })

    loadchart.value = false
})

function downloadsvg() {
    const svgElement = document.getElementById('Viz_anti') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'anticrispr_circo.svg'
    link.click()
    URL.revokeObjectURL(url)
}
const downloadSVGAsPNG = async () => {
    const svgElement = document.getElementById('Viz_anti') as HTMLElement
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
            link.download = 'anticrispr_circo.png'
            link.click()

            URL.revokeObjectURL(url)
        }
    }, 'image/png')
}
</script>
