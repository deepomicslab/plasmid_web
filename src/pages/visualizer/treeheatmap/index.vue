<template>
    <div>
        <div id="canvas2"></div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import Crux from 'crux'
import * as d3 from "d3";
import { parseNewick } from "crux/dist/utils";
import { heatmaparrs, TypeDict } from './data'
import { useClusterStore } from '@/store/cluster'
import * as TextSize from "crux/dist/utils/text-size";

const clusterStore = useClusterStore()

const template = ref('')
async function importTextFile() {
    const fileURL = new URL('./template.bvt', import.meta.url)
    const response = await fetch(fileURL)
    const content = await response.text()
    template.value = content
}

const loaddata = computed(() => {
    console.log(clusterStore.dataload)
    return clusterStore.dataload
})
watch(loaddata, async () => {

    await importTextFile()
    const treedata = parseNewick(clusterStore.tasktreetext)
    const heatmapdata = clusterStore.taskclustercount
    const heatmaphash = {}
    let titles = []
    let textLengthArr = []
    heatmapdata.forEach((item,index)=>{
        if(index == 0){
            titles = Object.keys(item).filter(x => x != 'phage_id')
        }
        heatmaphash[item['phage_id']] = Object.values(item).slice(1)
        textLengthArr.push(TextSize.measuredTextSize(item['phage_id'],12).width)
    })
    const maxTextLength = Math.max(...textLengthArr)
    const textgaplen = titles.length * 22 + 10 
    const colorshash = {}
    const maxvaluehash = {}
    titles.forEach((item,index)=>{
        colorshash[index] = Oviz.color.schemeGradient('white',TypeDict[item]['color'])
        let tmp_arr:number[] = []
        Object.values(heatmaphash).forEach((row, rowindex)=>{
            tmp_arr.push(row[index])
        })
        const maxvalue = Math.max(...tmp_arr)
        maxvaluehash[index] = maxvalue
    })
    const treeHeight = heatmapdata.length*12

    Crux.visualize({
        el: "#canvas2",
        template: template.value,
        data:{
            treedata,heatmaphash,titles,TypeDict,textgaplen,colorshash,maxvaluehash,treeHeight,maxTextLength
        },
        setup(){
            this.size.height = treeHeight+ 400
            this.size.width = 440 + textgaplen + maxTextLength
        }
    })
})


</script>
