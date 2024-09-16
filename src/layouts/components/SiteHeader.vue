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
import { NConfigProvider, GlobalThemeOverrides, NIcon } from 'naive-ui'
// import { NConfigProvider, GlobalThemeOverrides, NIcon, NEllipsis } from 'naive-ui'
// import { rgb } from 'd3'
// import windi from '@/windi'

// eslint-disable-next-line import/extensions
import Logo from '@/assets/img/plasmid.png'
</script>

<script setup lang="ts">
const themeOverrides: GlobalThemeOverrides = {
    common: {
        // primaryColor: '#069',
        primaryColorHover: 'rgb(255, 255, 255)',
        primaryColorPressed: '#069',
        primaryColorSuppl: '#069',
    },
    Menu: {
        itemTextColor: 'rgb(200, 200, 200)',
        itemIconColor: 'rgb(200, 200, 200)',
        itemIconColorHover: '#069',
        itemTextColorHover: '#069',
        itemTextColorActive: '#069',
        itemIconColorActive: '#069',
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
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Home' }
            ),
        key: '/',
        icon: renderIcon(HomeIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/database/',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Database' }
            ),
        key: '/database/',
        icon: renderIcon(DatabaseIcon),
        children: [
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Overview' }
                    ),
                key: '/database',
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/plasmid',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Plasmid List' }
                    ),
                key: '/database/plasmid',
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/host',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Host List' }
                    ),
                key: '/database/host',
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/cluster',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Cluster List' }
                    ),
                key: '/database/cluster',
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/protein',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Protein List' }
                    ),
                key: '/database/protein',
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/function',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Functional Annotation Data' }
                    ),
                key: '/database/function',
                children: [
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/trna',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'tRNAs & tmRNAs List' }
                            ),
                        key: '/database/function/trna',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/crispr',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'CRISPR/Cas systems List' }
                            ),
                        key: '/database/function/crispr',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/sm',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Secondary Metabolites List' }
                            ),
                        key: '/database/function/sm',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/sp',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Signal Peptides List' }
                            ),
                        key: '/database/function/sp',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/virulent',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Virulence Factors List' }
                            ),
                        key: '/database/function/virulent',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/antimicrobial_resistance',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Antibiotic Resistance Genes List' }
                            ),
                        key: '/database/function/antimicrobial_resistance',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/database/function/transmembrane',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Transmembrane Protein List' }
                            ),
                        key: '/database/function/transmembrane',
                    },
                ],
            },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                path: '/database/filter',
                            },
                            class: 'custom-link',
                        },
                        { default: () => 'Sequence Filter' }
                    ),
                key: '/database/filter',
            },
        ],
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/analysis/annopipline/',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Analysis' }
            ),
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
                            class: 'custom-link',
                        },
                        { default: () => 'Plasmid Annotation' }
                    ),
                key: '/analysis/annopipline/',
                children: [
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/structural/annotation',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'ORF prediction & Protein classification' }
                            ),
                        key: '/analysis/annopipline/structural/annotation',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/functional/trna',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'tRNA & tmRNA prediction' }
                            ),
                        key: '/analysis/annopipline/functional/trna',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/functional/arvf',
                                    },
                                    class: 'custom-link',
                                },
                                {
                                    default: () =>
                                        'Virulence factor & Antibiotic resistance gene annotation',
                                }
                            ),
                        key: '/analysis/annopipline/functional/arvf',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/annopipline/functional/trans',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Transmembrane protein annotation' }
                            ),
                        key: '/analysis/annopipline/functional/trans',
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
                            class: 'custom-link',
                        },
                        { default: () => 'Plasmid Comparison' }
                    ),
                key: '/analysis/comparison',
                children: [
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/comparison/alignment',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Sequence Alignment' }
                            ),
                        key: '/analysis/comparison/alignment',
                    },
                    {
                        label: () =>
                            h(
                                RouterLink,
                                {
                                    to: {
                                        path: '/analysis/comparison/phylogenetic',
                                    },
                                    class: 'custom-link',
                                },
                                { default: () => 'Comparative Analysis' }
                            ),
                        key: '/analysis/comparison/phylogenetic',
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
                        path: '/workspace',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Workspace' }
            ),
        key: '/workspace',
        icon: renderIcon(WorkspaceIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/download',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Download' }
            ),
        key: '/download',
        icon: renderIcon(DownloadIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/tutorial',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Tutorial' }
            ),
        key: '/tutorial',
        icon: renderIcon(tutorialIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/contact',
                    },
                    class: 'custom-link',
                    style: {
                        color: 'rgb(200, 200, 200)',
                    },
                },
                { default: () => 'Contact us' }
            ),
        key: '/contact',
        icon: renderIcon(UserIcon),
    },
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
::v-deep .custom-link {
    color: rgb(200, 200, 200);
    text-decoration: none;
}

::v-deep .n-menu .n-menu-item-content .n-menu-item-content-header a.custom-link:hover {
    color: rgb(255, 255, 255) !important;
}

::v-deep .router-link-active.router-link-exact-active.custom-link {
    color: #059669 !important;
}
</style>
