import { createContext, useContext } from 'react'

export type BackdropContextProps = {
  isBackdroped: boolean
  setIsBackdroped: (a: boolean) => void
}

export const BackdropContext = createContext<BackdropContextProps>({
  isBackdroped: false,
  setIsBackdroped: () => {},
})

export const useBackdropContext = () => useContext(BackdropContext)
