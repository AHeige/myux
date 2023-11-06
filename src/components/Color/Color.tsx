import React from 'react'
import { useState } from 'react'
import { AppBar, Button, Card, TextField } from '@mui/material'
import ColorizeIcon from '@mui/icons-material/Colorize'

//Styles
import { addColor, iconStyle, chosenColors, chosenColorCard } from './ColorStyle'

const Color = () => {
  const [colors, setColors] = useState<string[]>([])
  const [newColor, setNewColor] = useState<string>('')

  const handleAddColor = () => {
    if (colors) {
      console.log('handleAddColor')
      newColor && setColors([...colors, newColor])
    }
  }

  const nav: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    background: 'transparent',
  }

  return (
    <>
      <AppBar style={nav}>
        <Card style={addColor}>
          <div style={iconStyle}>
            <ColorizeIcon />
          </div>

          <TextField onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewColor(event.target.value)} label='#color' variant='filled' />
          <Button color={'inherit'} variant='contained' onClick={() => handleAddColor()}>
            Add Color
          </Button>
        </Card>
      </AppBar>
      <div style={chosenColors}>
        {colors.length > 0 &&
          colors.map((color, i) => {
            return (
              <Card style={chosenColorCard} key={i}>
                {color}
              </Card>
            )
          })}
      </div>
    </>
  )
}

export default Color
