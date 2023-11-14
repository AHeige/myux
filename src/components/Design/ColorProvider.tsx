import React, { ReactElement, useState } from 'react'
import { Color, ColorContext } from './ColorContext'

interface Props {
  children: ReactElement
}

export const ColorProvider: React.FC<Props> = ({ children }) => {
  const [colors, setColors] = useState<Color[]>([])

  return <ColorContext.Provider value={{ colors, setColors }}>{children}</ColorContext.Provider>
}
