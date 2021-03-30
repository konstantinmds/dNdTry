import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useAppState } from '../../AppStateContext'
import { DragItem } from './DragItem'

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()
  const [, drag, preview] = useDrag({
    item,
    begin: () =>
      dispatch({
        type: 'SET_DRAGGED_ITEM',
        payload: item,
      }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),

    end: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: undefined }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return { drag }
}
