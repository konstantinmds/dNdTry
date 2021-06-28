/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useRef } from 'react'
import { BiAbacus } from 'react-icons/bi'
import { useDrop } from 'react-dnd'
import { useAppState } from '../../AppStateContext'
import { DragItem } from '../../features/ddcomp/DragItem'
import { useItemDrag } from '../../features/ddcomp/useItemDrag'
import {
  ColNameWrapper,
  ColumnContainer,
  ColumnTitle,
  Menu,
} from '../../styles'
import { isHidden } from '../../utils/isHidden'

import Card from './Card'
import ChangeSeq from '../Modal/Modal'
import { useBackdropContext } from '../../features/context/backdropContext'
import useContextMenu from '../../features/context/meniContext'

interface ColumnProps {
  listId: string
  index: number
  id: string
  // eslint-disable-next-line react/require-default-props
  isPreview?: boolean
}

export const Column = ({ listId, index, id, isPreview }: ColumnProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-console
  // console.log('kolona', { listId, index, id, isPreview })
  const { state, dispatch } = useAppState()
  const { isBackdroped, setIsBackdroped } = useBackdropContext()

  const ref = useRef<HTMLDivElement>(null)

  const { xPos, yPos, menu, card } = useContextMenu(ref)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover(item: DragItem) {
      if (item.type === 'COLUMN') {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        //        dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })

        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex
      } else {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceColumn = item.columnId
        const targetColumn = id
        /* const mongo = {} */

        /*         if (sourceColumn === targetColumn) {
          dispatch({
            type: 'REORDER_TASKS',
            payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
          })

          item.index = hoverIndex.toString()
          item.columnId = targetColumn
          return
        }
 */
        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        })

        item.index = hoverIndex.toString()
        item.columnId = targetColumn
      }
    },
  })

  const bart = () => {
    setIsBackdroped(!isBackdroped)
  }

  const filr = (): any => {
    const lista = state.lists.filter((obj) => obj.listId === listId)[0]
    const y = lista.listId.split(/.ipynb|.sql/)

    const matt =
      y.length === 1
        ? lista.tasks // eslint-disable-next-line radix
            .sort((a, b) => parseInt(a.seqNumber) - parseInt(b.seqNumber))
        : lista.tasks // eslint-disable-next-line radix
            .sort((a, b) => parseInt(a.seqNumber) - parseInt(b.seqNumber))
            .filter((t) => {
              if (state.lists[1]) {
                return !state.lists[1].tasks.find((r) => {
                  return r.cellName === t.cellName && r.fileName === t.fileName
                })
              }
              return state.lists[0].tasks
            })

    const yi = matt

    return yi
  }

  const { drag } = useItemDrag({ type: 'COLUMN', id, index, listId })

  drag(drop(ref))

  const bili = () => {
    const theTask = state.lists[state.lists.length - 1].tasks.find(
      (li) => li.taskId === card
    )
    if (theTask) {
      // eslint-disable-next-line radix
      theTask.seqNumber = (parseInt(theTask.seqNumber) + 10).toString()
    }
  }
  return (
    <>
      {menu && (
        <Menu
          style={{
            top: yPos,
            left: xPos,
            padding: '12px',
            marginBottom: '3px',
          }}
        >
          <li onClick={bili}>Add 10 to Sequence Number</li>
          <li>Remove 10 from Sequence Number </li>
        </Menu>
      )}

      {isBackdroped && (
        <ChangeSeq
          listId={state.lists[state.lists.length - 1].listId}
          tasks={state.lists[state.lists.length - 1].tasks}
        />
      )}
      <ColumnContainer
        isPreview={isPreview}
        ref={ref}
        isHidden={isHidden(true, state.draggedItem, 'COLUMN', id)}
      >
        <ColNameWrapper>
          <ColumnTitle>{listId}</ColumnTitle>
          <BiAbacus onClick={() => bart()} />
        </ColNameWrapper>
        {filr().map((task, i) => (
          <Card
            key={task.taskId || i}
            id={'Card# '.concat(task.taskId === undefined ? 'un' : '21' ) || 'Card# '.concat(i.toString())}
            columnId={id}
            fileName={task.fileName === undefined ? listId : task.fileName}
            seqNumber={task.seqNumber || '0'}
            cellName={task.cellName}
            index={i}
          />
        ))}
      </ColumnContainer>
    </>
  )
}

export default Column
