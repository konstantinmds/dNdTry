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

      {state.lists === undefined ? (
        <p>No Data</p>
      ) : (
        state.lists.map((list) => (
          <Column
            key={list.listid}
            listId={list.listid}
            // eslint-disable-next-line radix
            index={list.listid as any}
            id={list.listid}
          />
        ))
      )}
    </AppBaseContainer>
  )
}

export default Main
