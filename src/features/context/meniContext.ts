/* eslint-disable no-nested-ternary */
import { useEffect, useCallback, useState } from 'react'

const useContextMenu = (outerRef) => {
  const [xPos, setXPos] = useState('0px')
  const [yPos, setYPos] = useState('0px')
  const [menu, showMenu] = useState(false)
  const [card, setCard] = useState(null)

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault()
      if (outerRef && outerRef.current.contains(event.target)) {
        setXPos(`${event.pageX}px`)
        setYPos(`${event.pageY}px`)
        const target = event.target.id.includes('Card#')
          ? event.target.id
          : event.target.parentNode.className.includes('Card#')
          ? event.target.parentNode.className
          : event.target.parentNode.id.includes('Card#')
          ? event.target.parentNode.id
          : null

        if (target) {
          const id = target.split('Card# ')[1]
          setCard(id)
          showMenu(true)
        } else {
          showMenu(false)
          setCard(null)
        }
      }
    },
    [showMenu, outerRef, setXPos, setYPos, card]
  )

  const handleClick = useCallback(() => {
    showMenu(false)
  }, [showMenu])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return { xPos, yPos, menu, card }
}

export default useContextMenu
