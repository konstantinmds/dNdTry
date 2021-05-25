/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

export interface Task {
  id: string
  cellName: string
  seqNumber: string
  fileName: string
}

export interface List {
  listId: string
  tasks: Task[]
}

export interface IAppState {
  draggedItem: DragItem | undefined
  dropDownItems: string[]
  lists: List[]
  sourceIngested: List | null
  selectedOption: any
}
