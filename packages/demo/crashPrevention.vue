<script setup lang="ts">
import { ref, watch } from 'vue';
import { GridLayout, GridItem } from '../../src/index'
import 'vue3-draggable-grid/dist/style.css'

const layout = ref([
  { "id": "1", "x": 1, "y": 1, "h": 2, "w": 2 },
  { "id": "2", "x": 5, "y": 1, "h": 2, "w": 2 },
  { "id": "3", "x": 7, "y": 1, "h": 2, "w": 2 },
  { "id": "4-static", "x": 3, "y": 1, "h": 2, "w": 2, "static": true },
  { "id": "5", "x": 9, "y": 1, "h": 2, "w": 2 },
  { "id": "6", "x": 11, "y": 1, "h": 2, "w": 2 },
  { "id": "7", "x": 1, "y": 3, "h": 2, "w": 2 },
  { "id": "8", "x": 3, "y": 3, "h": 3, "w": 2, static: true },
  { "id": "9", "x": 5, "y": 3, "h": 2, "w": 2 },
  { "id": "10", "x": 7, "y": 3, "h": 3, "w": 2 },
  { "id": "11", "x": 9, "y": 3, "h": 2, "w": 2 },
  { "id": "12", "x": 11, "y": 3, "h": 4, "w": 2 },
  { "id": "13", "x": 1, "y": 5, "h": 3, "w": 2 },
  { "id": "14", "x": 3, "y": 6, "h": 2, "w": 2 },
  { "id": "15", "x": 5, "y": 5, "h": 2, "w": 2 },
  { "id": "16", "x": 7, "y": 6, "h": 2, "w": 2 },
  { "id": "17", "x": 9, "y": 5, "h": 2, "w": 2 }
])
</script>

<template>
  <grid-layout v-model:data="layout" :isCollision="false">
    <grid-item v-for="item in layout" :key="item.id" :id="item.id">
      {{ item.id }}
    </grid-item>
  </grid-layout>
</template>

