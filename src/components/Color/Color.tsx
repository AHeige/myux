import React, { FormEvent } from 'react'
import { useState } from 'react'
import { AppBar, Avatar, Button, Card, Chip, Stack, TextField } from '@mui/material'
import ColorizeIcon from '@mui/icons-material/Colorize'

//Styles
import { addColor, iconStyle, chosenColors, nav } from './ColorStyle'

const Color = () => {
  const [colors, setColors] = useState<string[]>([])
  const [newColor, setNewColor] = useState<string>('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleAddColor()
  }

  function isValidColor(strColor: string) {
    const s = new Option().style
    s.color = strColor
    return s.color
  }

  const handleAddColor = () => {
    if (colors && newColor.length > 0) {
      if (isValidColor(newColor)) {
        console.log('handleAddColor')
        newColor && setColors([...colors, newColor])
        setNewColor('')
      } else {
        alert(newColor + ' is not a color')
      }
    }
  }

  return (
    <>
      <AppBar elevation={0} style={nav}>
        <Stack direction={'row'} spacing={3}>
          <Card style={addColor}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack direction={'row'} spacing={2}>
                <div style={iconStyle}>
                  <ColorizeIcon />
                </div>
                <TextField value={newColor} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewColor(event.target.value)} label='#color' variant='filled' />
                <Button color={'inherit'} variant='contained' onClick={() => handleAddColor()}>
                  Add Color
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </AppBar>
      <div style={chosenColors}>
        {colors.length > 0 &&
          colors.map((color, i) => {
            const chosenColorCard: React.CSSProperties = {
              padding: '2em',
              background: color,
            }

            return (
              <Card style={{ padding: '1em' }}>
                <Stack direction={'column'} spacing={1}>
                  <Chip avatar={<span style={{ background: color, borderRadius: '50%' }}></span>} label={color} />
                  <Card elevation={10} style={chosenColorCard} key={i}></Card>
                </Stack>
              </Card>
            )
          })}
      </div>
    </>
  )
}

export default Color
