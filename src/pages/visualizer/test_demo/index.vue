<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* eslint-disable */
import Crux from 'crux'

const color = '#3d8eff'
const xlabel = 'Name'
const ylabel = 'Age'
const title = "Our lab members' age"
const xAxisIndex = 0
const yAxisIndex = 1

const demodata = [
    ['Tom', '11'],
    ['Dick', '12'],
    ['Harry', '55'],
    ['Slim', '44'],
    ['Jim', '13'],
]
const template = ref('')
async function importTextFile() {
    const fileURL = new URL('./template.bvt', import.meta.url)
    const response = await fetch(fileURL)
    const content = await response.text()
    template.value = content
    console.log(template.value)
}

onMounted(async () => {
    await importTextFile()
    Crux.visualize({
        el: '#canvas',
        template: template.value,
        data: { color, xlabel, ylabel, title, xAxisIndex, yAxisIndex, demodata },
    })
})
</script>
