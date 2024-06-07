/* eslint-disable no-unused-vars */

declare type BaseType = 'number' | 'boolean' | 'string' | 'symbol'

declare type SRecord<T> = Record<string, T>
declare type SARecord = Record<string, any>
declare type SSRecord = Record<string, string>
declare type SNRecord = Record<string, number>
declare type SBRecord = Record<string, boolean>
declare type Nullable<T> = T | null
declare type Nilable<T> = T | null | undefined
/** Raw response data. */
declare type RawResponse<T = Blob> = Promise<T>
/** JSON-format response data, including three attrs: `code`, `message` and `data`. */
declare type JsonResponse<T = any> = Promise<{
    code: number
    message: string
    data: T
}>
declare type listResponse<T = any> = Promise<{
    count: number
    next: string
    previous: string
    results: T
}>
declare type PxNumber = number
declare type PercentNumber = number
declare interface Window {
    templateSelected: any
    quizSelected: any
}
