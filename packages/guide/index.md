# 🎄 vue3-draggable-grid

一个基于vue3+grid布局的网格拖拽布局，支持网格吸附、碰撞检测等。


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
