# 🎄 vue3-grid-layout

A grid drag-and-drop layout based on vue3+grid layout with support for grid adsorption, collision detection and more.


## ⭐️ Functions at a glance

- Drag and drop
- Resizable
- Mesh Attachment
- Collision detection
- Mobile compatible (written with `pointer` event for mobile compatibility)

## 📦 Installation

```shell
# Choose a package manager you like.

# Npm
npm install vue3-draggable-grid --save

# Yarn
yarn add vue3-draggable-grid -D

# Pnpm
pnpm add vue3-draggable-grid -D
```

## Full Import

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Vue3DraggableGrid from 'vue3-draggable-grid'
import "vue3-draggable-grid-drop/dist/style.css"
createApp(App).use(Vue3DraggableGrid).mount('#app')
```

## On-demand Import
```ts
// components
import { GridLayout, GridItem } from 'vue3-draggable-grid'
import 'vue3-draggable-grid/dist/style.css'
```

## Component Using
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
import { ref, watch } from 'vue';

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

// Verify that the updated data is correct
watch(layout, () => {
  console.log('Data Updates', layout.value)
}, {deep: true})

const draggableStart = (id: string) => {
  console.log('Drag start', id)
}

const draggableHandle = (id: string, data: LayoutItem) => {
  console.log('Draging', id, data)
}

const draggableEnd = (data: Layout) => {
  console.log('Drag end', data)
}

const remove = (id: string) => {
  console.log('delete', id)
}

</script>

<style>

.layout-box {
  width: 1000px;
}

</style>
```

>  **这里需要注意的一点是，在组件的外层或者组件本身需要指定宽度，不然宽度会计算为0**
