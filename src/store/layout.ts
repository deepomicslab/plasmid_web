import { defineStore } from 'pinia'

type State = {
    /** 侧边栏收起状态 */
    isSiderCollapsed: boolean
    /** 全局面包屑导航 */
    breadcrumbs: BreadcrumbItem[]
}

const useLayoutStore = defineStore('layout', {
    state: (): State => ({
        isSiderCollapsed: false,
        breadcrumbs: [{ title: '首页', to: '/' }],
    }),
    persist: {
        enabled: true,
        strategies: [{ storage: localStorage, paths: ['isSiderCollapsed'] }],
    },
    actions: {
        /** 切换侧边栏的展开/收起状态 */
        toggleSiderState() {
            this.isSiderCollapsed = !this.isSiderCollapsed
        },
    },
})

export default useLayoutStore
