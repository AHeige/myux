import React from 'react'
import Color from '../components/Color/Color'
import { SavedColor } from '../interfaces/ColorInterfaces'

interface Props {
  colors: SavedColor[]
  onColorSelect: (newColor: SavedColor) => void
  handleDeleteColor: (i: number) => void
}

const Find: React.FC<Props> = ({ onColorSelect, colors, handleDeleteColor: deleteColor }): JSX.Element => {
  return <Color colors={colors} onColorSelect={onColorSelect} deleteColor={deleteColor} />
}

export default Find
