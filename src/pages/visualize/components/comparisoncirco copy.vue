<template>
    <div style="box-shadow: 0 0 64px #cfd5db" class="w-250 mt-10 h-250">
        <div class="w-250">
            <el-scrollbar class="h-250 border-dark">
                <svg id="Viz_comp" :height="height" :width="width"></svg>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
/* eslint consistent-return: off */
import * as d3 from 'd3'
import _ from 'lodash'
// import { Operation } from '@element-plus/icons-vue'
// import { TypeDict, coverageDict, identityDict, proteinType } from '@/utils/annotation'

import { usePhageStore } from '@/store/phage'

const width = ref(1000)
const height = ref(1000)
const phageStore = usePhageStore()
const radius = 400
const strokeWidth = 10
const cx = computed(() => width.value / 2)
const cy = computed(() => height.value / 2)

const getCoordinates = (rad: Number) => {
    return [
        cx.value + radius * Math.cos(rad - Math.PI / 2),
        cy.value + radius * Math.sin(rad - Math.PI / 2),
    ]
}

const phagecomparisondata = computed(() => {
    return phageStore.phagecomparisondata
})

const loaddata = computed(() => {
    return phageStore.alignmentloaded
})

// const colors = ['pink', 'orange', 'blue', 'green', 'green']
const colors = ['#da4b89', '#ff8000', '#4b89da', '#4bda9c', '#4bda9c']
const minVal = 90
const maxVal = 100
const sectionVal = (maxVal - minVal) / (colors.length - 1)

const identityColor = (identity: Number) => {
    if (identity < minVal || identity > maxVal) {
        return 'none'
    }

    const idx = Math.floor((identity - minVal) / sectionVal)
    return colors[idx]
}

const drawLegend = () => {
    const colorArr = colors.slice(0, -1)
    const legendSvg = d3.select('#Viz_comp').append('svg').attr('x', 15).attr('y', 15)

    legendSvg
        .append('text')
        .attr('x', 65)
        .attr('y', 20)
        .text('Identity')
        .attr('font-size', '17px')
        .style('fill', '#818181')
        .style('alignment-baseline', 'hanging')

    const boxW = 25
    const boxMl = 50
    const boxMt = 50
    legendSvg
        .selectAll('.legendColorBox')
        .data(colorArr)
        .enter()
        .append('rect')
        .attr('x', boxMl)
        .attr('y', (d, i) => 50 + i * (boxW + 4))
        .attr('width', boxW)
        .attr('height', boxW)
        .style('fill', d => d)
    legendSvg
        .selectAll('.legendText')
        .data(colorArr)
        .enter()
        .append('text')
        .attr('x', boxMl + boxW + 10)
        .attr('y', (d, i) => boxMt + i * (boxW + 4) + boxW / 2 + 3)
        .style('fill', '#818181')
        .text((d, i) => `>= ${minVal + i * sectionVal}%`)
        .attr('font-size', '13px')
}

