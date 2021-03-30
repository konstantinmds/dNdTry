/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useAppState } from '../../AppStateContext'
import { CardDragItem, DragItem } from '../../features/ddcomp/DragItem'
import { useItemDrag } from '../../features/ddcomp/useItemDrag'
import { CardContainer } from '../../styles'
import { isHidden } from '../../utils/isHidden'

interface CardCellProps {
  cellName: string
  seqNumber: string
  projectName: string
  index: number
  id: string
  columnId: string
  isPreview?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card = ({
  cellName,
  seqNumber,
  projectName,
  index,
  id,
  columnId,
  isPreview,
}: CardCellProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({
    type: 'CARD',
    cellName,
    seqNumber,
    projectName,
    index,
    id,
    columnId,
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: DragItem) {
      if (item.type === 'CARD') {
        if (item.id === id) {
          return
        }

        const dragIndex = item.index
        const hoverIndex = index
        const sourceColumn = item.columnId
        const targetColumn = columnId

        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        })
        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex
        // eslint-disable-next-line no-param-reassign
        item.columnId = targetColumn
      }
    },
  })

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(isPreview, state.draggedItem, 'CARD', id)}
      isPreview={isPreview}
      ref={ref}
    >
      <b>Project name</b> <br />
      {projectName}
      <hr />
      <b>Cell name</b> <br />
      {cellName}
      <hr />
      <b>Sequence Number</b> <br />
      {seqNumber}
      <hr />
    </CardContainer>
  )
}

export default Card