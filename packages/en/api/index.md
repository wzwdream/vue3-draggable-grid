# 🎁 Apis

## Parameter type

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
    data: Layout // Layout data
    col?: number | string, // columns
    rowH?: number | string // row height
    gutter?: number | string // gutter
    drage?: boolean // drage
    resize?: boolean // resize
    remove?: boolean // remove
    isDrawGridLines?: boolean // Whether to draw gridlines
    isCollision?: boolean // Collision or no collision
}
```

| Name            | Type             | Default| Description                                     |
| --------------- | ---------------- | ------ | ----------------------------------------------- |
| data            | `Layout`         | []     | 布局数据，支持双向绑定(v-model:data="layoutData") |
| col             | `number/string`  | 12     | 列数                                             |
| rowH            | `number/string`  | 50     | 行高                                             |
| gutter          | `number/string`  | 10     | 网格间距                                         |
| drage           | `boolean`        | true   | 是否可拖拽                                       |
| resize          | `boolean`        | true   | 是否可缩放                                       |
| remove          | `boolean`        | true   | 是否可删除                                       |
| isDrawGridLines | `boolean`        | true   | 是否绘制网格线                                   |
| isCollision     | `boolean`        | true   | 是否碰撞                                         |

### 🪢 Events

| Name            | Description                     | Type                                       |
| --------------- | --------------------------      | ------------------------------             |
| draggableStart  | Triggered when dragging starts  | (index: string) => void                    |
| draggableHandle | Triggered in Drag               | (id: string, newItem: LayoutItem) => void  |
| draggableEnd    | Triggered when dragging end     | (id: string, newItem: LayoutItem) => void  |
| remove          | Triggered by deleting a square  | (index: string) => void                    |

## GridItem

### Props

```ts
interface GridItem {
    id: string // unique identification
    draggableFrom?: string // Drag source, id of the element that triggered the drag
}
```

| Name           | Type      | Default | Description            |
| -------------- | -------- | ------ | --------------- |
| id             | `string` | ``     | unique identification |
| draggableFrom  | `string` | ``     | Drag source, id of the element that triggered the drag |

### 🎍 Slot

| Name    | Description                |
| ------- | ------------------  |
| default | Customize the content of each element |
| resize  | Custom Zoom          |
| remove  | Customized Deletion          |