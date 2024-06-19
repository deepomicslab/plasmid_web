<template>
    <n-message-provider
        :containerStyle="{ 'margin-top': '100px' }"
        :closable="true"
        :duration="3000"
    >
        <MessageApi />
    </n-message-provider>
    <n-dialog-provider></n-dialog-provider>
    <n-config-provider :theme-overrides="themeOverrides" :hljs="hljs">
        <router-view />
    </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
</script>
<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import markdown from 'highlight.js/lib/languages/markdown'
import windi from '@/windi'

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: windi.colors.fuchsia,
        primaryColorHover: windi.colors.light,
        primaryColorPressed: windi.colors.light,
        primaryColorSuppl: windi.colors.light,
    },
}
hljs.registerLanguage('markdown', markdown)
</script>
<style>
.n-scrollbar-container > .n-scrollbar-content {
    height: 100%;
}

.g-loading-box {
    @apply flex justify-center items-center;
    @apply h-200px p-4 border rounded-md select-none duration-500;
    @apply hover:(bg-blue-100);
}

/*Naive description component border color */
.n-descriptions.n-descriptions--left-label-placement.n-descriptions--left-label-align.n-descriptions--medium-size.n-descriptions--bordered {
    --n-border-color: #c6c6c6 !important;
}

.n-message-wrapper {
    --n-icon-size: 1.25rem !important;
    --n-font-size: 1.25rem !important;
    --n-close-size: 1rem !important;
    --n-padding: 20px 35px !important;
}
/*Cancel the expansion symbol in the lower right corner of the input box  */
.n-input.n-input--textarea.n-input--resizable .n-input-wrapper {
    resize: none;
}
/*upload component height  changes with the height of the outside div  */
.n-upload-trigger {
    width: 100%;
    height: 100%;
}
.n-upload-dragger {
    height: 100%;
}
.n-upload.n-upload--dragger-inside {
    height: 100%;
}
/*upload component filelist style */
.n-upload-file-info__thumbnail {
    margin-bottom: 7px;
}
.n-upload-file-list {
    width: 98%;
    margin-left: 10px;
    position: relative;
    bottom: 64px;
}
</style>
