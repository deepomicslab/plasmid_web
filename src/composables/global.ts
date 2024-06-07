/**
 * 一般情况下我们想要代理 HTMLElement 但是又无法给定一个初始值，这个方法用来帮助我们避开各种 VCA 对
 * 代理变量 value 为 null 或者 undefined 的验证。
 */
export const useHTMLElementRef = () => ref<HTMLElement | null>(null) as Ref<HTMLElement>
