<template>
    <el-scrollbar class="h-140">
        <svg id="Viz_area" :height="Height" :width="Width"></svg>
    </el-scrollbar>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import * as d3 from 'd3'
import _ from 'lodash'
import { TypeDict, proteinType } from '@/utils/annotation'
import { usePhageStore } from '@/store/phage'

const phageStore = usePhageStore()

const Width = ref(1300)
const Height = ref(1000)
const width = ref(700)
const height = ref(500)
const leftMargin = ref(200)
const rightMargin = ref(200)
const topMargin = ref(30)
const bottomMargin = ref(500)

// Different protein class has different color
const chooseColor = (d, flag) => {
        let color = ''
        // when d is protein_class
        if (flag == 1) {
            switch (d) {
                case 'assembly':
                    color = '#45bf43'
                    break
                case 'infection':
                    color = '#5490F8'
                    break
                case 'hypothetical':
                    color = '#29cbce'
                    break
                case 'immune':
                    color = '#DF3AD2'
                    break
                case 'integration':
                    color = '#9dc6e7'
                    break
                case 'replication':
                    color = '#0FF0BF'
                    break
                case 'packaging':
                    color = '#9343f0'
                    break
                case 'lysis':
                    color = '#ec364e'
                    break
                case 'tRNA':
                    color = '#90ed7d'
                    break
                case 'regulation':
                    color = '#445d8f'
                    break
                // case "unsorted": color="#FB8679"; break;
                // case "mix": color="#FFEE76"; break;
            }
            return color
        }
        // when d is final
        switch (d.class) {
            case 'assembly':
                color = '#45bf43'
                break
            case 'infection':
                color = '#5490F8'
                break
            case 'hypothetical':
                color = '#29cbce'
                break
            case 'immune':
                color = '#DF3AD2'
                break
            case 'integration':
                color = '#9dc6e7'
                break
            case 'replication':
                color = '#0FF0BF'
                break
            case 'packaging':
                color = '#9343f0'
                break
            case 'lysis':
                color = '#ec364e'
                break
            case 'tRNA':
                color = '#90ed7d'
                break
            case 'regulation':
                color = '#445d8f'
                break
            // case "unsorted": color="#FB8679"; break;
            // case "mix": color="#FFEE76"; break;
        }
        return color
    }



// const margin = {top: 10, right: 10, bottom: 100, left: 100}

// Labels of columns
// const protein_class = proteinType
const protein_class = [
    'hypothetical',
    'infection',
    'assembly',
    'replication',
    'packaging',
    'lysis',
    'regulation',
    'immune',
    'integration',
    'tRNA',
] 

const loaded =computed(()=>phageStore.heatmaploaded)

