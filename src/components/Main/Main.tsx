import React from 'react'
import { useAppState } from '../../AppStateContext'
import { AppBaseContainer, SidebarContainer } from '../../styles'
import Sidebar from '../Sidebar/Sidebar'
import { Column } from './Column'
import CustomDragLayer from './CustomDragLayer'

const Main = () => {
  const { state } = useAppState()
  return (
    <AppBaseContainer>
      <SidebarContainer>
        <Sidebar navLists={state.sourceIngested} />
      </SidebarContainer>
      <CustomDragLayer />

      {state.lists === undefined ? (
        <p>No Data</p>
      ) : (
        state.lists.map((list) => (
          <Column
            key={list.listId}
            listId={list.listId}
            // eslint-disable-next-line radix
            index={list.listId as any}
            id={list.listId}
          />
        ))
      )}
    </AppBaseContainer>
  )
}

export default Main
