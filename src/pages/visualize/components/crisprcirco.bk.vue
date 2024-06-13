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
            <svg id="Viz_crispr" :height="height" :width="width"></svg>
        </el-scrollbar>
    </div>
</template>
<!-- Function for radial charts -->
<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import _ from 'lodash'
import { TypeDict, proteinType, gcTypeDict, gcType, countGC, countGCSkew } from '@/utils/annotation'
import { Document, Operation } from '@element-plus/icons-vue'
import { usePhageStore } from '@/store/phage'
const phageStore = usePhageStore()

const loadchart = ref(true)
const width = ref(1240)
const height = ref(880)
const leftMargin = ref(0)
const innerCircleR = ref(180) //if allowing users dynmically change this value, tick's postion should be changed
const middleCircleR = ref(360)
const outerCircleR = ref(390)
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

const crisprdata = computed(() => {
    return phageStore.phagecrispr
})
const proteindata = computed(() => {
    return phageStore.phageprotein
})

const getPointPosition=(rad, radius)=>{
    return [ cx.value + radius * Math.cos(rad),
            cy.value + radius * Math.sin(rad),
        ]
}

const getPositionOuterC = (rad, offset)=>{
    return getPointPosition(rad,outerCircleR.value+offset)
}

const getPositionMiddleC = (rad, offset)=>{
    return getPointPosition(rad,middleCircleR.value+offset)
}

const getPositionInnerC = (rad, offset)=>{
    return getPointPosition(rad,innerCircleR.value+offset)
}

const lowerBound = 1
const upperBound = 4
const lowerBoundColor = '#00ff00'
const upperBoundColor = '#002600'
const colorScaler = d3
    .scaleLinear()
    .range([lowerBoundColor, upperBoundColor])
    .domain([lowerBound, upperBound])

const levelArr = []
for (let index = lowerBound; index < upperBound+1; index++) {
    levelArr.push(index)
}

const drawEvidenceLegend = ()=>{
    const vizArea = d3.select('#Viz_crispr')
    const evidenceLegend = vizArea.append('svg')
                                    .attr('x',  width.value-120)
                                    .attr('y', height.value-190)
                                    .attr('width', 140)
                                    .attr('height', 190)
    const mt = 25
    const mr = 20
    const rectH = 40
    const rectW = 45
    evidenceLegend.selectAll('rect')
                        .data(levelArr)
                        .enter()
                        .append('rect')
                        .attr('x', mr)
                        .attr('y', (d,i) => mt+i*rectH)
                        .attr('width', rectW)
                        .attr('height', rectH)
                        .style('fill', (d) => colorScaler(d))  

    evidenceLegend.selectAll('text')
                    .data(levelArr)
                    .enter()
                    .append('text')
                    .attr('x', mr+rectW+10)
                    .attr('y', (d,i) => mt+rectH/2+i*rectH)
                    .text((d) => d)
                    .attr('font-size', '15px')
                    .style('fill', '#818181')
                    .style('text-anchor', 'start')
                    .attr('alignment-baseline', 'middle')

    evidenceLegend.append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .text('Evidence Level')
                    .attr('font-size', '14px')
                    .style('fill', '#818181')
                    .style('text-anchor', 'start')
                    .style('alignment-baseline', 'hanging')

}

