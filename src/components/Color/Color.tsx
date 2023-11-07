import React, { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import { AppBar, Button, Card, Chip, InputBaseComponentProps, Stack, TextField, ThemeProvider, Typography } from '@mui/material'

//Icons
import colorIcon from '../../../public/colorIcon.svg'
import DeleteIcon from '@mui/icons-material/Delete'

//Styles
import { addColor, chosenColors, iconStyle, nav, theme } from './ColorStyle'
import './ColorCss.css'

const Color = () => {
  const [colors, setColors] = useState<string[]>([])
  const [newColor, setNewColor] = useState<string>('')

  useEffect(() => {
    const localStore = localStorage.getItem('colors')

    if (localStore) {
      const storedColors: string[] = JSON.parse(localStore)

      if (storedColors) {
        setColors(storedColors)
      }
    }
  }, [])

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
        newColor && setColors([...colors, newColor])
        localStorage.setItem('colors', JSON.stringify([...colors, newColor]))
        setNewColor('')
      }
    }
  }

  const deleteColor = (i: number) => {
    colors.splice(i, 1)
    setColors(colors.map((c) => c))
    localStorage.setItem('colors', JSON.stringify(colors.map((c) => c)))
  }

  const inputProp: InputBaseComponentProps = {
    style: {
      color: isValidColor(newColor) ? '#fff' : 'rgb(130,130,130)',
    },
  }

  return (
    <>
      <AppBar elevation={0} style={nav}>
        <Stack direction={'row'} spacing={3}>
          <Card style={addColor} elevation={0}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack direction={'row'} spacing={2}>
                <div style={iconStyle}>
                  <img width={'25px'} src={colorIcon}></img>
                </div>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: 'rgb(130,130,130)',
                    },
                  }}
                  inputProps={inputProp}
                  style={{ color: '#fff' }}
                  value={newColor}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewColor(event.target.value)}
                  label='#color'
                />
                <Button disabled={!isValidColor(newColor)} color={'success'} variant='contained' onClick={() => handleAddColor()}>
                  Add Color
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </AppBar>
      <div style={chosenColors}>
        {colors.length > 0
          ? colors.map((color, i) => {
              const chosenColorCard: React.CSSProperties = {
                padding: '3em',
                background: color,
              }

              return (
                <Card className='colorCard' key={i}>
                  <ThemeProvider theme={theme}>
                    <Button className='deleteBtn' onClick={() => deleteColor(i)}>
                      <DeleteIcon />
                    </Button>
                  </ThemeProvider>
                  <Stack direction={'column'} spacing={0.5}>
                    <Chip avatar={<span style={{ background: color, borderRadius: '50%' }}></span>} label={color} />
                    <Card elevation={10} style={chosenColorCard} key={i}></Card>
                  </Stack>
                </Card>
              )
            })
          : [isValidColor(newColor) ? 'Its happening!' : 'No colors created yet :('].map((text, i) => (
              <Typography key={i} style={{ color: 'rgb(130,130,130)' }} variant='h4'>
                {text}
              </Typography>
            ))}
      </div>
    </>
  )
}

export default Color
