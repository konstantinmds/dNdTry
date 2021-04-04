/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react'
import { load } from './api'
import { IAppState } from './react-app-env'

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
      draggedItem: undefined,
    })

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load()
          setInitialState({ ...data, draggedItem: undefined } as any)
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
