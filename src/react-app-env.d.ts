/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />

export interface Task {
  taskId: string
  cellName: string
  seqNumber: string
  fileName: string
}

export interface List {
  listId: string
  tasks: Task[]
}

export interface DropDown {
  inPc: OptionsType[]
  outPc: OptionsType[]
}

export interface IAppState {
  default: any
  draggedItem: DragItem | undefined
  dropDownItems: DropDown
  lists: List[]
  sourceIngested: List | null
  selectedOption: any
  backdropVal: boolean
}
