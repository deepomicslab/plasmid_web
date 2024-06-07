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
        <div class="w-350 h-85 bg-gray-200 flex justify-center">
            <svg id="Circos_Legend_area" height="400" width="1140"></svg>
        </div>
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
const loaddata = computed(() => {
    return phageStore.phagedataloaded
})



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


const drawLegend = () => {
    const legnedSvg = d3.select('#Circos_Legend_area')
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

watch(loaddata, () => {
    if(!loaddata.value){
        console.log('loaddata.value is false')
        return
    }
    d3.select('#Circos_Legend_area').selectAll('*').remove()
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

    //lengendSvg
    drawLegend()
    drawGCLegend()

    const data = _.sortBy(proteindata.value, o => {
        return parseInt(o.start)
    })

    const axisEnd = Math.max(fastaLength.value,
            Number(
                _.maxBy(data, o => {
                    return Number(o.end)
                })?.end
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

    const minDiffRad = 1.5 * (Math.PI / 180)

    const shortenText = (text:String,maxLen:number = 30) =>{
        if(text.length<=maxLen){
            return text
        }else{
            const truncated = text.slice(0,maxLen)
            // return truncated.slice(0,truncated.lastIndexOf(' '))+'...'
            return truncated+'...'
        }
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


    const group = {
        StartRad: undefined,    
        StopRad: undefined,
        Type: undefined,
        Product: undefined,
        Class: undefined,
        markLine: undefined,
        anchor: undefined,
        anchorPos:undefined
    }
    let index=0
    const arrowData = []
    const offsetText = arrowWidth.value/2 + 65 //change this number to adjust the length of mark_line
    console.log(data)
    const groupProduct = _.reduce(data, (acc) => {
        const d = data[index]
        const start_rad = radScaler(d.start)
        const end_rad = radScaler(d.end)

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

        if (d.strand == '-') {
            head = start

            arrow_outer = getPositionOuterC(start_rad+arrowRad, arrowWidth.value/2)
            arrow_inner = getPositionOuterC(start_rad+arrowRad, -arrowWidth.value/2)

            tail_outer = end_outer
            tail_inner = end_inner
        } else if (d.strand == '+') {
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
            d.strand == '+' ? 0 : 1
        } ${tail_outer[0]}, ${tail_outer[1]} `
        const tailLine = `L ${tail_inner[0]} ,${tail_inner[1]} `
        const innerArc = `A ${innerArcR}, ${innerArcR} 0 0 ${
            d.strand == '+' ? 1 : 0
        } ${arrow_inner[0]}, ${arrow_inner[1]} `

        const arrow={'path':`${arrowOuterLine + outerArc + tailLine + innerArc}Z`}

        let type
        const classlist = d.cog_category?.split(';').slice(
                    0,
                    -1
            ) as string[]
            if (classlist.length === 1) {
                if (classlist[0] in TypeDict) {
                    type= TypeDict[classlist[0]]
                }else{
                    type= TypeDict.S
                }
            }else{
                type = TypeDict.S
            }
        if (d.cog_category in TypeDict)
            type = TypeDict[d.cog_category]
        else
            type = TypeDict.S
        arrow.color= type.color
        if (index === 0) {
            group.StartRad = start_rad
            group.StopRad = end_rad
            group.Type = type
            group.Product = d.product
            group.Class = `${group.Product}_${index}`
        } else {
            if (d.product === group.Product) {
                group.StopRad = Math.max(group.StopRad, end_rad)
            }else{
                const midRad = (group.StartRad+group.StopRad)/2
                const markStart = getPositionOuterC(midRad, arrowWidth.value / 2)
                const markEnd = getPositionOuterC(midRad, offsetText)
                group.markLine = `M ${markStart[0]}, ${markStart[1]} L ${markEnd[0]},${markEnd[1]}`
                group.anchor=getTextAnchorPosition(markEnd, midRad)[0]
                group.anchorPos = getTextAnchorPosition(markEnd, midRad)[1]
                acc.push({
                    ...group,
                })
                group.StartRad = start_rad
                group.StopRad = end_rad
                group.Type = type
                group.Product = shortenText(d.product)
                group.Class = `group${index}`
            }         
        }
        arrow.class = `${group.Class}`
        arrowData.push(arrow)
        index +=1
        return acc
    },[])

    const lastgroup_midRad = (group.StartRad+group.StopRad)/2
    const lastgroup_markStart = getPositionOuterC(lastgroup_midRad, arrowWidth.value / 2)
    const lastgroup_markEnd = getPositionOuterC(lastgroup_midRad, offsetText)
    group.markLine = `M ${lastgroup_markStart[0]}, ${lastgroup_markStart[1]} L ${lastgroup_markEnd[0]},${lastgroup_markEnd[1]}`
    group.anchor=getTextAnchorPosition(lastgroup_markEnd, lastgroup_midRad)[0]
    group.anchorPos = getTextAnchorPosition(lastgroup_markEnd, lastgroup_midRad)[1]
    groupProduct.push({...group})

    const arrowG = svgArea.append('g')
                    .selectAll('.arrow')
                    .data(arrowData)
                    .enter()
    
    
    arrowG.append('path')
        .attr('d',d=>d.path)
        .style('fill',d=>d.color)
        .attr('class',d=>d.class)
        .style('stroke', '#818181')
        .on('mouseenter', mouseenter_arrow)
        .on('mouseleave', mouseleave)

    const labelG = svgArea.append('g')
    const each_labelG = labelG.selectAll('.label')
            .data(groupProduct)
            .enter()
            .append('g')
            .attr('class',d=>d.Class)
            .on('mouseenter', mouseenter_label)
            .on('mouseleave', mouseleave)
            
    
    each_labelG.append('path')
                .attr('d', d=>d.markLine)
                .attr('stroke',d=>d.Type['color'])
                .attr('stroke-width', '1.5px')

    each_labelG.append('text')
                .attr('x', d=>d.anchorPos[0])
                .attr('y', d=>d.anchorPos[1])
                .text(d=>d.Product)
                .attr('text-anchor',d=>d.anchor)
                .attr('fill', d=>d.Type['color'])
                
    function mouseenter_arrow() {
        labelG.selectAll('g').style('opacity', '0.3')
        arrowG.selectAll('path').style('opacity', '0.3')
        d3.select(this).style('opacity', '1')
        labelG.select(`.${this.classList[0]}`)
            .style('opacity', '1')
    }
    function mouseenter_label() {
        arrowG.selectAll('path').style('opacity', '0.3')
        arrowG.selectAll(`.${this.classList[0]}`).style('opacity', '1')
        labelG.selectAll('g').style('opacity', '0.3')
        d3.select(this).style('opacity', '1')
    }
    function mouseleave() {
        arrowG.selectAll('path').style('opacity', '1')
        labelG.selectAll('g').style('opacity', '1')
    }       

    
    
    gcContent.value = contentArr
    gcSkewPlus.value = skewPlusArr
    gcSkewMinus.value = skewMinusArr
    

    const content = gcContent.value
    const plus = gcSkewPlus.value
    const minus = gcSkewMinus.value
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
