import React, { ReactNode } from 'react'
import { createContext } from 'react'
import rootStore, { RootStore } from '../../stores/root'

interface PropsStoreProvider {
  children: ReactNode
}

export const StoresContext = createContext<RootStore | null>(null)

export const StoreProvider = function provideStoreValueToChildComponent({ children }: PropsStoreProvider): JSX.Element {
  const value = rootStore
  return <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
}
