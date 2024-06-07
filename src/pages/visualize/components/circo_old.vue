<template>
    <div class="h-250">
        <div class="w-350 h-20 bg-gray-200 flex flex-row items-center justify-center">
            <el-button class="" type="primary" @click="downloadsvg">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download SVG Chart
            </el-button>
            <el-button class="ml-3" type="primary" @click="downloadSVGAsPNG">
                <el-icon class="text-base mr-1 mb-0.5"><Document /></el-icon>
                Download PNG Chart
            </el-button>
        </div>
        <el-scrollbar class="h-230" v-loading="loadchart">
            <svg id="Viz_area" :height="height" :width="width"></svg>
        </el-scrollbar>
        <!-- <div class="w-330 h-30 bg-gray-200 flex justify-center">
            <svg id="Legend_area_circo" height="120" width="1140"></svg>
        </div> -->
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
const width = ref(1400)
const height = ref(920)
const leftMargin = 0
const innerCircleR = ref(180) //if allowing users dynmically change this value, tick's postion should be changed
const outerCircleR = ref(360)
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


const fastadata = computed(() => {
    return phageStore.phagefastadata
})
const proteindata = computed(() => {
    return phageStore.phageprotein
})

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
        // anchorPos[1]+=10
        anchorPos[0] += 15 * Math.cos(radMid)
        anchorPos[1] += 15 * Math.sin(radMid)
    }
    // middle upper
    else if (radMid > Math.PI * (1.5 - 1 / 6)) {
        anchor = 'middle'
        anchorPos[0] += 5 * Math.cos(radMid)
        anchorPos[1] += 5 * Math.sin(radMid)
    }
    // left upper, left lower
    else {
        anchor = 'end'
        anchorPos[0] += 5 * Math.cos(radMid)
        anchorPos[1] += 5 * Math.sin(radMid)
    }
    return [anchor, anchorPos]
}
// function getPointPosition(rad, inner, offset) {
//         if (offset != null) {
//             const x = cx.value + (outerCircleR.value + offset) * Math.cos(rad)
//             const y = cy.value + (outerCircleR.value + offset) * Math.sin(rad)
//             return [x, y]
//         }
//         if (inner == true) {
//             const x = cx.value + (outerCircleR.value - arrowWidth.value / 2) * Math.cos(rad)
//             const y = cy.value + (outerCircleR.value - arrowWidth.value / 2) * Math.sin(rad)
//             return [x, y]
//         }
//         if (inner == false) {
//             const x = cx.value + (outerCircleR.value + arrowWidth.value / 2) * Math.cos(rad)
//             const y = cy.value + (outerCircleR.value + arrowWidth.value / 2) * Math.sin(rad)
//             return [x, y]
//         }
//         if (inner == null && offset == null) {
//             const x = cx.value + outerCircleR.value * Math.cos(rad)
//             const y = cy.value + outerCircleR.value * Math.sin(rad)
//             return [x, y]
//         }
//     }
const getPointPosition=(rad, radius)=>{
    return [ cx.value + radius * Math.cos(rad),
            cy.value + radius * Math.sin(rad),
        ]
}

const getPositionOuterC = (rad, offset)=>{
    return getPointPosition(rad,outerCircleR.value+offset)
}

const getPositionInnerC = (rad, offset)=>{
    return getPointPosition(rad,innerCircleR.value+offset)
}

