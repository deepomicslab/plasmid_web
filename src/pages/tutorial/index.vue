<template>
    <div class="w-full h-full bg-white">
        <iframe :src="url" class="w-full h-full"></iframe>
        <!-- <iframe src="http://localhost:8327/#/" class="w-full h-full"></iframe> -->
    </div>
</template>

<script setup lang="ts">
// const basepath = 'http://localhost:8873/#/'
const basepath = 'https://plasmiddoc.deepomics.org/#/'
const route = useRoute()
const type = computed(() => route.query?.type as string)
const url = computed(() => {
    if (type.value === undefined) {
        return `${basepath}`
    }
    return `${basepath}${type.value}`
})
</script>