watch(loaded,()=>{
    let myVars = []

    phageStore.taskphagelist.forEach(d => {
        myVars.push(d.Acession_ID)
    })

    // append the svg object to the body of the page
    const svg = d3
        .select('#Viz_area')
        .append('svg')
        .attr('width', width.value + leftMargin.value + rightMargin.value + 100)
        .attr('height', height.value + topMargin.value + bottomMargin.value)
        .append('g')
        .attr('transform', `translate(${leftMargin.value},${topMargin.value})`)

    // Build X scales and axis:
    const x = d3
        .scaleBand()
        .range([0, width.value - leftMargin.value])
        .domain(myVars)
        .padding(0.001)
    let xAix = svg
        .append('g')
        .attr('transform', 'translate(' + leftMargin.value + ',' + height.value + ')')
        .call(d3.axisBottom(x))
    xAix.select('.domain').remove()
    xAix.selectAll('.tick').selectAll('line').remove()
    xAix.selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.5em')
        .attr('dy', '-.8em')
        .attr('transform', 'rotate(-90)')

    // Build the first Y scales and axis:
    const y = d3
        .scaleBand()
        .range([height.value / 2 - 5, 0])
        .domain(protein_class)
        .padding(0.01)

    let yAix = svg
        .append('g')
        .attr('transform', 'translate(' + leftMargin.value + ',0)')
        .call(d3.axisLeft(y))
    yAix.select('.domain').remove()
    yAix.selectAll('.tick').selectAll('line').remove()
    yAix.selectAll('text').attr('transform', 'translate(' + -y.bandwidth() + ',0)')

    yAix.selectAll('textRec')
        .data(protein_class)
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return -y.bandwidth()
        })
        .attr('y', function (d) {
            return y(d) + y.bandwidth() / 4
        })
        .style('width', y.bandwidth() / 2)
        .style('height', y.bandwidth() / 2)
        .style('fill', function (d) {
            return chooseColor(d, 1)
        })

    const y1 = d3
        .scaleBand()
        .range([height.value, height.value / 2 + 5])
        .domain(protein_class)
        .padding(0.01)

    // Build the second Y scales and axis:
    let y1Aix = svg
        .append('g')
        .attr('transform', 'translate(' + leftMargin.value + ',' + (height.value / 2 + 5) + ')')
        .call(d3.axisLeft(y))
    y1Aix.select('.domain').remove()
    y1Aix.selectAll('.tick').selectAll('line').remove()
    y1Aix.selectAll('text').attr('transform', 'translate(' + -y.bandwidth() + ',0)')

    y1Aix
        .selectAll('textRec')
        .data(protein_class)
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return -y.bandwidth()
        })
        .attr('y', function (d) {
            return y(d) + y.bandwidth() / 4
        })
        .style('width', y.bandwidth() / 2)
        .style('height', y.bandwidth() / 2)
        .style('fill', function (d) {
            return chooseColor(d, 1)
        })

    const tooltip = svg.append('svg').attr('height', 100).attr('width', 210).style('opacity', 0)
    tooltip
        .append('rect')
        .attr('x', 0)
        .attr('width', 210)
        .attr('height', 70)
        .style('fill', 'black')
        .style('opacity', 0.8)
    const toolText1 = tooltip
        .append('text')
        .style('fill', 'white')
        .attr('transform', `translate(10,20)`)
        .style('font-size', 12)
    const toolText2 = tooltip
        .append('text')
        .style('fill', 'white')
        .attr('transform', `translate(10,40)`)
        .style('font-size', 12)

    // create the black box, emerge when a column is selected
    const myCol = svg
        .append('rect')
        .style('opacity', 0)
        .style('fill-opacity', 0)
        .style('height', height.value)
        .style('width', x.bandwidth())
        .style('stroke', 'black')
        .style('stroke-width', '2')

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function () {
        tooltip.style('opacity', 1)
        myCol.style('opacity', 1)
    }
    const mousemove = function (md, d) {
        svg.selectAll('.myPies').style('opacity', 0.2)
        svg.selectAll('.piesBorder').style('opacity', 0.2)
        svg.selectAll('.myRec').style('opacity', 0.2)
        d3.select(this).style('opacity', 1)
        // console.log(d)
        myCol
            .attr(
                'x',
                Math.floor((md.layerX - 2 * leftMargin.value) / x.bandwidth()) * x.bandwidth() +
                    leftMargin.value
            )
            .attr('y', 0)
        tooltip
            .style('opacity', 1)
            .attr('x', md.layerX - leftMargin.value + 30)
            .attr('y', md.layerY - topMargin.value + 30)
        toolText1.text(function () {
            return `The exact value : ${d.value}`
        })
        toolText2.text(function () {
            return `The percentage : ${Number(d.perc).toFixed(2)}%`
        })
    }
    const mouseleave = function () {
        svg.selectAll('.myPies').style('opacity', 1)
        svg.selectAll('.piesBorder').style('opacity', 1)
        svg.selectAll('.myRec').style('opacity', 1)
        tooltip.style('opacity', 0)
        myCol.style('opacity', 0)
    }

    // Read the data and get a list 'count' in the format {x:Phage_Acession_ID, y:protein_class}
    let count = []



    phageStore.taskproteinlist.forEach(function (d) {
            let x = d.phageid
            delete d['phageid']
            let cl = _.split(d.Protein_function_classification, ';')
            if (cl[0] == 'unsorted') {
            } else {
                for (let i = 0; i < cl.length - 1; i++) {
                    let y = cl[i]
                    count.push({
                        x: x,
                        y: y,
                    })
                }
            }
        })

        // create a list 'cbcount' in the format {"Phage_Acession_ID:protein_class": the number}
        let cbcount = _.countBy(count, function (n) {
            return n.x + ':' + n.y
        })
        // console.log(cbcount)
        // create a list 'cbdata' in the format {Phage_Acession_ID: the number}
        let cbdata = _.countBy(count, function (n) {
            return n.x
        })
        let cbcount_keys = _.keys(cbcount)
        // create a list 'final' in the format {id:Phage_Acession_ID, class: protein_class, value:0, perc:0}
        let final = []
        // console.log(myVars);
        for (let m = 0; m < myVars.length; m++) {
            for (let n = 0; n < protein_class.length; n++) {
                final.push({
                    id: myVars[m],
                    class: protein_class[n],
                    value: 0,
                    perc: 0, //percentage
                })
            }
        }

        // update value and perc of final
        for (let j = 0; j < _.size(cbcount); j++) {
            let k = _.split(cbcount_keys[j], ':')
            let p = _.at(cbcount, cbcount_keys[j])
            let t = _.at(cbdata, k[0])
            // console.log(_.find(final, { 'id': k[0], 'class': k[1]}));
            _.find(final, { id: k[0], class: k[1] }).value = p[0]
            _.find(final, { id: k[0], class: k[1] }).perc = (p / t) * 100
        }

        // calculate the max value for each row
        let protein_class_max = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        final.forEach(function (d) {
            switch (d.class) {
                case 'hypothetical':
                    if (d.value > protein_class_max[0]) protein_class_max[0] = d.value
                    break
                case 'infection':
                    if (d.value > protein_class_max[1]) protein_class_max[1] = d.value
                    break
                case 'assembly':
                    if (d.value > protein_class_max[2]) protein_class_max[2] = d.value
                    break
                case 'replication':
                    if (d.value > protein_class_max[3]) protein_class_max[3] = d.value
                    break
                case 'packaging':
                    if (d.value > protein_class_max[4]) protein_class_max[4] = d.value
                    break
                case 'lysis':
                    if (d.value > protein_class_max[5]) protein_class_max[5] = d.value
                    break
                case 'regulation':
                    if (d.value > protein_class_max[6]) protein_class_max[6] = d.value
                    break
                case 'immune':
                    if (d.value > protein_class_max[7]) protein_class_max[7] = d.value
                    break
                case 'integration':
                    if (d.value > protein_class_max[8]) protein_class_max[8] = d.value
                    break
                case 'tRNA':
                    if (d.value > protein_class_max[9]) protein_class_max[9] = d.value
                    break
            }
        })

        // Build gradient color scale
        let recColor = function (d, flag) {
            let class_i = _.indexOf(protein_class, d.class)
            let color = chooseColor(d, flag)
            return d3
                .scaleLinear()
                .range(['#F7F7F7', color])
                .domain([0, protein_class_max[class_i]])
        }

        // gradient color rect
        let label = svg
            .append('g')
            .attr('transform', 'translate(20,' + (height.value / 2 + 5) + ')')
        const defs = label.append('defs') //append defs
        const linearGradient = defs
            .selectAll('graDef') //append <linearGradient> in defs
            .data(protein_class)
            .enter()
            .append('linearGradient')
            .attr('id', function (d) {
                return 'gradient' + d
            }) //corresponding id "gradient" + the name of the protein class
        linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#F7F7F7')
        linearGradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', function (d) {
                return chooseColor(d, 1)
            })
        const rect = label
            .selectAll('graRec')
            .data(protein_class)
            .enter()
            .append('rect')
            .attr('height', y.bandwidth())
            .attr('width', '80')
            .style('fill', function (d) {
                return "url('#gradient" + d + "')"
            })
            .attr('y', function (d) {
                return y(d)
            })
        const gratest = label.selectAll('graText').data(protein_class).enter()
        gratest
            .append('text')
            .text(function (d) {
                return protein_class_max[_.indexOf(protein_class, d)]
            })
            .style('fill', 'white')
            .style('font-size', 10)
            .attr('x', 75)
            .attr('y', function (d) {
                return y(d) + y.bandwidth() / 2 + 5
            })
            .attr('text-anchor', 'end')

        // the first graph
        const radius = Math.min(x.bandwidth(), y.bandwidth()) / 2 / 2 - 0.6 // the half of the actual radius
        const perimeter = 2 * Math.PI * radius

        // pies' border in the first graph
        svg.selectAll('piesBorder')
            .data(final) //, function(d) { return d.class+':'+d.id;})
            .enter()
            .append('circle')
            .attr('class', 'piesBorder')
            .attr('cx', function (d) {
                return x(d.id) + x.bandwidth() / 2 + leftMargin.value
            })
            .attr('cy', function (d) {
                return y(d.class) + y.bandwidth() / 2
            })
            .attr('r', radius * 2)
            .style('fill-opacity', 0)
            .style('stroke', '#282828')
            .style('stroke-width', 0.5)

        // pies in the first graph
        svg.selectAll('myPies')
            .data(final) //, function(d) { return d.class+':'+d.id;})
            .enter()
            .append('circle')
            .attr('class', 'myPies')
            .attr('cx', function (d) {
                return x(d.id) + x.bandwidth() / 2 + leftMargin.value
            })
            .attr('cy', function (d) {
                return y(d.class) + y.bandwidth() / 2
            })
            .attr('r', radius)
            .style('fill-opacity', 0)
            // .style("fill", "white")
            .style('stroke', function (d) {
                return chooseColor(d)
            })
            .style('stroke-width', radius * 2)
            .style('stroke-dasharray', function (d) {
                return _.toString((d.perc / 100) * perimeter) + ' ' + _.toString(perimeter)
            })
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)

        // heatmap
        svg.selectAll('myRec')
            .data(final) //, function(d) { return d.class+':'+d.id;})
            .enter()
            .append('rect')
            .attr('class', 'myRec')
            .attr('x', function (d) {
                return x(d.id) + leftMargin.value + 1
            })
            .attr('y', function (d) {
                return y1(d.class)
            })
            .attr('width', x.bandwidth() - 2)
            .attr('height', y1.bandwidth() - 1)
            .style('fill', function (d) {
                return recColor(d)(d.value)
            })
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)

})

</script>
