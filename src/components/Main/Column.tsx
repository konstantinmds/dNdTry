/* eslint-disable no-param-reassign */
import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useAppState } from '../../AppStateContext'
import { DragItem } from '../../features/ddcomp/DragItem'
import { useItemDrag } from '../../features/ddcomp/useItemDrag'
import { ColumnContainer, ColumnTitle } from '../../styles'
import { isHidden } from '../../utils/isHidden'
import Card from './Card'

interface ColumnProps {
  text: string
  index: number
  id: string
  // eslint-disable-next-line react/require-default-props
  isPreview?: boolean
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-console
  console.log('kolona', { text, index, id, isPreview })
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

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

        if (sourceColumn === targetColumn) {
          return
        }

        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        })

        item.index = hoverIndex
        item.columnId = targetColumn
      }
    },
  })

  const { drag } = useItemDrag({ type: 'COLUMN', id, index, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, 'Column', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          key={task.projectName}
          id={task.id}
          columnId={id}
          projectName={task.projectName}
          seqNumber={task.seqNumber}
          cellName={task.cellName}
          index={i}
          // eslint-disable-next-line react/no-array-index-key
        />
      ))}
    </ColumnContainer>
  )
}

export default Column
