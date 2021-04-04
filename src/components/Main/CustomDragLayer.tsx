/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { CustomDragLayerContainer } from '../../styles'
import Card from './Card'
import { Column } from './Column'

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging) {
    return null
  }

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === 'COLUMN' ? (
          <Column
            id={item.llistId}
            listId={item.listId}
            index={item.index}
            isPreview={true}
          />
        ) : (
          <Card
            columnId={item.columnId}
            index={0}
            id={item.id}
            isPreview={true}
            fileName={item.fileName}
            seqNumber={item.seqNumber}
            cellName={item.cellName}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  )
}
export default CustomDragLayer
