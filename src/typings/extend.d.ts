/* eslint-disable no-unused-vars */
/** This typing file is used to extend the built-in objects */
import { MessageApi } from 'naive-ui'
import type { Ref as Ref$0, Component as Component$0 } from 'vue'
import { FormValidationStatus as FormValidationStatus$0 } from 'naive-ui/lib/form/src/interface'

declare global {
    /** Extra: `$message`. */
    interface Window {
        $message: MessageApi
    }

    // 用一种奇怪的方法导入 vue 的全局类型
    type Ref<T = any> = Ref$0<T>
    type Component = Component$0

    type NullableRef<T> = Ref<T | null>
    type NilableRef<T> = Ref<T | null | undefined>

    type FormValidationStatus = FormValidationStatus$0
}

export {}
