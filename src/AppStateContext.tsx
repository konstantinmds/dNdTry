/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TwoWheelerSharp } from '@material-ui/icons'
import { findIndex, last, uniqueId } from 'lodash'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { save } from './api'
import { DragItem } from './features/ddcomp/DragItem'
import { moveItem } from './features/ddcomp/moveItem'
import { DropDown, IAppState, List, Task } from './react-app-env'
import { findItemIndexById } from './utils/findItemIndexById'
import { withData } from './withData'

export const appData: IAppState = {
  lists: [
    {
      listId: 'Choosen Project',
      tasks: [],
    },
  ],
  dropDownItems: {} as any,
  draggedItem: undefined,
  selectedOption: null,
  default: {},
  sourceIngested: {} as any,
  backdropVal: false,
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
      type: 'ADD_INGESTED'
      payload: { text: List; taskId: string }
    }
  | {
      type: 'DELETE_TASK'
      payload: { columnId: string; taskId: string; index: string }
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
      type: 'ADD_FILE_FROM_SIDEBAR'
      payload: {
        file: List
      }
    }
  | {
      type: 'MOVE_TASK'
      payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
        fileName2: string
      }
    }
  | {
      type: 'SAVE_TASK'
      payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
        fileName2: string
      }
    }

const appStateReducer = (state: IAppState, action: Action): IAppState => {
  // console.log("u reduceru")

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
        lists: [...state.lists],
      }
    }
    case 'ADD_TASK': {
      return {
        ...state,
      }
    }
    case 'DELETE_TASK': {
      const { columnId, taskId, index } = action.payload
      const theIlist = state.lists.find((r: any) => r.listId === columnId)

      if (theIlist) {
        // eslint-disable-next-line radix
        const kemba = theIlist.tasks.splice(parseInt(index), 1)
      

      if (theIlist!.listId.split(/.ipynb|.sql/).length === 1) {
        console.log('kods')

      }
    }

      return {
        ...state,
      }
    }

    case 'ADD_FILE_FROM_SIDEBAR': {
      const { file } = action.payload

      // console.log("file za splitati",JSON.stringify(file))
      // console.log("stae list y",JSON.stringify(state))

      const name = last(file.listId.split('\\')) || ''
      const n = last(state.lists[0].listId.split('.'))

      console.log('jel', n)
      if (n === 'ipynb' || n === 'sql') {
        if (state.lists[0].listId === name) {
          const st0 = state.default.sourceIngested.filter(
            (r) => r.fileName === file.listId
          )

          // console.log("st obje",JSON.stringify(st0))

          Object.assign(state.lists[0].tasks, st0[0].tasks)
          return {
            ...state,
          }
        }

        Object.assign(state.lists[0], { listId: name, tasks: file.tasks })

        /* 
        console.log("else st",JSON.stringify(file))
        
        Object.assign([], state.lists, {
          0: { listId: name, tasks: file.tasks }
        })

        console.log("posle", JSON.stringify(state))
        
        */

        return {
          ...state,
        }
      }

      return {
        ...state,
        lists: [{ listId: name, tasks: file.tasks }, ...state.lists],
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
        taskId: uniqueId(),
      })

      return {
        ...state,
      }
    }
    case 'CHANGE_PROJECT': {
      const { text, taskId } = action.payload

      /* 
      on wrong
      {"lists":[{"pName":"Log Clean-up","tasks":[{"listid":"23","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"elt framework log delete","seqNumber":"210"},{"listid":"24","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"eltsnap log delete","seqNumber":"210"}]},{"listid":"Log Clean-up","tasks":[{"listid":"23","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"elt framework log delete","seqNumber":"210"},{"listid":"24","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"eltsnap log delete","seqNumber":"210"}]}],"dropDownItems":[{"value":"Ingest Notebooks","label":"Ingest Notebooks"},{"value":"Log Clean-up","label":"Log Clean-up"},{"value":"Metadata Refresh v2","label":"Metadata Refresh v2"}]} 
      
      on good
      {"lists":[{"pName":"Ingest Notebooks","tasks":[{"listid":"37","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Merge Staged Files","seqNumber":"300"},{"listid":"38","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Notebook Contents","seqNumber":"400"},{"listid":"39","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Reset staging table","seqNumber":"100"},{"listid":"40","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Stage Files in Database","seqNumber":"200"}]},{"pName":"Log Clean-up","tasks":[{"listid":"41","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"elt framework log delete","seqNumber":"210"},{"listid":"42","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"eltsnap log delete","seqNumber":"210"}]},{"pName":"Metadata Refresh v2","tasks":[{"listid":"43","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"dim delete - dbo - dim_column","seqNumber":"510"},{"listid":"44","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"dim delete - dbo - dim_table","seqNumber":"510"},{"listid":"45","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Insert Metadata Server Name","seqNumber":"110"},{"listid":"46","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to dbo schema - dim_column","seqNumber":"420"},{"listid":"47","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to dbo schema - dim_table","seqNumber":"420"},{"listid":"48","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_column","seqNumber":"410"},{"listid":"49","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_database","seqNumber":"220"},{"listid":"50","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_table","seqNumber":"410"},{"listid":"51","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Refresh Database Names","seqNumber":"210"},{"listid":"52","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"src to stg - SQL Server columns","seqNumber":"310"},{"listid":"53","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"src to stg - SQL Server tables","seqNumber":"310"},{"listid":"54","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Truncate STG tables","seqNumber":"140"}]}],"dropDownItems":[{"value":"Ingest Notebooks","label":"Ingest Notebooks"},{"value":"Log Clean-up","label":"Log Clean-up"},{"value":"Metadata Refresh v2","label":"Metadata Refresh v2"}]}
      */

      let res = ['0', ([] as unknown) as List]
      if (state.lists) {
        res = Object.entries((state as any).default.lists)
          .map((ind) => ind[1])
          .filter((two) => (two as any).listId === text) as any
        console.log('kao res', JSON.stringify(res))
      }

      const listsSon = {
        listId: (res[0] as any).listId,
        tasks: (res[0] as List).tasks,
      } as List

      console.log('lists son', JSON.stringify(listsSon))

      /*       {"listid":"Log Clean-up","tasks":[{"listid":"5","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"elt framework log delete","seqNumber":"210"},{"listid":"6","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"eltsnap log delete","seqNumber":"210"}]} */

      /* console.log("gireo",JSON.stringify(state.lists))
{"pName":"Ingest Notebooks","tasks":[{"listid":"1","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Merge Staged Files","seqNumber":"300"},{"listid":"2","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Notebook Contents","seqNumber":"400"},{"listid":"3","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Reset staging table","seqNumber":"100"},{"listid":"4","fileName":"notebook_snap_basics\\content\\ingest_notebook_files.ipynb","cellName":"Ingest files - Stage Files in Database","seqNumber":"200"}]},{"pName":"Log Clean-up","tasks":[{"listid":"5","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"elt framework log delete","seqNumber":"210"},{"listid":"6","fileName":"notebook_snap_basics\\content\\database_log_cleanup.ipynb","cellName":"eltsnap log delete","seqNumber":"210"}]},{"pName":"Metadata Refresh v2","tasks":[{"listid":"7","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"dim delete - dbo - dim_column","seqNumber":"510"},{"listid":"8","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"dim delete - dbo - dim_table","seqNumber":"510"},{"listid":"9","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Insert Metadata Server Name","seqNumber":"110"},{"listid":"10","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to dbo schema - dim_column","seqNumber":"420"},{"listid":"11","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to dbo schema - dim_table","seqNumber":"420"},{"listid":"12","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_column","seqNumber":"410"},{"listid":"13","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_database","seqNumber":"220"},{"listid":"14","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Merge stg to meta schema - dim_table","seqNumber":"410"},{"listid":"15","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Refresh Database Names","seqNumber":"210"},{"listid":"16","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"src to stg - SQL Server columns","seqNumber":"310"},{"listid":"17","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"src to stg - SQL Server tables","seqNumber":"310"},{"listid":"18","fileName":"notebook_snap_basics\\content\\metadata_refresh_for_sql_server.ipynb","cellName":"Truncate STG tables","seqNumber":"140"}]}]
 */

      const mongo = state.lists.filter((m) => m.listId.includes('Choosen File'))

      // const mongo = state.lists.filter((m) => (m as any).pName.includes(listsSon.listid))
      // console.log("fdasji", JSON.stringify(mongo))

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
      const res = Object.entries((state as any).default).map((ind) => ind[1])
      const memic = text.tasks

      return {
        ...state,
        lists: [...state.lists, { listId: taskId as string, tasks: memic }],
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
    case 'SAVE_TASK': {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn,
        fileName2,
      } = action.payload

      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn)

      // console.log("drag", dragIndex);
      // console.log("hover", hoverIndex);

      //      if (state.lists[targetLaneIndex].tasks.filter(ts => ts.fileName === state.lists[sourceLaneIndex].tasks[dragIndex].fileName && ts.cellName === state.lists[sourceLaneIndex].tasks[dragIndex].cellName).length === 0) {
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]

      item.fileName = fileName2

      console.log('kolotko', JSON.stringify(item))

      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)

      const ind = findIndex(state.lists[targetLaneIndex].tasks, {
        cellName: item.cellName,
      })

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
        fileName2,
      } = action.payload

      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn)

      // console.log("drag", dragIndex);
      // console.log("hover", hoverIndex);

      //      if (state.lists[targetLaneIndex].tasks.filter(ts => ts.fileName === state.lists[sourceLaneIndex].tasks[dragIndex].fileName && ts.cellName === state.lists[sourceLaneIndex].tasks[dragIndex].cellName).length === 0) {
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]

      item.fileName = fileName2

      console.log('itms', JSON.stringify(item))

      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)

      const ind = findIndex(state.lists[targetLaneIndex].tasks, {
        cellName: item.cellName,
      })

      item.seqNumber = ''
      if (targetLaneIndex > 0) {
        if (
          ind > 0 &&
          state.lists[targetLaneIndex].tasks[ind + 1] !== undefined
        ) {
          item.seqNumber = Math.round(
            (parseInt(state.lists[targetLaneIndex].tasks[ind - 1].seqNumber) +
              parseInt(state.lists[targetLaneIndex].tasks[ind + 1].seqNumber)) /
              2
          ).toString()
        } else {
          state.lists[targetLaneIndex].tasks[ind + 1] === undefined
            ? (item.seqNumber = (
                parseInt(state.lists[targetLaneIndex].tasks[ind].seqNumber) + 10
              ).toString())
            : (item.seqNumber = (
                parseInt(state.lists[targetLaneIndex].tasks[ind].seqNumber) + 10
              ).toString())
        }

        // eslint-disable-next-line no-restricted-globals
        isNaN(parseInt(item.seqNumber)) ? (item.seqNumber = '0') : ''
      }

      console.log(state.lists[targetLaneIndex])

      //  console.log("nauok", JSON.stringify(item))

      // console.log("sre", JSON.stringify(state))
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
