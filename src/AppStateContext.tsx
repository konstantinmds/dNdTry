/* eslint-disable @typescript-eslint/no-unused-vars */
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
      listid: 'Choosen Project',
      tasks: [],
    },
  ],
  dropDownItems: [],
  draggedItem: undefined /*     {
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
 */,
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
    case 'CHANGE_PROJECT': {
      const { text, taskId } = action.payload
      const kosta = text
      const res = Object.entries((state as any).default)
        .map((ind) => ind[1])
        .filter((two: any) => two.pName === text)

      const listsSon = res[0] as List
      return {
        ...state,

        lists: [
          {
            listid: listsSon.listid,
            tasks: listsSon.tasks,
          },
        ],
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

    useEffect(() => {
      save(state)
    }, [state])

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
