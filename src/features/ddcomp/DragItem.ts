export type ColumnDragItem = {
  index: number
  id: string
  listId: string
  type: 'COLUMN'
}

export type CardDragItem = {
  cellName: string
  fileName: string
  seqNumber: string
  index: number
  id: string
  columnId: string
  type: 'CARD'
}

export type DragItem = ColumnDragItem | CardDragItem
