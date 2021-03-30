export type ColumnDragItem = {
  index: number
  id: string
  text: string
  type: 'COLUMN'
}

export type CardDragItem = {
  cellName
  seqNumber
  projectName
  index: number
  id: string
  columnId: string
  type: 'CARD'
}

export type DragItem = ColumnDragItem | CardDragItem
