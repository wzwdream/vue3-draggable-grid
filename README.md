# 🎄 vue3-draggable-grid

一个基于vue3+grid布局的网格拖拽布局，支持网格吸附、碰撞检测等。

![NPM](https://img.shields.io/npm/l/vue3-draggable-grid)
![npm bundle size (version)](https://img.shields.io/bundlephobia/min/vue3-draggable-grid/0.0.4)
![npm](https://img.shields.io/npm/v/vue3-draggable-grid)
![npm](https://img.shields.io/npm/dt/vue3-draggable-grid)



[演示文档](https://wzwdream.github.io/vue3-draggable-grid/)

## ⭐️ 功能一览

-   可拖拽
-   可调整大小
-   网格吸附
-   碰撞检测
-   兼容移动端（采用 `pointer` 事件编写，兼容移动端）

## 📦 安装

```shell
# 选择一个你喜欢的包管理器

# Npm
npm install vue3-draggable-grid --save

# Yarn
yarn add vue3-draggable-grid -D

# Pnpm
pnpm add vue3-draggable-grid -D

```

## 全量引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Vue3DraggableGrid from 'vue3-draggable-grid'
import "vue3-draggable-grid-drop/dist/style.css"
createApp(App).use(Vue3DraggableGrid).mount('#app')
```

## 按需引入

```ts
// 组件中
import { GridLayout, GridItem } from 'vue3-draggable-grid'
import 'vue3-draggable-grid/dist/style.css'
```

## 组件中使用

```ts
<template>
  <div class="layout-box">
      <grid-layout
          v-model:data="layout"
          @draggableStart="draggableStart"
          @draggableHandle="draggableHandle"
          @draggableEnd="draggableEnd"
          @remove="remove"
      >
        <grid-item v-for="item in layout" :key="item.id" :id="item.id">
            {{ item.id }}
        </grid-item>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">
import { GridLayout, GridItem, type Layout, type LayoutItem } from 'vue3-draggable-grid'
import 'vue3-draggable-grid/dist/style.css'
import { ref, watch } from 'vue'

const layout = ref<Layout>([
  { id: '1', x: 1, y: 1, h: 1, w: 1 },
  { id: '2', x: 2, y: 1, h: 1, w: 1 },
  { id: '3', x: 3, y: 1, h: 1, w: 1 },
  { id: '4', x: 4, y: 1, h: 1, w: 1 },
  { id: '5', x: 1, y: 2, h: 1, w: 1 },
  { id: '6', x: 1, y: 3, h: 1, w: 1 },
  { id: '7', x: 1, y: 4, h: 1, w: 1 },
  { id: '8', x: 1, y: 5, h: 4, w: 1 },
  { id: '9', x: 2, y: 2, h: 1, w: 1 },
  { id: '10', x: 2, y: 3, h: 1, w: 1 },
  { id: '11', x: 2, y: 4, h: 1, w: 1 },
  { id: '12', x: 5, y: 5, h: 1, w: 2 },
])

// 验证更新数据是否正确
watch(layout, () => {
  console.log('数据更新', layout.value)
}, {deep: true})

const draggableStart = (id: string) => {
  console.log('拖拽开始', id)
}

const draggableHandle = (id: string, data: LayoutItem) => {
  console.log('拖拽中', id, data)
}

const draggableEnd = (data: Layout) => {
  console.log('拖拽结束', data)
}

const remove = (id: string) => {
  console.log('删除', id)
}

</script>
<style>

.layout-box {
  width: 1000px;
}

</style>

```

>  **这里需要注意的一点是，在组件的外层或者组件本身需要指定宽度，不然宽度会计算为0**

# 🎁 Apis

## 参数类型

```ts
interface LayoutItem {
    id: string
    x: number
    y: number
    h: number
    w: number
    static?: boolean
}

type Layout = LayoutItem[]
```

## GridLayout

### Props

```ts
interface PropsData {
    data: Layout // 布局数据
    col?: number | string, // 列数
    rowH?: number | string // 行高
    gutter?: number | string // 网格间距
    drage?: boolean // 是否可拖拽
    resize?: boolean // 是否可拖拽
    remove?: boolean // 是否可拖拽
    isDrawGridLines?: boolean // 是否绘制网格线
    isCollision?: boolean // 是否碰撞
}
```

| 属性            | 类型              | 默认值 | 说明                                            |
| --------------- | ---------------- | ------ | ----------------------------------------------- |
| data            | `Layout`         | []   | 布局数据，支持双向绑定(v-model:data="layoutData") |
| col             | `number/string`  | 12     | 列数                                            |
| rowH            | `number/string`  | 50     | 行高                                            |
| gutter          | `number/string`  | 10     | 网格间距                                        |
| drage           | `boolean`        | true   | 是否可拖拽                                      |
| resize          | `boolean`        | true   | 是否可缩放                                      |
| remove          | `boolean`        | true   | 是否可删除                                      |
| isDrawGridLines | `boolean`        | true   | 是否绘制网格线                                  |
| isCollision     | `boolean`        | true   | 是否碰撞                                        |

### 🪢 事件

| 事件名          | 说明           | 类型                                       |
| --------------- | ------------- | ------------------------------             |
| draggableStart  | 拖拽开始时触发 | (index: string) => void                    |
| draggableHandle | 拖拽中触发     | (id: string, newItem: LayoutItem) => void  |
| draggableEnd    | 拖拽结束时触发 | (id: string, newItem: LayoutItem) => void  |
| remove          | 删除方块时触发 | (index: string) => void                    |

## GridItem

### Props

```ts
interface GridItem {
    id: string // 唯一标识
    draggableFrom?: string // 拖拽源，触发拖拽的元素id
}
```

| 名称           | 类型      | 默认值 | 说明            |
| -------------- | -------- | ------ | --------------- |
| id             | `string` | ``     | 子元素的唯一标识 |
| draggableFrom  | `string` | ``     | 触发拖拽的元素id |

### 🎍 插槽

| 名称    | 说明                |
| ------- | ------------------  |
| default | 自定义每个元素的内容 |
| resize  | 自定义缩放          |
| remove  | 自定义删除          |
