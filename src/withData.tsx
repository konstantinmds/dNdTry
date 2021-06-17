/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react'
import { load } from './api'
import { DropDown, IAppState } from './react-app-env'

export const withData = (
  WrappedComponent: React.ComponentType<
    React.PropsWithChildren<{ initialState: IAppState }>
  >
) => {
  return ({ children }: React.PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | undefined>()
    const [initialState, setInitialState] = useState<IAppState>({
      lists: [],
      dropDownItems: {} as DropDown,
      default: {},
      draggedItem: undefined,
      sourceIngested: null,
      selectedOption: null,
      backdropVal: false,
    })

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load()

          setInitialState({
            ...data,
            lists: Array.of(data.lists[0]),
            dropDownItems: data.dropDownItems,
            draggedItem: undefined,
            selectedOption: data.dropDownItems[0],
            backdropVal: false,
          } as any)
        } catch (e) {
          setError(e)
        }
        setIsLoading(false)
      }
      fetchInitialState()
    }, [])

    if (isLoading) {
      return <div>...Loading</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    return (
      <WrappedComponent initialState={initialState}>
        {children}
      </WrappedComponent>
    )
  }
}
