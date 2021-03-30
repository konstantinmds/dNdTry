import React from 'react'
import { useAppState } from '../../AppStateContext'
import { AppBaseContainer, SidebarContainer } from '../../styles'
import { Column } from './Column'
import CustomDragLayer from './CustomDragLayer'

const Main = () => {
  const { state } = useAppState()
  return (
    <AppBaseContainer>
      <SidebarContainer />
      <CustomDragLayer />
      {state.lists.map((list) => (
        <Column
          key={list.id}
          text={list.text}
          // eslint-disable-next-line radix
          index={list.id as any}
          id={list.id}
        />
      ))}
    </AppBaseContainer>
  )
}

export default Main
