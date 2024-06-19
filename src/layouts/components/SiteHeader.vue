<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <div h="full" class="flex justify-between items-center">
            <div
                h="[80%]"
                class="flex items-center space-x-4 cursor-pointer select-none"
                @click="router.push('/')"
            >
                <img :src="Logo" class="h-[calc(100%-6px)]" />
                <h1 text="h5">PlasmidScope</h1>
            </div>
            <n-menu
                v-model:value="activeKey"
                mode="horizontal"
                :options="menuOptions"
                @update:value="changeMenu"
                class="c-main-menu"
            />
        </div>
    </n-config-provider>
</template>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { ListCheck as WorkspaceIcon } from '@vicons/tabler'
import { AnalyticsOutlined as AnalysisIcon } from '@vicons/material'
import {
    UserCircle as UserIcon,
    FileAltRegular as tutorialIcon,
    Download as DownloadIcon,
    Database as DatabaseIcon,
    Home as HomeIcon,
} from '@vicons/fa'
import { useRouter, RouterLink } from 'vue-router'
import { NConfigProvider, GlobalThemeOverrides, NIcon, NEllipsis } from 'naive-ui'
import { rgb } from 'd3'
// import windi from '@/windi'

// eslint-disable-next-line import/extensions
import Logo from '@/assets/img/plasmid.png'
</script>

<script setup lang="ts">
const themeOverrides: GlobalThemeOverrides = {
    Menu: {
        itemTextColor: rgb(200, 200, 200),
        itemIconColor: rgb(200, 200, 200),
        itemIconColorHover: rgb(175, 44, 94),
        itemTextColorHover: rgb(175, 44, 94),
        itemTextColorActive: rgb(175, 44, 94),
        itemIconColorActive: rgb(175, 44, 94),
    },
}

const route = useRoute()
const activeKey = ref<string>(route.path)

watch(
    () => route.path,
    () => {
        activeKey.value = route.path
    }
)
const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
    // { label: 'HOME', key: '/home', icon: renderIcon(HomeIcon) },
    { label: 'Home', key: '/', icon: renderIcon(HomeIcon) },
    {
        label: 'Database',
        key: '/database',
        icon: renderIcon(DatabaseIcon),
        children: [
            {
                label: 'Overview',
                key: '/database',
            },
            {
                label: 'Plasmid List',
                key: '/database/plasmid',
            },
            {
                label: 'Host List',
                key: '/database/host',
            },
            {
                label: 'Cluster List',
                key: '/database/cluster',
            },
            {
                label: 'Protein List',
                key: '/database/protein',
            },
            {
                label: 'Functional Annotation Data',
                key: '/database/function',
                children: [
                    {
                        label: 'tRNA & tmRNA Gene List',
                        key: '/database/function/trna',
                    },
                    {
                        label: 'CRISPR List',
                        key: '/database/function/crispr',
                    },
                    {
                        label: 'Secondary Metabolism List',
                        key: '/database/function/sm',
                    },
                    {
                        label: 'Signal Peptides List',
                        key: '/database/function/sp',
                    },
                    {
                        label: 'Virulent Factor List',
                        key: '/database/function/virulent',
                    },
                    {
                        label: 'Antimicrobial Resistance Gene List',
                        key: '/database/function/antimicrobial_resistance',
                    },
                    {
                        label: 'Transmembrane Protein List',
                        key: '/database/function/transmembrane',
                    },
                ],
            },

            {
                label: 'Sequence Filter',
                key: '/database/filter',
            },
        ],
    },
    {
        label: 'Analysis',
        key: '/analysis',
        icon: renderIcon(AnalysisIcon),
        children: [
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/analysis/annopipline/',
                            },
                        },
                        { default: () => 'Genome Annotation' }
                    ),
                key: '/analysis/annopipline/',
                children: [
                    {
                        label: 'Completeness Assessment',
                        key: '/analysis/annopipline/quality',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/phenotype',
                                    },
                                },
                                { default: () => 'Phenotype Annotation' }
                            ),
                        key: '/analysis/annopipline/phenotype',
                        children: [
                            {
                                label: 'Host Assignment',
                                key: '/analysis/annopipline/phenotype/host',
                            },
                            {
                                label: 'Lifestyle Prediction',
                                key: '/analysis/annopipline/phenotype/lifestyle',
                            },
                        ],
                    },

                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/structural',
                                    },
                                },
                                { default: () => 'Structural Annotation' }
                            ),
                        key: '/analysis/annopipline/structural',
                        children: [
                            {
                                label: 'ORF prediction & Protein Classification',
                                key: '/analysis/annopipline/structural/annotation',
                            },
                            {
                                label: 'Transcription Terminator Annotation',
                                key: '/analysis/annopipline/structural/terminators',
                            },
                        ],
                    },
                    {
                        label: 'Taxonomic Annotation',
                        key: '/analysis/annopipline/taxonomic',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/functional',
                                    },
                                },
                                { default: () => 'Functional Annotation' }
                            ),
                        key: '/analysis/annopipline/functional',
                        children: [
                            {
                                label: 'tRNA & tmRNA Gene Annotation',
                                key: '/analysis/annopipline/functional/trna',
                            },

                            {
                                label: 'Anti-CRISPR Protein Annotation',
                                key: '/analysis/annopipline/functional/anti',
                            },
                            {
                                label: 'CRISPR Array Annotation',
                                key: '/analysis/annopipline/functional/crispr',
                            },
                            {
                                label: () =>
                                    h(NEllipsis, null, {
                                        default: () =>
                                            'Virulent Factor & Antimicrobial Resistance Gene Detection',
                                    }),
                                key: '/analysis/annopipline/functional/arvf',
                            },
                            {
                                label: 'Transmembrane Protein Annotation',
                                key: '/analysis/annopipline/functional/trans',
                            },
                        ],
                    },
                ],
            },

            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/analysis/comparison',
                            },
                        },
                        { default: () => 'Genome Comparison' }
                    ),
                key: '/analysis/comparison',
                children: [
                    {
                        label: 'Sequence Clustering',
                        key: '/analysis/comparison/clustering',
                    },
                    {
                        label: 'Sequence Alignment',
                        key: '/analysis/comparison/alignment',
                    },
                    {
                        label: 'Comparative Tree Construction',
                        key: '/analysis/comparison/phylogenetic',
                    },
                ],
            },
        ],
    },
    { label: 'Workspace', key: '/workspace', icon: renderIcon(WorkspaceIcon) },
    { label: 'Download', key: '/download', icon: renderIcon(DownloadIcon) },
    { label: 'Tutorial', key: '/tutorial', icon: renderIcon(tutorialIcon) },
    { label: 'Contact us', key: '/contact', icon: renderIcon(UserIcon) },
]

const router = useRouter()
const changeMenu = (_: string, option: MenuOption) => {
    router.push(option.key as string)
}
</script>

<style lang="scss" scoped>
.c-main-menu {
    @apply flex justify-between items-center;
    @apply text-base;
    .n-menu-item {
        @apply flex flex-grow;
    }
}
</style>
