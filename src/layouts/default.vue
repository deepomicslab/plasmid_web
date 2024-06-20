<template>
    <n-layout :style="lcStyle">
        <n-layout-header class="flex justify-center bg-[rgb(18,49,73)] text-[rgb(200,200,200)]">
            <SiteHeader :style="hStyle" />
        </n-layout-header>
        <n-layout-content :style="coStyle">
            <n-scrollbar>
                <router-view />
            </n-scrollbar>
        </n-layout-content>
    </n-layout>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>This is a message</span>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// @ts-nocheck
import SiteHeader from './components/SiteHeader.vue'
// eslint-disable-next-line import/extensions
// import BgUri from '@/assets/img/study.png'
import { percent, px } from '@/utils/excss'

/** 顶部菜单的高度 */ const headerHeight: PxNumber = 80
/** 主体上下外边距 */ // const mainMarginY: PxNumber = 20
/** 主体部分的宽度 */ const width: PercentNumber = 90
// const ishasAgreed = ref(false)
const hStyle = {
    width: percent(width),
    height: px(headerHeight),
    maxWidth: '2560px',
    minWidth: '1080px',
}

const lcStyle = {
    width: '100%',
    height: `100vh`,
    // backgroundImage: `url("${BgUri}")`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.95,
}

const coStyle = {
    width: '100%',
    height: `calc(100vh - ${headerHeight}px)`,
    borderRadius: '5px',
    opacity: 1,
    'background-color': '#fff',
}
const dialogVisible = ref(false)
/*
removed attributes from coStyle

    margin: `${mainMarginY}px auto`,
    padding: '24px',
    minWidth: '1080px',
    maxWidth: '2160px',
*/
</script>

<style scoped>
/* :deep(.n-layout-content) {
    --n-color: #fff0 !important;
}
div.n-layout:nth-child(1) {
    --n-color: #fff !important;
} */
</style>