watch(loaddata, () => {
    const svgArea = d3.select('#Viz_comp')
    const childrenCount = svgArea.selectAll('*').size()
    if (childrenCount > 0) {
        svgArea.selectAll('*').remove()
    }
    if (!loaddata.value) {
        console.log('waiting...')
        return
    }

    if (phagecomparisondata.value.circlealignment.length <= 1) {
        return
    }
    drawLegend()

    const uniqueIDList = _.uniqBy(phagecomparisondata.value.proteins, 'phageid')
    const total = uniqueIDList.length
    const padAngle = 2
    const padRad = padAngle * (Math.PI / 180)
    const sectionRad = (360 / total) * (Math.PI / 180)

    const phageList = _.map(uniqueIDList, (d, idx) => {
        const phage = { phage_id: d.phageid }

        const lastProtein = _.maxBy(phagecomparisondata.value.proteins, o => {
            if (o.phageid !== phage.phage_id) {
                return 0
            }
            return Number(o.Stop_location)
        })

        phage.axisEnd = Number(lastProtein.Stop_location)

        phage.scaler = d3
            .scaleLinear()
            .range([idx * sectionRad, (idx + 1) * sectionRad - padRad])
            .domain([0, phage.axisEnd])

        phage.midRad = phage.scaler(phage.axisEnd / 2)

        return phage
    })

    svgArea.attr('width', width.value).attr('height', height.value)

    const toUseClockWiseDirection = (midRad: Number) => {
        return !(midRad > (100 * Math.PI) / 180 && midRad < (260 * Math.PI) / 180)
    }

    svgArea
        .selectAll('.axis')
        .data(phageList)
        .enter()
        .append('path')
        .attr('d', p => {
            const start = getCoordinates(p.scaler(0))
            const end = getCoordinates(p.scaler(p.axisEnd))

            if (!toUseClockWiseDirection(p.midRad)) {
                return `M ${end[0]}, ${end[1]} 
                A ${radius}, ${radius}, 0, 0, 0,
                 ${start[0]}, ${start[1]}`
            }

            return `M ${start[0]}, ${start[1]} 
                A ${radius}, ${radius}, 0, 0, 1,
                ${end[0]}, ${end[1]}`
        })
        .attr('id', p => `axis${p.phage_id}`)
        .attr('stroke-width', `${strokeWidth}`)
        .attr('stroke', 'gray')
        .attr('fill', 'none')

    svgArea
        .selectAll('.idText')
        .data(phageList)
        .enter()
        .append('text')
        .attr('dy', p => (toUseClockWiseDirection(p.midRad) ? -20 : 20))
        .append('textPath')
        .attr('xlink:href', p => `#axis${p.phage_id}`)
        .attr('startOffset', '50%')
        .text(p => p.phage_id)

    const ribbon = d3.ribbon().radius(radius - strokeWidth / 2)
    // For Tooltip: shared code, put it outside the loop
    const toolTextPositions = []
    const textCount = 15
    const posGap = 21
    for (let i = 0; i < textCount; i += 1) {
        toolTextPositions.push((i + 1) * posGap)
    }
    const areaW = 220
    const areaH = 330

    const ribbonData = _.map(phagecomparisondata.value.circlealignment, align => {
        const sourcePhage = _.find(phageList, p => p.phage_id === align.Source_Phage_ID)
        const targetPhage = _.find(phageList, p => p.phage_id === align.Target_Phage_ID)
        if (typeof sourcePhage === 'undefined' || typeof targetPhage === 'undefined') {
            console.log('ERROR')
        }
        const identity = Number(align.Identity)
        if (identity < 90 || identity > 100) {
            return ''
        }

        const markData = {
            source: {
                startAngle: sourcePhage.scaler(align.Source_start_point),
                endAngle: sourcePhage.scaler(align.Source_end_point),
            },
            target: {
                startAngle: targetPhage.scaler(align.Target_start_point),
                endAngle: targetPhage.scaler(align.Target_end_point),
            },
        }
        return {
            ...align,
            path: ribbon(markData),
            color: identityColor(identity),
        }

        // const ribbonMark = svgArea
        //     .append('path')
        //     .attr('transform', `translate(${cx.value},${cy.value})`)
        //     .attr('d', ribbon(ribbonData))
        //     .style('fill', identityColor(identity))
        //     .style('stroke', '#818181')
        //     .attr('class', 'ribbon')
    })

    const ribbons = svgArea
        .append('g')
        .attr('transform', `translate(${cx.value},${cy.value})`)
        .selectAll('.ribbon')
        .data(ribbonData)
        .enter()
        .append('path')
        .attr('d', d => d.path)
        .style('fill', d => d.color)
        .style('stroke', '#818181')
        .attr('class', 'ribbon')

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

    const mouseenter = function (md, mv) {
        svgArea.selectAll('.ribbon').style('opacity', 0.2)
        d3.select(this).style('opacity', 1)

        let toolX = md.layerX + 10
        let toolY = md.layerY + 10
        if (toolX + areaW > width.value) {
            toolX = md.layerX - areaW - 10
            console.log(toolX, md.layerX)
        }
        if (toolY + areaH > height.value) {
            toolY = md.layerY - areaH - 10
            console.log(toolY, md.layerY)
        }
        toolArea.style('opacity', 1).attr('x', toolX).attr('y', toolY)

        const textContent = [
            `ID: ${mv.id}`,
            `Identity: ${mv.Identity}`,
            `Coverage: ${mv.Coverage}`,
            '',
            `Source phage ID: ${mv.Source_Phage_ID}`,
            `Source_protein_id: ${mv.Source_protein_id}`,
            `Source start point: ${mv.Source_start_point}`,
            `Source_end_point: ${mv.Source_end_point}`,
            `Source_strand: ${mv.Source_strand}`,
            '',
            `Target_Phage_ID: ${mv.Target_Phage_ID}`,
            `Target_protein_id: ${mv.Target_protein_id}`,
            `Target_start_point: ${mv.Target_start_point}`,
            `Target_end_point: ${mv.Target_end_point}`,
            `Target_strand: ${mv.Target_strand}`,
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
    const mouseleave = function () {
        svgArea.selectAll('.ribbon').style('opacity', 1)
        toolArea.style('opacity', 0).attr('x', 0).attr('y', 0)
    }
    console.log(ribbons)
    ribbons.on('mouseenter', mouseenter).on('mouseleave', mouseleave)
})
</script>
