<template>
    <div class="w-full h-full bg-white">
        <iframe :src="url" class="w-full h-full"></iframe>
        <!-- <iframe src="http://localhost:8327/#/" class="w-full h-full"></iframe> -->
    </div>
</template>

<script setup lang="ts">
// const basepath = 'http://localhost:8327/#/'
const url = 'https://phagewebdoc.deepomics.org/#/analysis'
</script>