watch(fastadata, () => {
    if(typeof fastadata.value==='undefined'){
        console.log("no data. waiting...")
        return
    }
    const textList = _.drop(_.split(fastadata.value, '\n'))
    const fastastring = _.join(textList, '')
    fastaLength.value = fastastring.length
    // gcwindow.value = Math.ceil(gcWindow * 0.01)
    
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
    let isPlus = false //gc skew window belongs to gc skew plus or minus
    while (x + gcwindow.value < fastastring.length) {
        const contentValue = countGC(fastastring.slice(x, x + gcwindow.value))
        const endPoint = x+gcwindow.value-1
        const middlePoint = (x+endPoint)/2

        contentArr.push([middlePoint, contentValue])

        const skewValue = countGCSkew(fastastring.slice(x, x + gcwindow.value))

        if(x==0){
            plusGroup.start = x
            minusGroup.start = x
            isPlus = skewValue>=0
        }
        if(skewValue>=0){
            
            if(!isPlus){
                //Minus => Plus
                //上一个gc window的skew value为负，而这个gc window的skew value为正
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
                //Plus => Plus
                minusGroup.mid.push([middlePoint, 0])
                plusGroup.mid.push([middlePoint, skewValue])
            }
        }else if(skewValue<0){
            if(isPlus){
                //Plus => Minus
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
                //Minus => Minus
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
    
})


const drawLegend = () => {
    const legendSvg = d3.select('#Viz_area')
                        .append('svg')
                        .attr('x',0)
                        .attr('y',height.value-180)
    
    // lengendSvg
    legendSvg
        .selectAll('legend')
        .data(proteinType)
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
        .data(proteinType)
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
    const legendSvg = d3.select('#Viz_area')
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

watch([gcContent,gcSkewPlus,gcSkewMinus,proteindata], () => {
    const content = gcContent.value
    const plus = gcSkewPlus.value
    const minus = gcSkewMinus.value
    if(typeof proteindata.value==='undefined' 
    || typeof content==='undefined'
    || typeof plus==='undefined'
    || typeof minus==='undefined'){
        console.log("no data. waiting...")
        return
    }


    //lengendSvg
    drawLegend('#Legend_area_circo')
    drawGCLegend()

    const data = _.sortBy(proteindata.value, o => {
        return parseInt(o.Start_location)
    })

    const axisEnd = Math.max(fastaLength.value,
            Number(
                _.maxBy(data, o => {
                    return Number(o.Stop_location)
                })?.Stop_location
            )
    )

    const svgArea = d3.select('#Viz_area').attr('transform', `translate(0, 0)`)
    
    
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

        let offset
        isBig ? (offset = -23) : (offset = -13)

        // //axisEnd
        // if(i==tickArr.length-1){
        //     isBig = true
        //     offset=-43
        // }

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
            // if(zeroNum>=6){
            //     tickStr = `${tickStr.slice(0, -6)},000 k`
            // }else if(zeroNum>=3){
            //     tickStr = `${tickStr.slice(0, -3)} k`
            // }else{
            //     if(tickStr.length>=4){
            //         tickStr =`${tick/1000} k`
            //     }else{
            //         tickStr = `${tickStr}`
            //     }
                
            // }
            
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
    const labelG = svgArea.append('g')

    const minDiffRad = 1.5 * (Math.PI / 180)

    //the array to store protein belongs to the same product
    const sameProduct = []

    //add one element in the end of array, to help draw the mark of the real last element
    data[data.length] = data[0]
    const arrow_mark = _.map(data, (d, i) => {
        const start_rad = radScaler(d.Start_location)
        const end_rad = radScaler(d.Stop_location)

        const start = getPositionOuterC(start_rad, 0)
        const end = getPositionOuterC(end_rad, 0)

        const start_outer = getPositionOuterC(start_rad, arrowWidth.value / 2)
        const start_inner = getPositionOuterC(start_rad, -arrowWidth.value / 2)

        const end_outer = getPositionOuterC(end_rad, arrowWidth.value / 2)
        const end_inner = getPositionOuterC(end_rad, -arrowWidth.value / 2)

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
            arrowRad=minDiffRad
        }

        if (d.Strand == '-') {
            head = start

            arrow_outer = getPositionOuterC(start_rad+arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionOuterC(start_rad+arrowRad, -arrowWidth.value/2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else if (d.Strand == '+') {
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
            d.Strand == '+' ? 0 : 1
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${
            d.Strand == '+' ? 1 : 0
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        let type
        const classlist = d.Protein_function_classification?.split(';').slice(
                    0,
                    -1
            ) as string[]
            if (classlist.length === 1) {
                if (classlist[0] in TypeDict) {
                    type= TypeDict[classlist[0]]
                }else{
                    type= TypeDict.mix
                }
            }else{
                type = TypeDict.mix
            }
        
        const color = type['color']
        //draw arrow
        const thisArrow = arrowG
            .append('path')
            .attr('d', `${arrowOuterLine + outerArc + tailLine + innerArc}Z`)
            .attr('fill', color)
            .attr('stroke', 'black')
            .attr('stroke-width', '0.5px')

        //mark line
        const thisMark = labelG.append('g')

        //sameProduct is the array to store protein belongs to the same product
        //the first protein/data
        let hasRealMark = false
        if (sameProduct.length == 0) {
            thisMark.attr('id', 'prev')
            sameProduct[0] = [type.name, type.color, d.Protein_product, start_rad, end_rad]
        } else if (d.Protein_product == sameProduct[0][2]) {
            // push elements into sameProduct
            sameProduct[sameProduct.length] = [
                type.name,
                type.color,
                d.Protein_product,
                start_rad,
                end_rad,
            ]
        } else {
            hasRealMark = true
            // draw mark line
            const rad_start = sameProduct[0][3]
            const rad_end = sameProduct[sameProduct.length - 1][4]
            const rad_mid = (rad_start + rad_end) / 2
            const mark_start = getPositionOuterC(rad_mid, arrowWidth.value / 2)
            const offset = arrowWidth.value/2 + 65 //change this number to adjust the length of mark_line
            const mark_end = getPositionOuterC(rad_mid, offset)
            const mark_line = `M ${mark_start[0]}, ${mark_start[1]} L ${mark_end[0]},${mark_end[1]}`

            
            //draw line
            thisMark
                .append('path')
                .attr('d', mark_line)
                .attr('stroke', sameProduct[0][1])
                .attr('stroke-width', '1.5px')

            //draw text
            thisMark
                .append('text')
                .attr('x', anchorPos[0])
                .attr('y', anchorPos[1])
                .text(sameProduct[0][2])
                .attr('text-anchor', anchor)
                .attr('fill', sameProduct[0][1])
                .attr('font-size', '14px')
                // .attr('stroke-width', '0.5px')
                // .attr('stoke','gray')

            //if i==0, there is no prevMark
            if (i != 0) {
                const prevMark = labelG.select('#prev')
                const prevText = prevMark.select('text').node()
                const thisText = thisMark.select('text').node()
                //detect if text overlaps
            }

            // prevMark[0]=thisMark.node()//cannot get prevMark by this way, the error says "undefined"
            // console.log(thisMark.select('text').node().getBoundingClientRect())

            // pop all elements and make the mark line
            sameProduct.splice(0, sameProduct.length)
            sameProduct[0] = [type.name, type.color, d.Protein_product, start_rad, end_rad]
        }

        if (hasRealMark == false) {
            return [thisArrow, null]
        } else {
            return [thisArrow, thisMark]
        }

        // if(axisEnd==parseInt(d.Stop_location)){
        //     svgArea.append('path')
        //     .attr('d',pathsp)
        //     .attr('fill',color)
        //     .attr('stroke','none')
        //     console.log(axis_end,head)
        // }
    })

    //plz look "data[data.length]=data[0]" and inside loop of const arrow_mark = _.map(data, (d,i)"
    for (let idx = 0; idx < arrow_mark.length - 1; idx++) {
        arrow_mark[idx][1] = arrow_mark[idx + 1][1]
    }
    //find the corresponding mark for each arrow
    //try whether it could bind the event before the function
    //the function use the arrow_mark, but arrow_make is modified in this loop
    // for (let idx = 0; idx < arrow_mark.length; idx++) {
    //     arrow_mark[idx][0].on('mouseenter', mouseenter_arrow).on('mouseleave', mouseleave)

    //     const mark = arrow_mark[idx][1]
    //     if (mark != null) {
    //         mark.on('mouseenter ', mouseenter_mark).on('mouseleave', mouseleave)

    //         for (let j = 0; j < idx; j++) {
    //             if (arrow_mark[j][1] == null) {
    //                 arrow_mark[j][1] = mark
    //             }
    //         }
    //     }
    // }
    let idx = 0
    _.forEach(arrow_mark, (d)=>{
        arrow_mark[idx][0].on('mouseenter', mouseenter_arrow).on('mouseleave', mouseleave)
        const mark = arrow_mark[idx][1]
        if (mark != null) {
            mark.on('mouseenter ', mouseenter_mark).on('mouseleave', mouseleave)

            for (let j = 0; j < idx; j++) {
                if (arrow_mark[j][1] == null) {
                    arrow_mark[j][1] = mark
                }
            }
        }
        idx+=1
    })

    //add the event
    function mouseenter_arrow() {
        labelG.selectAll('g').style('opacity', '0.3')
        arrowG.selectAll('path').style('opacity', '0.3')
        // const idx = arrow_mark.findIndex(d => d[0].node() == this)
        d3.select(this).style('opacity', '1')
        const mark = _.find(arrow_mark, d => d[0].node() == this)[1]
        mark.style('opacity', '1')
    }
    function mouseenter_mark() {
        arrowG.selectAll('path').style('opacity', '0.3')
        const highlightArrows = []
        for (let idx = 0; idx < arrow_mark.length; idx++) {
            const mark = arrow_mark[idx][1]
            if (mark.node() == this) {
                const arrow = arrow_mark[idx][0]
                arrow.style('opacity', '1')
            }
        }
        labelG.selectAll('g').style('opacity', '0.3')
        d3.select(this).style('opacity', '1')
    }
    function mouseleave() {
        arrowG.selectAll('path').style('opacity', '1')
        labelG.selectAll('g').style('opacity', '1')
    }

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
    
    loadchart.value = false
})

function downloadsvg() {
    const svgElement = document.getElementById('Viz_area') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svgElement as SVGElement)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'circo.svg'
    link.click()
    URL.revokeObjectURL(url)
}
const downloadSVGAsPNG = async () => {
    const svgElement = document.getElementById('Viz_area') as HTMLElement
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
            link.download = 'circo.png'
            link.click()

            URL.revokeObjectURL(url)
        }
    }, 'image/png')
}
</script>
