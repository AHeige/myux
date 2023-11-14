// ColorContext.tsx
import { createContext, useContext } from 'react'

export interface Color {
  color: string
  type: string
}

export interface ColorContextProps {
  colors: Color[]
  setColors: React.Dispatch<React.SetStateAction<Color[]>>
}

export const ColorContext = createContext<ColorContextProps | undefined>(undefined)

export const useColorContext = () => {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider')
  }
  return context
}
