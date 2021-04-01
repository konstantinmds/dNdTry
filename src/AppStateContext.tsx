import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { DragItem } from './features/ddcomp/DragItem'
import { moveItem } from './features/ddcomp/moveItem'
import { findItemIndexById } from './utils/findItemIndexById'

interface Task {
  id: string
  cellName: string
  seqNumber: string
  projectName: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  draggedItem: DragItem | undefined
  lists: List[]
}

export const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'Active Project',
      tasks: [
        {
          id: uuid(),
          projectName: 'projName',
          seqNumber: '1',
          cellName: 'cellName',
        },
      ],
    },
    {
      id: '1',
      text: 'Choosen Project',
      tasks: [
        {
          id: uuid(),
          projectName: 'projName1',
          seqNumber: '12',
          cellName: 'cellName2',
        },
        {
          id: uuid(),
          projectName: 'projName2',
          seqNumber: '14',
          cellName: 'cellName3',
        },
      ],
    },
  ],
  draggedItem: undefined,
}

type Action =
  | {
      type: 'ADD_LIST'
      payload: string
    }
  | {
      type: 'ADD_TASK'
      payload: { text: string; taskId: string }
    }
  | {
      type: 'MOVE_LIST'
      payload: {
        dragIndex: number
        hoverIndex: number
      }
    }
  | {
      type: 'SET_DRAGGED_ITEM'
      payload: DragItem | undefined
    }
  | {
      type: 'MOVE_TASK'
      payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
      }
    }

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {

    case 'SET_DRAGGED_ITEM': {
      return {
        ...state,
        draggedItem: action.payload,
      }
    }
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuid() as string, tasks: [], text: action.payload },
        ],
      }
    }
    case 'ADD_TASK': {
      // logic

      return {
        ...state,
      }
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      // eslint-disable-next-line no-param-reassign
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return {
        ...state,
      }
    }
    case 'MOVE_TASK': {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn,
      } = action.payload
      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn)

      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
      return { ...state }
    }
    default: {
      return state
    }
  }
}

interface AppStateContextProps {
  state: AppState
  dispatch: any
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
