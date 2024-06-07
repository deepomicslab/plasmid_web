/** 主流浏览器 */
export type BrowserType = 'IE' | 'Firefox' | 'Opera' | 'Chrome' | 'Safari' | 'IE 11'

/**
 * 通过 UserAgent 获取用户的浏览器类型。此方法不能处理用户篡改 UserAgent 的隐患。
 * @returns 浏览器类型字符串，支持六个主流浏览器。
 */
export function getBrowserFromUA() {
    const { userAgent } = navigator
    let browser: Nullable<BrowserType> = null
    if (userAgent.indexOf('IE') !== -1) {
        browser = 'IE'
    } else if (userAgent.indexOf('Firefox') !== -1) {
        browser = 'Firefox'
    } else if (userAgent.indexOf('OPR') !== -1) {
        browser = 'Opera'
    } else if (userAgent.indexOf('Chrome') !== -1) {
        browser = 'Chrome'
    } else if (userAgent.indexOf('Safari') !== -1) {
        browser = 'Safari'
    } else if (userAgent.indexOf('Trident') !== -1) {
        // browser = 'IE 11';
        browser = 'IE'
    }
    return browser
}

export function exportBlob(blob: Blob, filename: string) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * @param option.parentId 根据父元素的 id 提取 SVG 元素
 */
export function getSvgElement(option: { parentId?: string }) {
    if (option.parentId) {
        const parent = document.getElementById(option.parentId)
        return (parent?.firstChild as SVGGraphicsElement) ?? null
    }
    return null
}

export function convertSvgElementToBlob(svg: SVGGraphicsElement) {
    const clonedSvg = svg.cloneNode(true) as SVGGraphicsElement
    return new Blob([clonedSvg.outerHTML], {
        type: 'image/svg+xml;charset=utf-8',
    })
}

export function exportSvg(parentId: string, filename: string) {
    const svg = getSvgElement({ parentId })
    if (svg === null) return
    const blob = convertSvgElementToBlob(svg)
    exportBlob(blob, filename)
}

/**
 * Reset SVG size.
 * @param parentId Select SVG element by its parent with specified ID
 */
export function resetSvgToBestSize(parentId: string) {
    const parent = document.getElementById(parentId)
    const svg = parent?.firstChild as SVGGraphicsElement
    if (svg === null || svg === undefined) return
    const { x, y, width, height } = svg.getBBox()
    svg.setAttribute('width', `${width + x}px`)
    svg.setAttribute('height', `${height + y}px`)
}
