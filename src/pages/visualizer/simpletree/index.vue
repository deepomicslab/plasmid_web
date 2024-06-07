<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import Crux from 'crux'
import { parseNewick } from "crux/dist/utils";
// import chroma from 'chroma-js';
import * as TextSize from "crux/dist/utils/text-size";
import { useClusterStore } from '@/store/cluster'

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

const loaddata = computed(() => {
    console.log(clusterStore.dataload)
    return clusterStore.dataload
})

watch(loaddata, async () => {
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
    const textLengthArr = leafNodesList.map((x)=>{
        return TextSize.measuredTextSize(x,10).width
    })
    const maxTextLength = Math.max(...textLengthArr)
    const svgsize = treeHeight/2 + maxTextLength*2 + 200
    const gradientColors = Oviz.color.schemeGradient('white', '#8fc8f5')
    const maxradian = (1/leafNodesLengthList.length)*3.14*treeHeight/2
    // console.log("maxRadius:",maxRadius)
    const r = realHeight/4
    const e1 = (1-Math.cos(Math.PI/leafNodesList.length))*r
    const e2 = (Math.sin(Math.PI/leafNodesList.length))*r
    const maxRadius = Math.sqrt(e1**2 + e2**2)

    Crux.visualize({
        el: "#canvas",
        template: template.value,
        data: {
            treedata, treeHeight, maxTextLength, svgsize,gradientColors,maxLeafNodesLength,minLeafNodesLength,maxradian,maxRadius,
            getTextLength(item, size){
                return TextSize.measuredTextSize(item, size).width
            },
        },
        setup() {
            this.size.width = svgsize
            this.size.height = svgsize
            this.defineGradient("kg", "vertical", ['#8fc8f5', 'white']);
        }
    })
})
onMounted(async () => {
    
})
</script>
