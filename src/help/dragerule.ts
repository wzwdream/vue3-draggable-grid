import { Layout, LayoutItem } from '../types'
import { deepClone, findIndexById } from './utils'

/**
 * 判断布局是否发生了变化
 * @param oldItem 旧的布局项
 * @param newItem 新的布局项
 * @returns 如果布局项的 x、y、w、h 中的任意一项发生了变化，则返回 true，否则返回 false
 */
export const isLayoutChanged = (oldItem: LayoutItem, newItem: LayoutItem) => {
    return (oldItem.x !== newItem.x || oldItem.y !== newItem.y || oldItem.w !== newItem.w || oldItem.h !== newItem.h)
}

/**
 * 判断两个布局项是否重叠
 * @param item1 布局项1的坐标、宽高信息
 * @param item2 布局项2的坐标、宽高信息
 * @returns 如果重叠则返回true，否则返回false
 */
export const isOverlap = ({ x: x1, y: y1, w: w1, h: h1 }: LayoutItem, { x: x2, y: y2, w: w2, h: h2 }: LayoutItem) => {
    return (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2)
}

/**
 * 获取静态元素
 * @param layoutdata 布局数据
 * @returns 过滤后的静态元素数组
 */
export const getStaticItem = (layoutdata: Layout) => {
    return layoutdata.filter(item => Boolean(item.static))
}

/**
 * 对布局进行碰撞检测，判断新物品是否与布局中的其他物品重叠
 * @param layout 布局
 * @param newItem 新物品
 * @returns 是否发生碰撞
 */
export const collisionDetection = (layout: Layout, newItem: LayoutItem): boolean => {
    return layout
        .filter(item => item.id !== newItem.id)
        .some(item => isOverlap(newItem, item))
}

/**
 * 对指定的itemId进行碰撞避免的函数（只针对单个布局项）
 * @param layout 布局数据
 * @param itemId 做规避的元素id
 * @param col 布局的列数
 * @returns 重新计算后的布局数据
 */
export const collisionAvoidanceForItem = (layout: Layout, itemId: string, col: number): Layout => {
    // 查找指定itemId在layout中的索引和对应的数据
    const { index, data: item } = findIndexById(layout, itemId)
    // 获取item的宽度
    const { w, static: isStatic } = item
    if (isStatic) return layout
    // 初始化x和y坐标
    let x = item.x
    let y = item.y
    // 初始化移动方向为左边
    let rowDirection = "left"
    let colDirection = ""

    // 判断是否发生碰撞
    const isCollision = () => collisionDetection(layout, { ...item, x, y })
    // 循环直到不发生碰撞
    while (isCollision()) {
        // 先像左找位置，没找到就像右找（存在重复计算）
        if (rowDirection === 'left') {
            if (x > 1) x--
            else {
                rowDirection = "right"
            }
        }
        // 再像右找位置，没找到就像左找（存在重复计算）
        if (rowDirection === 'right') {
            if (x + w <= col) x++
            else {
                if (colDirection === '') colDirection = "up"
                rowDirection = "left"
            }
        }
        if (colDirection === 'up') {
            if (y > 1) {
                y--
                colDirection = ""
            } else colDirection = "down"
        }
        if (colDirection === 'down') {
            if (x + w <= col) continue
            y++
            rowDirection = "left"
        }
    }
    // 创建新的item对象，包括更新后的x和y坐标
    const newItem = { ...item, x, y }
    // 返回更新后的layout数组，包括在索引index位置插入新的item对象
    return [...layout.slice(0, index), newItem, ...layout.slice(index + 1)]
}

/**
 * 获取与给定布局项发生重叠的其他布局项的索引
 * @param layout 布局数组
 * @param item 布局项
 * @returns 发生重叠的布局项的索引数组
 */
export const getCollidingIndexes = (layout: Layout, item: LayoutItem): string[] => {
    return layout
        .filter(elem => elem.id !== item.id && isOverlap(item, elem))
        .map(item => item.id)
}

/**
 * 对项目进行碰撞避免
 *
 * @param {Layout} layout - 布局对象
 * @param {LayoutItem} item - 布局项目对象
 * @param {number} col - 列号
 * @returns {Object} - 包含新布局、x和y坐标的对象
 */
export const collisionAvoidanceForItems = (layout: Layout, item: LayoutItem, col: number) => {
    let newLayout = deepClone(layout), x = item.x, y = item.y

    // 避免与静态元素碰撞
    const staticItem = getStaticItem(layout)
    if (collisionDetection(staticItem, item)) {
        const { x: x1, y: y1 } = avoidCollision(staticItem, item, col)
        x = x1
        y = y1
    }

    // 更新项目对象的x和y坐标
    item = { ...item, x, y }

    // 根据项目id查找索引
    const { index } = findIndexById(newLayout, item.id)
    newLayout[index] = item
    // 碰撞检测
    if (collisionDetection(newLayout, item)) {
        const itemIds = getCollidingIndexes(newLayout, item)
        for (const itemId of itemIds) {
            newLayout = collisionAvoidanceForItem(newLayout, itemId, col)
        }
    }

    return { data: newLayout, x, y }
}

/**
 * 检查布局是否合理(是否有冲突，是否超出边界)
 * @param data 布局数据
 * @param col 列数
 * @returns 合理的布局数据
 */
export const checkLayout = (data: Layout, col: number) => {
    let temp = deepClone(data)
    for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        if (!item.static) {
            if (item.x < 0) item.x = 1
            if (item.x + item.w > col + 1) item.x = 1
            if (item.w > col) item.w = col
        }

        temp = collisionAvoidanceForItems(temp, item, col).data
    }
    return temp
}

/**
 * 避免碰撞
 * @param layout 布局对象
 * @param item 待添加的布局项对象
 * @param col 该布局项所在的列
 * @returns 该布局项的碰撞避免数据
 */
export const avoidCollision = (layout: Layout, item: LayoutItem, col: number) => {
    const newLayout = [...layout, { ...item }]
    const temp = collisionAvoidanceForItem(newLayout, item.id, col)
    const { data } = findIndexById(temp, item.id)
    return {
        data: temp,
        x: data.x,
        y: data.y
    }
}

/**
 * 按照行和列的顺序对布局项进行排序
 * @param layout - 要排序的布局对象
 * @returns 排序后的布局对象
 */
export const sortLayoutItemsByRowCol = (layout: Layout): Layout => {
    return layout.sort((a, b) => {
        if (a.y === b.y && a.x === b.x) {
            return 0
        }

        if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
            return 1
        }

        return -1
    })
}

export const compactLayout = (layout: Layout, col: number) => {
    const sortedLayout = sortLayoutItemsByRowCol(layout)
    sortedLayout.map((item) => {
        if (item.static) return item
        let x = item.x, y = item.y
        while(x !== 1 || y !== 1) {
            if (x > 1) {
                x--
            } else if (y > 1) {
                y--
                x = col - item.w + 1
            }
            if (!collisionDetection(sortedLayout, {...item, x, y })) {
                item.x = x
                item.y = y
            }
        }
        return item
    })
    return sortedLayout
}