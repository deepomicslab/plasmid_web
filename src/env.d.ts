/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
/// <reference types="vite-svg-loader" />
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface ImportMetaEnv {
    readonly VITE_BASE_API: string
    readonly VITE_USE_MOCK?: boolean
    readonly VITE_PORT?: string
    readonly VITE_HOST?: string
    // more env vars...
}

declare interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.md' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
