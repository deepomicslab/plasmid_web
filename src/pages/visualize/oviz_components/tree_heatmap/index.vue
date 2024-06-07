<template>
    <div>
        <p>tree_heatmap</p>
        <div id="canvas"></div>
    </div>
</template>

<script setup lang="ts">
// import * as d3 from 'd3'
// import _ from 'lodash'
// import Crux from 'crux'
// @ts-nocheck

import { useClusterStore } from '@/store/cluster'

const ClusterStore = useClusterStore()
console.log(ClusterStore.funcount)
console.log(ClusterStore.treetext)

// const template = ref('')
// async function importTextFile() {
//     const fileURL = new URL('./template.bvt', import.meta.url)
//     const response = await fetch(fileURL)
//     const content = await response.text()
//     template.value = content
// }

// onMounted(async () => {
//     await importTextFile()
//     Crux.visualize({
//         el: '#canvas',
//         template: template.value,
//         data: { color, xlabel, ylabel, title, xAxisIndex, yAxisIndex, demodata },
//     })
// })
</script>
