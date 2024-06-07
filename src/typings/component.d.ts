/* eslint-disable no-unused-vars */
/** Data interfaces for UI components */

declare type BreadcrumbItem = {
    title: string
    to:
        | string
        | {
              path: string
              query?: SSRecord
          }
}

declare type SelectorItem<T = unknown> = {
    label: string
    value: T
    disabled?: boolean
}

declare type CascaderItem<T = unknown> = {
    label: string
    value: T
    disabled?: boolean
    children?: CascaderItem<T>[]
}
