import { Layout } from "../types"

/**
 * 计算列宽度
 * @param col 列数
 * @param gutter 边距
 * @param boxWidth 盒子宽度
 * @returns 列宽度
 */
export const calcColWidth = (col: number, gutter: number, boxWidth: number): number => {
    return (boxWidth - (col - 1) * gutter) / col
}


/**
 * 计算高度
 * @param rowH 行高
 * @param gutter 边距
 * @param layout 布局
 * @returns 高度
 */
export const calcHeight = (rowH: number, gutter: number, layout: Layout): number => {
    let y = 0, h = 0
    for (const { y: y1, h: h1 } of layout) {
        if (y1 + h1 > y + h) {
            y = y1
            h = h1
        }
    }
    return (y + h - 2) * gutter + (y + h - 1) * rowH + rowH + gutter
}

/**
 * 计算边界值
 * @param initNumber 初始数值
 * @param moveNumber 移动数值
 * @param gapNumber 间隔数值
 * @param boundaryNumber 边界数值，默认为0
 * @returns 边界值
 */
export const calcBoundary = (newplacement: number, gapNumber: number, boundaryNumber = 0) => {
    return (newplacement <= 0)
        ? 1
        : (boundaryNumber && (newplacement + gapNumber) >= (boundaryNumber + 1))
            ? boundaryNumber + 1 - gapNumber
            : newplacement
}

/**
 * 根据 id 在布局中查找对应的索引和数据
 * @param layout 布局数组
 * @param id 要查找的 id
 * @returns 包含索引和数据的对象
 */
export const findIndexById = (layout: Layout, id: string) => {
    const index = layout.findIndex((item) => item.id === id)
    const data = layout[index]
    return { index, data }
}

/**
 * 绘制网格线
 * @param canvas canvas实列
 * @param height 高度
 * @param width 宽度
 * @param colWidth 列宽
 * @param rowH 行高
 * @param gutter 间距
 */
export const drawGridLines = (canvas: HTMLCanvasElement, height: number, width: number, colWidth: number, rowH: number, gutter: number) => {
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = width -10
    canvas.height = height
    // 绘制网格线
    ctx.fillStyle = '#000'
    ctx.lineWidth = 0.2
    ctx.setLineDash([20, 5])
    for (let i = rowH + Number(gutter) / 2; i < height; i = i + rowH + Number(gutter)) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
    }
    for (let i = colWidth + Number(gutter) / 2; i < width; i = i + colWidth + Number(gutter)) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
    }
}

/**
 * 递归克隆对象
 * @param obj - 要克隆的对象
 * @param cache - 存储循环引用对象的缓存
 * @returns 克隆后的对象
 */
export const deepClone = <T>(obj: T, cache = new WeakMap()): T => {
    if (obj === null || typeof obj !== "object") return obj
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
    if (obj instanceof RegExp) return new RegExp(obj.source) as unknown as T
    // 如果出现循环引用，则返回缓存的对象
    if (cache.has(obj)) return cache.get(obj)
    const newObj: T = Array.isArray(obj) ? [] : Object.create(null)
    // 缓存对象，用于循环引用的情况
    cache.set(obj, newObj)
    for (const key in obj) {
        newObj[key] = deepClone(obj[key], cache)
    }
    return newObj
}

/**
 * 判断两个对象是否相等
 * @param obj1 - 第一个对象
 * @param obj2 - 第二个对象
 * @returns 若两个对象相等则返回true，否则返回false
 */
export const isEqual = (obj1: any, obj2: any) => {
    if(!obj1 || !obj2) return false
    if(JSON.stringify(obj1) === JSON.stringify(obj2)) return true
    return false
}