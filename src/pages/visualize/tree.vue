<template>
    <div class="flex flex-col w-full justify-start items-center h-full mt-10">
        <div style="box-shadow: 0 0 64px #cfd5db" class="h-200 w-300">
            <tree
                treeUrl="http://localhost:8328/public/dataExample/visualization_demo/tree/demotree2.txt"
                clusterid="1"
            ></tree>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import tree from './components/tree1.vue'
</script>