const drawLegend = () => {
    const legendSvg = d3.select('#Viz_crispr')
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
    const legendSvg = d3.select('#Viz_crispr')
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
    return phageStore.crisprloaded && phageStore.phagedataloaded
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
    const crispr = crisprdata.value
    const content = gcContent.value
    const plus = gcSkewPlus.value
    const minus = gcSkewMinus.value
    // if(typeof crispr==='undefined' 
    // || typeof proteindata.value==='undefined'
    // || typeof content==='undefined'
    // || typeof plus==='undefined'
    // || typeof minus==='undefined'){
    //     console.log("no data. waiting...")
    //     return
    // }
    
    drawLegend()
    drawEvidenceLegend()
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

    const svgArea = d3.select('#Viz_crispr')

    const radScaler = d3
        .scaleLinear()
        .range([0, 359 * (Math.PI / 180)])
        .domain([0, axisEnd])

    //draw OUTER axis circle
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

    const protein_arrowG=svgArea.append('g')
    const minDiffRad = 2 * (Math.PI / 180)

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
        }else{
            arrowRad=minDiffRad
        }

        if (d.Strand === '-') {
            head = start

            arrow_outer = getPositionMiddleC(start_rad+arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionMiddleC(start_rad+arrowRad, -arrowWidth.value/2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else if (d.Strand === '+') {
            head = end

            arrow_outer = getPositionMiddleC(end_rad-arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionMiddleC(end_rad-arrowRad, -arrowWidth.value/2)

            tail_outer = start_outer
            tail_inner = start_inner
        }

        const outerArcR = middleCircleR.value + arrowWidth.value / 2
        const innerArcR = middleCircleR.value - arrowWidth.value / 2

        //path of arrow
        const arrowOuterLine = `M ${head[0]},${head[1]} L ${arrow_outer[0]} ,${arrow_outer[1]} `
        const outerArc = `A ${outerArcR}, ${outerArcR} 0 0 ${
            d.Strand == '+' ? 0 : 1
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${
            d.Strand == '+' ? 1 : 0
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        //draw arrow
        const thisArrow = protein_arrowG
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
    
    //Draw GC-Conent
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

    _.map(crispr, (d, i) => {
        const start_rad = radScaler(d.CRISPR_Start)
        const end_rad = radScaler(d.CRISPR_End)

        const start = getPositionOuterC(start_rad, 0)
        const end = getPositionOuterC(end_rad, 0)

        const start_outer = getPositionOuterC(start_rad, arrowWidth.value / 2)
        const start_inner = getPositionOuterC(start_rad, -arrowWidth.value / 2)

        const end_outer = getPositionOuterC(end_rad, arrowWidth.value / 2)
        const end_inner = getPositionOuterC(end_rad, -arrowWidth.value / 2)

        //if direction is true, the positive direction defined here, i.e. the clockwise direction
        let direction
        if (d.Potential_Orientation_AT === 'Reverse') {
            direction = false
        } else if (d.Potential_Orientation_AT === 'Forward') {
            direction = true
        } else if (d.Potential_Orientation_AT === 'Unknown') {
            direction = true
        }
        

        let head
        let arrow_outer
        let arrow_inner
        let tail_outer
        let tail_inner
        let arrowRad

        //length of protein is short
        if (end_rad - start_rad < minDiffRad) {
            arrowRad = end_rad-start_rad
        }else{
            arrowRad = minDiffRad
        }

        if (direction===false) {
            head = start

            arrow_outer = getPositionOuterC(start_rad+arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionOuterC(start_rad+arrowRad, -arrowWidth.value/2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else {
            head = end

            arrow_outer = getPositionOuterC(end_rad-arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionOuterC(end_rad-arrowRad, -arrowWidth.value/2)

            tail_outer = start_outer
            tail_inner = start_inner
        }

        //path of arrow
        const outerArcR = outerCircleR.value + arrowWidth.value / 2
        const innerArcR = outerCircleR.value - arrowWidth.value / 2
        
        const arrowOuterLine = `M ${head[0]},${head[1]} L ${arrow_outer[0]} ,${arrow_outer[1]} `
        const outerArc = `A ${outerArcR}, ${outerArcR} 0 0 ${
            direction ? 0 : 1
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${
            direction ? 1 : 0
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        const pathsp = `${arrowOuterLine + outerArc + tailLine + innerArc}Z`
        //get color
        const color = colorScaler(d.Evidence_Level)
        
        // // draw arrow
        const thisArrow = svgArea
            .append('path')
            .attr('d', pathsp)
            .attr('fill', color)
            .attr('class','mark-crispr')
            // .attr('stroke', 'black')
            // .attr('stroke-width', '0.5px')
        
        //Section: draw tooltip
        const areaW = 300
        const areaH = 220
        const toolArea = svgArea.append('svg')
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
        
        const toolTextPositions = []
        const total = 10
        const posGap = 23
        for (let i = 0; i < total; i++) {
            toolTextPositions.push( (i+1) * posGap )
        }

        const mouseenter = function () {
            svgArea.selectAll('.mark-crispr').style('opacity', '0.3')
            d3.select(this).style('opacity', '1')
            
            const radMid = radScaler((Number(d.CRISPR_Start) + Number(d.CRISPR_End)) / 2)
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

            const textContent=[`Crispr ID: ${d.CRISPR_Id}`,
                                `Duplicated Spacers: ${d.Duplicated_Spacers}`,
                                `Start Point: ${d.CRISPR_Start}`,
                                `End Point: ${d.CRISPR_End}`,
                                `Crispr Length: ${d.CRISPR_Length}`,
                                `Potentail Orientation at: ${d.Potential_Orientation_AT}`,
                                `Repeat Length: ${d.Repeat_Length}`,
                                `Spacers Nb: ${d.Spacers_Nb}`,
                                `Mean-size Spacers: ${d.Mean_size_Spacers}`,
                                `Evidence Level: ${d.Evidence_Level}`,
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
            svgArea.selectAll('.mark-crispr').style('opacity', '1')
            toolArea
                .style('opacity', 0).attr('x', 0).attr('y', 0)
            // toolArea.selectAll('text').style('opacity',0)
        }
        thisArrow.on('mouseenter ', mouseenter).on('mouseleave', mouseleave)
    })

    loadchart.value = false
})

function downloadsvg() {
    const svgElement = document.getElementById('Viz_crispr') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'crispr_circo.svg'
    link.click()
    URL.revokeObjectURL(url)
}
const downloadSVGAsPNG = async () => {
    const svgElement = document.getElementById('Viz_crispr') as HTMLElement
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
            link.download = 'crispr_circo.png'
            link.click()

            URL.revokeObjectURL(url)
        }
    }, 'image/png')
}
</script>
