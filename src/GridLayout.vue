<template>
    <div class="grid">
        <canvas v-show="isDrawGridLines" ref="canvas" class="canvas"></canvas>
        <div class="grid-layout" ref="gridLayoutRef">
            <slot />
            <div v-show="isDraging" class="dragingItem"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DraggableStart, DraggableHandle, DraggableEnd, Removes, HandleType, Layout, LayoutItem, PropsData } from './types'
import { key } from './help/key'
import useDrage from './help/useDrage'
import useLayout from './help/useLayout'
import { calcColWidth, calcHeight, deepClone, drawGridLines } from './help/utils'
import { onMounted, ref, watchEffect, provide, watch, computed } from 'vue'
import { checkLayout } from './help/dragerule'

const props = withDefaults(defineProps<PropsData>(), {
    data: () => [] as Layout,
    col: 12,
    rowH: 50,
    drage: true,
    resize: true,
    remove: true,
    gutter: 10,
    isDrawGridLines: true,
    isCollision: true
})

/**
 * 初始化数据
 */
const canvas = ref<HTMLCanvasElement>()
const drage = computed((): boolean => props.drage)
const resize = computed((): boolean => props.resize)
const removeItem = computed((): boolean => props.remove)
const isDrawGridLines = computed((): boolean => props.isDrawGridLines)

/**
 * 引用hook，分离拖拽、缩放、删除的逻辑代码
 */
const { draggableStart, draggableHandle, draggableEnd, isDraging, isCollision, removes, propsId, dragingstyle, layoutdata, col, rowH, gutter } = useDrage(props)
const { layoutHeight, colWidth, layoutStyle, updateStyle } = useLayout()

/**
 * 计算每个item的宽度高度
 */
const gridLayoutRef = ref<HTMLDivElement | null>(null)
const calcWidth = () => {
    if (gridLayoutRef.value) {
        colWidth.value = calcColWidth(col.value, gutter.value, gridLayoutRef.value.clientWidth)
    }
}

// 绘制网格线
const drawGrid = () => {
    if (canvas.value && gridLayoutRef.value && props.isDrawGridLines) {
        drawGridLines(canvas.value, layoutHeight.value, gridLayoutRef.value.clientWidth, colWidth.value, rowH.value, gutter.value)
    }
}

// 计算总高度
const calcLayoutHeight = () => {
    if (gridLayoutRef.value) {
        layoutHeight.value = calcHeight(rowH.value, gutter.value, layoutdata.value)
    }
}

// 监听变化动态计算高度和绘制网格线
watch([col, rowH, gutter, layoutdata], () => {
    calcWidth()
    if(!isDraging.value) calcLayoutHeight() // 拖拽中不使用layoutdata计算高度
    drawGrid()
})
onMounted(() => {
    calcWidth()
    calcLayoutHeight()
    drawGrid()
    window.onresize = () => {
        calcWidth()
        drawGrid()
    }
})

/**
 * 保证hook中的数据是最新数据
 */
watchEffect(() => {
    layoutdata.value = deepClone(checkLayout(props.data, Number(props.col)))
    // 判断数据经过初始化后是否发生变化，如果发生变化能返回给父组件
    if (JSON.stringify(layoutdata.value) !== JSON.stringify(props.data)) {
        updateData()
    }
    rowH.value = Number(props.rowH)
    col.value = Number(props.col)
    gutter.value = Number(props.gutter)
    isCollision.value = props.isCollision
    updateStyle(col.value, rowH.value, gutter.value)
})
/**
 * 抛出emit事件
 */
const emit = defineEmits<{
    'update:data': [data: Layout]
    draggableStart: [id: string]
    draggableHandle: [id: string, newItem: LayoutItem]
    draggableEnd: [data: Layout]
    remove: [id: string]
}>()
const updateData = () => {
    emit('update:data', layoutdata.value)
}
const dragStart: DraggableStart = (id: string) => {
    draggableStart(id)
    emit('draggableStart', id)
}
const dragHandle: DraggableHandle = (shiftX: number, shiftY: number, handleType?: HandleType) => {
    const { newData, newItem } = draggableHandle(shiftX, shiftY, colWidth.value, handleType)
    layoutHeight.value = calcHeight(rowH.value, gutter.value, newData)
    // drawGrid()
    emit('draggableHandle', propsId.value, newItem)
}
const dragEnd: DraggableEnd = () => {
    draggableEnd()
    updateData()
    emit('draggableEnd', layoutdata.value)
}
const remove: Removes = (id: string) => {
    removes(id)
    updateData()
    emit('remove', id)
}

/**
 * 注入参数，方便子组件调用
 */
provide(key, {
    layoutdata, // 布局数据
    rowH, // item高度
    col, // 列数
    gutter, // 间距
    colWidth, // item宽度
    drage, // 是否可拖拽
    resize, // 是否可缩放
    remove: removeItem, // 删除item
    draggableStart: dragStart, // 拖拽开始
    draggableHandle: dragHandle, // 拖拽中
    draggableEnd: dragEnd, // 拖拽结束
    removes: remove // 删除元素方法
})
</script>

<style scoped>
.grid {
    position: relative;
    width: 100%;
}

.grid-layout {
    display: grid;
    place-items: center center;
    grid-template-columns: v-bind('layoutStyle.gridTemplateColumns');
    grid-auto-rows: v-bind('layoutStyle.gridAutoRows');
    gap: v-bind('layoutStyle.gap');
    height: v-bind('layoutStyle.height');
    overflow-x: hidden;
    touch-action: none;
    transition: width .2s ease, height .2s ease;
}

.dragingItem {
    width: 100%;
    height: 100%;
    background-color: #2c7ec2;
    grid-area: v-bind('dragingstyle.yStart') / v-bind('dragingstyle.xStart') / v-bind('dragingstyle.yEnd') / v-bind('dragingstyle.xEnd');
    z-index: 5;
}

.canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>