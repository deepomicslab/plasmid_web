<template>
    <div class="flex flex-col justify-center items-center">
        <div id="canvas" class="flex flex-col justify-center items-center"></div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import Crux from 'crux'

import { parseNewick } from "crux/dist/utils";
import * as TextSize from "crux/dist/utils/text-size";
import { useClusterStore } from '@/store/cluster'
import _ from 'lodash';

const clusterStore = useClusterStore()

const template = ref('')

async function importTextFile() {
    const fileURL = new URL('./template.bvt', import.meta.url)
    const response = await fetch(fileURL)
    const content = await response.text()
    template.value = content
}

function getLeafNodes(node) {
    if (!node.hasOwnProperty("children")) {
        return [node];
    } else {
        let leafNodes = [];
        for (let child of node.children) {
            leafNodes.push(...getLeafNodes(child));
        }
        return leafNodes;
    }
}

function splitStringByLength(str, length) {
    var result = [];
    var index = 0;
    
    while (index < str.length) {
        result.push(str.substring(index, index + length));
        index += length;
    }
    
    return result;
}

const loaddata = computed(() => {
    console.log(clusterStore.dataload)
    return clusterStore.dataload
})


async function draw(){
    await importTextFile()
    const treedata = parseNewick(clusterStore.tasktreetext)
    const leafNodes = getLeafNodes(treedata);
    const leafNodesList = leafNodes.map(x => x.name)
    const leafNodesLengthList = leafNodes.map(x => x.length)
    const maxLeafNodesLength = Math.max(...leafNodesLengthList)
    const minLeafNodesLength = Math.min(...leafNodesLengthList)
    const leaveslist = leafNodesList
    const realHeight = leafNodesList.length * 7
    const treeHeight = realHeight < 900 ? 900: realHeight
    const clusters = clusterStore.taskclusterdata

    const clusterhash = {}
    const subclusterhash = {}
    let clusterlist = []
    let subclusterlist = []
    const hosthash = {}
    const lifestylehash = {}
    let hostlist = []
    let lifestylelist = []
    let currentClusters = []

    if (Object.keys(clusters).indexOf('results') != -1){
        currentClusters = clusters['results']
    }else{
        currentClusters = clusters
    }

    currentClusters.forEach(obj => {
        const { Acession_ID, host, lifestyle, cluster, subcluster, test, phage_id } = obj
        if (Acession_ID) clusterhash[Acession_ID] = cluster
        if (phage_id) clusterhash[phage_id] = cluster
        if (Acession_ID) subclusterhash[Acession_ID] = subcluster
        if (phage_id) subclusterhash[phage_id] = subcluster
        if (host) hosthash[Acession_ID] = host
        if (lifestyle) lifestylehash[Acession_ID] = lifestyle
        clusterlist.push(cluster)
        subclusterlist.push(subcluster)
        hostlist.push(host)
        lifestylelist.push(lifestyle)
    })

    hostlist = [...new Set(hostlist)] ? [...new Set(hostlist)]: []
    lifestylelist = [...new Set(lifestylelist)] ? [...new Set(lifestylelist)]: []
    subclusterlist = [...new Set(subclusterlist)]
    clusterlist = [...new Set(clusterlist)]
    const chunksubclusterlist = _.chunk(subclusterlist, 30); 
    const chunkclusterlist = _.chunk(clusterlist, 30); 
    const legendclusterlist = clusterlist
    clusterlist = clusterlist.concat(subclusterlist).concat(hostlist).concat(lifestylelist)
    
    const colorhash = {}
    let legendTextLengthArr = []
    clusterlist.forEach((item, index) => {
        const color = Oviz.color.Color.hsl((index % 6) * 60, 60 + Math.floor((index / 6)) * 10, 60 + Math.floor((index / 6)) * 10)
        colorhash[item] = color.string
        if(item) legendTextLengthArr.push(TextSize.measuredTextSize(item,12).width)
    })
    const maxLegendTextLength = Math.max(...legendTextLengthArr)

    const textLengthArr = leafNodesList.map((x)=>{
        return TextSize.measuredTextSize(x,10).width
    })
    const maxTextLength = Math.max(...textLengthArr) > 160 ? 160: Math.max(...textLengthArr)
    const legendHeight = (chunksubclusterlist[0].length + chunkclusterlist[0].length + 4)*20  + 300
    const maxradian = (1/leafNodesLengthList.length)*3.14*treeHeight/2
    const svgheight = Math.max(...[treeHeight/2 + 400 + maxTextLength*2, legendHeight])
    const svgwidth = treeHeight/2 + 400 + maxTextLength*2 + (125)*(chunkclusterlist.length)

    const r = realHeight/4
    const e1 = (1-Math.abs(Math.cos(Math.PI/leafNodesList.length)))*r
    const e2 = (Math.sin(Math.PI/leafNodesList.length))*r
    const maxRadius = Math.sqrt(e1**2 + e2**2)

    const hostlength = [0]
    const hosttext = []
    let maxlegendHeight = 0
    if (hostlist[0] !== undefined){
        hostlist.forEach((item, index)=>{
            const hostsplitArray = splitStringByLength(item, 37);
            const tmplen = TextSize.measuredTextSize(hostsplitArray[0],12).width
            hostlength.push(Math.ceil(TextSize.measuredTextSize(item, 12).width / tmplen) + hostlength[index])
            hosttext.push(hostsplitArray)
        })
        maxlegendHeight = legendHeight + hostlength[hostlength.length-1] * 20
    }
    
    

    

    Crux.visualize({
        el: "#canvas",
        template: template.value,
        data: {
            treedata, treeHeight, leaveslist, clusterhash, subclusterhash, colorhash, hosthash, lifestylehash, 
            maxTextLength,maxLeafNodesLength,hostlist,lifestylelist,subclusterlist,legendclusterlist,
            maxLegendTextLength,chunksubclusterlist,chunkclusterlist,minLeafNodesLength,maxradian,maxRadius,hostlength,
            hosttext,
            getTextLength(item, size){
                return TextSize.measuredTextSize(item, size).width
            },
            getAbbreviation(text){
                return text.length > 30
            },
        },
        setup() {
            this.defineGradient("bg", "horizontal", ['white', '#00BFFF']);
            this.defineGradient("gb", "horizontal", ['#00BFFF', 'white']);
            
            this.size.width = svgwidth +  250// maxLegendTextLength + 100
            this.size.height = Math.max(...[svgheight, maxlegendHeight])
        }
    })
}
watch(loaddata, async () => {
    console.log("66666")
    if (loaddata.value){
        draw()
    }
})


</script>
