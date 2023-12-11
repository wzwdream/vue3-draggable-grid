<script setup lang="ts">
import { ref } from 'vue'
import { GridLayout, GridItem } from '../../src/index'
import 'vue3-draggable-grid/dist/style.css'

const layout = ref([
  { "id": "1", "x": 1, "y": 1, "h": 2, "w": 2 },
  { "id": "2", "x": 3, "y": 1, "h": 2, "w": 2 },
  { "id": "3", "x": 5, "y": 1, "h": 2, "w": 2 },
  { "id": "4", "x": 7, "y": 1, "h": 2, "w": 2 },
])

const addItem = () => {
  layout.value.push({
    id: String(layout.value.length + 1),
    x: 1,
    y: 1,
    h: 2,
    w: 2
  })
}
</script>

<template>
  <div class="dataBox">
    <span v-for="item in layout" :key="item.id" class="item">
      {{ `${item.id}: \{x:${item.x}, y:${item.y}, w:${item.w}, h:${item.h}\}` }}
    </span>
  </div>
  <button class="addBtn" @click="addItem">AddItem</button>
  <grid-layout v-model:data="layout">
    <grid-item v-for="item in layout" :key="item.id" :id="item.id">
      {{ item.id }}
    </grid-item>
  </grid-layout>
</template>

<style scoped>
.dataBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
}
.item {
  margin: 0 10px;
}
.addBtn {
  padding: 5px;
  background: #54cece;
  border-radius: 3px;
  margin: 10px 0;
}
</style>