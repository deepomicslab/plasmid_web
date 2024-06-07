<template>
    <div style="box-shadow: 0 0 64px #cfd5db" class="w-330 mt-10">
        <div class="w-330">
            <el-scrollbar class="h-140 border-dark">
                <!-- <el-button class="mt-5 ml-3 absolute z-10 ml-290" type="primary">
                    <el-icon class="text-xl"><Operation /></el-icon>
                </el-button> -->
                <svg id="Viz_area" :height="height" :width="width" ref></svg>
            </el-scrollbar>
        </div>
        <div class="w-330 h-30 bg-gray-200">
            <svg id="Legend_area" height="120" width="1320"></svg>
        </div>
    </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import * as d3 from 'd3'
import _ from 'lodash'
// import { Operation } from '@element-plus/icons-vue'
import { TypeDict, coverageDict, identityDict, proteinType } from '@/utils/annotation'

import { usePhageStore } from '@/store/phage'

const width = ref(1280)
const height = ref(900)
const marginLeft = ref(60)
const lineHeight = ref(180)

// for draw arrow
const barareaMarginLeft = ref(70)
const barareaMarginRight = ref(70)
const triangleOffset = ref(15)
const arrowWeight = ref(7)
const barHeight = ref(30)
const phageStore = usePhageStore()

const phagecomparisondata = computed(() => {
    return phageStore.phagecomparisondata
})

const loaddata = computed(() => {
    return phageStore.alignmentloaded
})

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

function complink(ss, se, ts, te, y) {
    return `M ${ss} ${y} H ${se}  L ${te}  ${y + 123} H ${ts} Z`
}
const comparisonData = ref()

