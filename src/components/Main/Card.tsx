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

interface CardCellProps {
  cellName: string
  seqNumber: string
  fileName: string
  index: number
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

        const dragIndex = item.index
        const hoverIndex = index
        const sourceColumn = item.columnId
        const targetColumn = columnId
        const mongo = state.lists?.filter((m) =>
          m.listid.includes('Code Cells')
        )

        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn, mongo },
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
      <>
        <Bit
          shouldHover={isHoovered}
          onMouseEnter={() => setIsHoovered(true)}
          onMouseLeave={() => setIsHoovered(false)}
        >
          <HighlightOffIcon
            onClick={() => {
              alert('✔️ This works on every component!')
            }}
          />
        </Bit>
        <b>File name</b> <br />
        <div style={{ flexShrink: 1 }}>
          {fileName.split(/\b(?![\s.])/).join('\n')}
        </div>
        <hr />
        <b>Cell name - </b> {cellName}
        <hr />
        <b>Sequence Number - </b> {seqNumber}
        <hr />
      </>
    </CardContainer>
  )
}

export default Card
