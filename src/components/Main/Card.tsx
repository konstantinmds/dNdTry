/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useDrop } from 'react-dnd'
import { useAppState } from '../../AppStateContext'
import { DragItem } from '../../features/ddcomp/DragItem'
import { useItemDrag } from '../../features/ddcomp/useItemDrag'
import { Bit, CardContainer } from '../../styles'
import { isHidden } from '../../utils/isHidden'
import useContextMenu from '../../features/context/meniContext'

interface CardCellProps {
  cellName: string
  seqNumber: string
  fileName: string
  index: string
  id: string
  columnId: string
  isPreview?: boolean
  shouldHover?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card = ({
  cellName,
  seqNumber,
  fileName,
  index,
  id,
  columnId,
  isPreview,
  shouldHover,
}: CardCellProps) => {
  const { state, dispatch } = useAppState()
  const [isHoovered, setIsHoovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({
    type: 'CARD',
    cellName,
    seqNumber,
    fileName,
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

        const fileName2 = item.fileName

        const dragIndex = item.index
        const hoverIndex = index
        const sourceColumn = item.columnId
        const targetColumn = columnId

        dispatch({
          type: 'MOVE_TASK',
          payload: {
            dragIndex,
            hoverIndex,
            sourceColumn,
            targetColumn,
            fileName2,
          },
        })
        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex
        // eslint-disable-next-line no-param-reassign
        item.columnId = targetColumn
      }
     },
    drop(item: any) {
      const fileName2 = item.fileName

      const dragIndex = item.index
      const hoverIndex = index
      const sourceColumn = item.columnId
      const targetColumn = columnId

      dispatch({
        type: 'SAVE_TASK',
        payload: {
          dragIndex,
          hoverIndex,
          sourceColumn,
          targetColumn,
          fileName2,
        },
      })
    }
  })

  const deleteCard = () => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { columnId, id, index },
    })
  }

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(true, state.draggedItem, 'CARD', id)}
      isPreview={isPreview}
      ref={ref}
      id={id}
    >
      <>
        <Bit
          shouldHover={isHoovered}
          onMouseEnter={() => setIsHoovered(true)}
          onMouseLeave={() => setIsHoovered(false)}
        >
          <HighlightOffIcon
            onClick={() => {
              deleteCard()
            }}
          />
        </Bit>
        <b>File name</b> <br />
        <div style={{ flexShrink: 1 }}>
          {fileName && fileName.split(/\b(?![\s.])/).join('\n')}
        </div>
        <hr />
        <b>Cell name - </b> {cellName}
        <hr />
        {columnId.split(/.ipynb|.sql/).length === 1 ? (
          <b>Sequence Number - {seqNumber || '0'} </b>
        ) : (
          <p />
        )}
        <hr />
      </>
    </CardContainer>
  )
}

export default Card