watch(loaddata, () => {
    console.log(loaddata.value)

    if (loaddata.value) {
        d3.select('#Viz_area').selectAll('*').remove()
        d3.select('#Legend_area').selectAll('*').remove()
        comparisonData.value = _.groupBy(
            phagecomparisondata.value.circlealignment,
            'Source_Phage_ID'
        )

        const proteindata = phagecomparisondata.value.proteins
        // The legend at the bottom
        const legnedSvg = d3.select('#Legend_area')

        legnedSvg
            .selectAll('legendLabel')
            .data(proteinType)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
                // eslint-disable-next-line no-bitwise
                return ((i / 2) | 0) * 140 + 140
            })
            .attr('y', function (d, i) {
                return (i % 2) * 30 + 35
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
                return ((i / 2) | 0) * 140 + 170
            })
            .attr('y', function (d, i) {
                return (i % 2) * 30 + 47
            })
            .style('fill', '#818181')
            .text(function (d) {
                return TypeDict[d].name
            })
            .attr('text-anchor', 'start')
            .style('alignment-baseline', 'middle')
        const maxEnd = ref(
            Number(
                _.maxBy(proteindata, o => {
                    return Number(o.Stop_location)
                })?.Stop_location
            )
        )

        if (maxEnd.value > 10000) {
            width.value = maxEnd.value / 20
        }
        const splitdata = _.groupBy(proteindata, 'phageid')

        const svg = d3.select('#Viz_area').attr('transform', `translate(${marginLeft.value}, 0)`)

        const bararea = svg
            .append('svg')
            .attr('height', height.value)
            .attr('width', width.value - (barareaMarginLeft.value + barareaMarginRight.value))
            .attr('x', barareaMarginLeft.value)
            .attr('y', 120)

        svg.selectAll('coverlegend')
            .data(_.values(coverageDict))
            .enter()
            .append('rect')
            .attr('x', 80)
            .attr('y', function (d, k) {
                return k * 16 + 38
            })
            .attr('width', 50)
            .attr('height', 16)
            .style('fill', function (d) {
                return d.color
            })
            .attr('stroke', '#424242')
            .attr('stroke-width', '1px')

        svg.selectAll('identitylegend')
            .data(_.values(identityDict))
            .enter()
            .append('rect')
            .attr('x', 145)
            .attr('y', function (d, k) {
                return k * 16 + 38
            })
            .attr('width', 50)
            .attr('height', 16)
            .style('fill', function (d) {
                return d.color
            })
            .attr('stroke', '#969696')
            .attr('stroke-width', '1px')

        svg.selectAll('legendTxt')
            .data(_.values(identityDict))
            .enter()
            .append('text')
            .attr('x', 200)
            .attr('y', function (d, k) {
                return k * 16 + 51
            })
            .text(function (d) {
                return d.text
            })
            .style('fill', '#969696')

        svg.append('text')
            .attr('x', 145)
            .attr('y', 30)
            .text('Identity')
            .style('fill', '#424242')
            .style('font-weight', 600)
        svg.append('text')
            .attr('x', 75)
            .attr('y', 30)
            .text('Coverage')
            .style('fill', '#424242')
            .style('font-weight', 600)

        let index = 0
        const endlist = []

        const toolTextPositions = []
        const textCount = 15
        const posGap = 21
        for (let i = 0; i < textCount; i += 1) {
            toolTextPositions.push((i + 1) * posGap)
        }
        const areaW = 220
        const areaH = 330

        const toolArea = svg
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
            svg.selectAll('.compline').style('opacity', 0.2)
            d3.select(this).style('opacity', 1)

            const toolX = md.layerX + 10
            const toolY = md.layerY + 10
            // if (toolX + areaW > width.value) {
            //     toolX = md.layerX - areaW - 10
            //     console.log(toolX, md.layerX)
            // }
            // if (toolY + areaH > height.value) {
            //     toolY = md.layerY - areaH - 10
            //     console.log(toolY, md.layerY)
            // }
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
            svg.selectAll('.compline').style('opacity', 0.7)
            toolArea.style('opacity', 0).attr('x', 0).attr('y', 0)
        }

        _.forEach(splitdata, (group, k) => {
            const end = Number(
                _.maxBy(group, o => {
                    return Number(o.Stop_location)
                })?.Stop_location
            )
            endlist.push(end)
            svg.append('g')
                .attr(
                    'transform',
                    `translate(${barareaMarginLeft.value},${index * lineHeight.value + 220})`
                )
                .attr('color', '#818181')
                .call(
                    d3
                        .axisBottom(
                            d3
                                .scaleLinear()
                                .domain([0, end])
                                .range([
                                    0,
                                    end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                                ])
                        )
                        .ticks(10)
                        .tickFormat(function (t) {
                            return t === 0 ? 0 : `${t / 1000}`
                        })
                )

            svg.append('text')
                .attr('transform', `translate(10,${index * lineHeight.value + 230}),rotate(-80)`)
                .text(`${k}`)
                .style('fill', '#424242')
                .style('font-weight', 600)
            if (index !== 0) {
                bararea
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', index * lineHeight.value + 45)
                    .attr('width', end / 20 - (barareaMarginLeft.value + barareaMarginRight.value))
                    .attr('height', 10)
                    .style('fill', 'None')
                    .attr('stroke', '#424242')
                    .attr('stroke-width', '1px')

                bararea
                    .selectAll('compbar')
                    .data(_.values(comparisonData.value)[index - 1])
                    .enter()
                    .append('rect')
                    .attr('x', function (i) {
                        return d3
                            .scaleLinear()
                            .domain([0, end])
                            .range([
                                0,
                                end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                            ])(Number(i.Target_start_point))
                    })
                    .attr('y', index * lineHeight.value + 45)
                    .attr('width', function (i) {
                        return d3
                            .scaleLinear()
                            .domain([0, end])
                            .range([
                                0,
                                end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                            ])(Number(i.Target_end_point - i.Target_start_point))
                    })
                    .attr('height', 10)
                    .style('fill', function (i) {
                        if (i.Coverage < 100) {
                            return i.Coverage < 50
                                ? coverageDict[4].color
                                : // eslint-disable-next-line no-bitwise
                                  coverageDict[(i.Coverage / 10) | 0].color
                        }
                        return coverageDict[9].color
                    })
                    .attr('stroke', '#343434')
                    .attr('stroke-width', '1px')
                bararea
                    .selectAll('compline')
                    .data(_.orderBy(_.values(comparisonData.value)[index - 1], 'Identity', 'asc'))
                    .enter()
                    .append('path')
                    .attr('class', 'compline')
                    .attr('d', function (i) {
                        const sacleSX = d3
                            .scaleLinear()
                            .domain([0, endlist[index - 1]])
                            .range([
                                0,
                                endlist[index - 1] / 20 -
                                    (barareaMarginLeft.value + barareaMarginRight.value),
                            ])
                        const sacleTX = d3
                            .scaleLinear()
                            .domain([0, end])
                            .range([
                                0,
                                end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                            ])
                        const sstart = sacleSX(i.Source_start_point)
                        const send = sacleSX(i.Source_end_point)
                        const tstart = sacleTX(i.Target_start_point)
                        const tend = sacleTX(i.Target_end_point)
                        return complink(
                            sstart,
                            send,
                            tstart,
                            tend,
                            (index - 1) * lineHeight.value + 101
                        )
                    })
                    .style('fill', function (i) {
                        if (i.Identity < 100) {
                            return i.Identity < 50
                                ? identityDict[4].color
                                : // eslint-disable-next-line no-bitwise
                                  identityDict[(i.Identity / 10) | 0].color
                        }
                        return identityDict[9].color
                    })
                    .attr('stroke', '#db095b')
                    .attr('stroke-width', '1px')
                    .style('opacity', '0.7')
                    .on('mouseenter', mouseenter)
                    .on('mouseleave', mouseleave)
            }

            bararea
                .selectAll('geneline')
                .data(group)
                .enter()
                .append('path')
                .attr('class', 'geneline')
                .attr('d', function (i) {
                    const startX = d3
                        .scaleLinear()
                        .domain([0, end])
                        .range([
                            0,
                            end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                        ])(Number(i.Start_location))
                    const endX = d3
                        .scaleLinear()
                        .domain([0, end])
                        .range([
                            0,
                            end / 20 - (barareaMarginLeft.value + barareaMarginRight.value),
                        ])(Number(i.Stop_location))

                    return i.strand === '+'
                        ? forwordtriangle(startX, endX, index * lineHeight.value + 65)
                        : backtriangle(startX, endX, index * lineHeight.value + 65)
                })
                .attr('fill', function (i) {
                    const classlist = i.Protein_function_classification?.split(';').slice(
                        0,
                        -1
                    ) as string[]
                    return classlist.length === 1
                        ? TypeDict[classlist[0]].color
                        : TypeDict.mix.color
                })
                .attr('stroke', '#5b5b5b')
                .attr('stroke-width', '1px')
            index += 1
        })
    }
})
</script>
