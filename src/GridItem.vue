<template>
    <div class="grid-item-box" :class="{'grid-draging': isDraging && handleType === 'drag'}" ref="gridItemRef">
        <div :class="{'grid-item': true, 'static-item': itemLayout.static || props.draggableFrom, 'grid-resizing': isDraging && handleType === 'resize',}">
            <slot />
            <div v-show="resize && !itemLayout.static" @pointerdown.stop="(e: PointerEvent) => draggableStart(e, 'resize')">
                <slot name="resize">
                    <div class="grid-item-resize"></div>
                </slot>
            </div>
            <!-- 这里绑定pointerdown事件主要是为了防止鼠标按下事件的扩散，从而触发到父元素的拖拽事件 -->
            <div v-show="remove && !itemLayout.static" @pointerdown.stop="draggableStart" @click.stop="removes(props.id)">
                <slot name="remove">
                    <div class="grid-item-remove">X</div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HandleType, Parameter } from './types'
import { key } from './help/key'
import { findIndexById } from './help/utils'
import { computed, inject, reactive, ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{ id: string, draggableFrom?: string }>(), {
    id: '',
    draggableFrom: ''
})

/**
 * 注入参数
 */
const {layoutdata, rowH, gutter, colWidth, drage, resize, remove, draggableStart: handleStart, draggableHandle: handle, draggableEnd: handleEnd, removes} = inject(key) as Parameter

/**
 * 计算当前item的样式
 */
const itemLayout = computed(() => {
    const { data } = findIndexById(layoutdata.value, props.id)
    const { x, y, w, h, static: isStatic } = data
    const xEnd = x + w
    const yEnd = y + h
    const width = `${(w - 1) * gutter.value + w * colWidth.value}px`
    const height = `${(h - 1) * gutter.value + h * rowH.value}px`
    return { xStart: x, yStart: y, xEnd, yEnd, width, height, data, static: Boolean(isStatic) }
})

/**
 * 拖拽初始值
 */
const gridItemRef = ref<HTMLElement | null>(null)
const offsetX = ref(0), offsetY = ref(0), isDraging = ref(false)
const handleType = ref<HandleType>()

onMounted(() => {
    // 这里可以动态选择使用哪一个元素去进行拖拽，如果是静态元素则不绑定
    if (itemLayout.value.static || !drage.value) return
    if ((props.draggableFrom ?? '') === '') {
        gridItemRef.value?.addEventListener('pointerdown', (event) => {
            draggableStart(event, 'drag')
        })
    } else {
        const fromElement = document.getElementById(props.draggableFrom)
        if (fromElement) {
            fromElement.style.cursor ='move'
            fromElement.addEventListener('pointerdown', (event)  => {
                draggableStart(event, 'drag')
            })
        }
    }
})


/**
 * 拖拽/缩放的样式
 */
 const style = reactive({
    width: '0px',
    height: '0px',
    transform: 'translate3d(0, 0, 0)'
})

/**
 * 开始拖拽，记录初始位置、操作类型、并绑定后续事件
 * @param e 鼠标/触摸事件event
 * @param type 操作类型：drag-拖拽、resize-缩放
 */
const draggableStart = (e: PointerEvent, type?: HandleType) => {
    if (itemLayout.value.data.static) return
    if (!drage || !type) return
    handleType.value = type
    offsetX.value = e.clientX
    offsetY.value = e.clientY
    window.addEventListener("pointermove", draggableHandle)
    window.addEventListener("pointerup", draggableEnd)
    isDraging.value = true
    handleStart(props.id)
}

/**
 * 拖拽中，计算移动距离，动态更改拖拽/缩放的样式
 * @param e 鼠标/触摸事件event
 */
const draggableHandle = (e: PointerEvent) => {
    const { clientX, clientY } = e
    const shiftX = clientX - offsetX.value
    const shiftY = clientY - offsetY.value

    if (handleType.value === 'drag') {
        style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`
    }

    if (handleType.value === 'resize' && layoutdata) {
        const { width, height } = itemLayout.value
        const newWidth = Math.max(parseInt(width) + shiftX, colWidth.value)
        const newHeight = Math.max(parseInt(height) + shiftY, rowH.value)
        style.width = `${newWidth}px`
        style.height = `${newHeight}px`
    }
    handle(shiftX, shiftY, handleType.value)
}

/**
 * 拖拽结束，解绑事件
 */
const draggableEnd = () => {
    // 防止第二次拖拽开始的时候位置错乱
    if (handleType.value === 'drag') {
        style.transform = `translate3d(0, 0, 0)`
    }
    if (handleType.value === 'resize' && layoutdata) {
        const { width, height } = itemLayout.value
        style.width = `${parseInt(width)}px`
        style.height = `${parseInt(height)}px`
    }
    window.removeEventListener("pointermove", draggableHandle)
    window.removeEventListener("pointerup", draggableEnd)
    handleEnd()
    isDraging.value = false
}

</script>

<style scoped>
.grid-item-box {
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: v-bind('itemLayout.yStart') / v-bind('itemLayout.xStart') / v-bind('itemLayout.yEnd') / v-bind('itemLayout.xEnd');
}

.grid-item {
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind('itemLayout.width');
    height: v-bind('itemLayout.height');
    cursor: move;
    user-select: none;
    overflow: hidden;
    background-color: #ccc;
    z-index: 1;
}

.static-item {
    cursor: default;
}

.grid-item-resize {
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: 2px;
    border-bottom: 2px solid #686565;
    border-right: 2px solid #686565;
    border-bottom-right-radius: 2px;
    cursor: nw-resize;
}

.grid-item-remove {
    position: absolute;
    width: 10px;
    height: 10px;
    right: 2px;
    top: -2px;
    color: #686565;
    cursor: pointer;
}

.grid-resizing {
    width: v-bind('style.width');
    height: v-bind('style.height');
    opacity: 0.6;
    z-index: 99;
}

.grid-draging {
    z-index: 99;
    transform: v-bind('style.transform');
}
</style>