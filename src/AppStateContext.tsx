/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TwoWheelerSharp } from '@material-ui/icons'
import { uniqueId } from 'lodash'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { save } from './api'
import { DragItem } from './features/ddcomp/DragItem'
import { moveItem } from './features/ddcomp/moveItem'
import { IAppState, List, Task } from './react-app-env'
import { findItemIndexById } from './utils/findItemIndexById'
import { withData } from './withData'

export const appData: IAppState = {
  lists: [
    {
      listId: 'Choosen Project',
      tasks: [],
    },
  ],
  dropDownItems: [],
  sourceIngested: null,
  draggedItem: undefined,
  selectedOption: null,
  /*     {
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
 */
  /*   lists: [
    {
      listid: 'Car Crash Setup',
      tasks: [
        {
          id: '15',
          fileName:
            'notebook_snap_basics\\content\\database_log_cleanup_project.ipynb',
          cellName: 'elt framework log delete',
          seqNumber: '432',
        },
        {
          id: '16',
          fileName: 'notebook_snap_basics\\content\\database_log_cleanup.ipynb',
          cellName: 'eltsnap log delete',
          seqNumber: '322',
        },
      ],
    }
 */
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
      type: 'CHANGE_PROJECT'
      payload: { text: string; taskId: string }
    }
  | {
      type: 'DELETE_TASK'
      payload: { columnId: string; taskId: string; index: string }
    }
  | {
      type: 'ADD_INGESTED'
      payload: { text: List; taskId: string }
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
      type: 'ADD_CELL_FROM_SIDEBAR'
      payload: {
        cell_name: string
        file_name: string
      }
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

const appStateReducer = (state: IAppState, action: Action): IAppState => {
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
          // { id: uuid() as string, tasks: [], text: action.payload },
        ],
      }
    }
    case 'ADD_TASK': {
      // logic

      return {
        ...state,
      }
    }
    case 'ADD_CELL_FROM_SIDEBAR': {
      const { cell_name, file_name } = action.payload
      if (!state.selectedOption || state.selectedOption.value === '') {
        return {
          ...state,
        }
      }

      const fit = state.lists[0].tasks.push({
        cellName: cell_name,
        fileName: file_name,
        seqNumber: '0',
        id: uniqueId(),
      })

      return {
        ...state,
      }
    }
    case 'DELETE_TASK': {
      const { columnId, taskId, index } = action.payload
      const theIlist = state.lists.find((r: any) => r.listId === columnId)

      if (theIlist) {
        // eslint-disable-next-line radix
        theIlist.tasks.splice(parseInt(index), 1)
      }
      return {
        ...state,
      }
    }
    case 'CHANGE_PROJECT': {
      const { text, taskId } = action.payload

      /*       
        orig bilo-->> sada mijenjamo prema 
      const res = Object.entries((state as any).default)
        .map((ind) => ind[1])
        .filter((two: any) => two.pName === text)
 */
      const res = Object.entries((state as any).default.lists)
        .map((ind) => ind[1])
        .filter((two: any) => two.listId === text)

      const listsSon = {
        listId: (res[0] as any).listId,
        tasks: (res[0] as List).tasks,
      } as List

      const mongo = state.lists?.filter((m) =>
        (m as any).listId.includes('Code Cells')
      )
      if (mongo && mongo.length > 0) {
        return {
          ...state,

          lists: [...mongo, listsSon],
        }
      }

      return {
        ...state,

        lists: [listsSon],
      }
    }
    case 'ADD_INGESTED': {
      const { text, taskId } = action.payload
      /*      const res = Object.entries((state as any).default).map((ind) => ind[1]) */
      const memic = text.tasks

      return {
        ...state,
        sourceIngested: { listId: taskId, tasks: memic } as List,
        lists: [{ listId: taskId as string, tasks: memic }, ...state.lists],
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

      /*       //const mongo = state.lists?.filter((m) => m.listid.includes('Code Cells'))
      //const clonedMongo = JSON.parse(JSON.stringify(mongo))
 */
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

interface AppStateContextProps {
  state: IAppState
  dispatch: any
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)
export const AppStateProvider = withData(
  ({
    children,
    initialState,
  }: React.PropsWithChildren<{ initialState: IAppState }>) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState)

    return (
      <AppStateContext.Provider value={{ state, dispatch }}>
        {children}
      </AppStateContext.Provider>
    )
  }
)

export const useAppState = () => {
  return useContext(AppStateContext)
}
