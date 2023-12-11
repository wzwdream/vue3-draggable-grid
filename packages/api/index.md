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