/*
 import React, { createContext, useContext, useState } from 'react';
  

export interface HoverContextProps {
  isHoovered: boolean
  setIsHoovered: () => void
}


export const HooverContext = createContext<HoverContextProps>({} as any);

interface Props {
  children?: React.ReactNode;
}


export const HooverProvider: any  = ({ children }): React.PropsWithChildren<{ initialState: HoverContextProps }> => {
  const [isHoovered, setIsHoovered] = useState({isHoovered: false});
  

  return(
    <HooverContext.Provider value={{ isHoovered, setIsHoovered }}>
      {children}
    </HooverContext.Provider>
  )
}

export const useHooverValue = () => useContext(HooverContext) */

export const r = ''
