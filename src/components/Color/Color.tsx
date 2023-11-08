import React, { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import { AppBar, Button, Card, Chip, InputBaseComponentProps, Stack, TextField, ThemeProvider, Typography } from '@mui/material'

//Icons
import colorIcon from '../../assets/colorIcon.svg'
import DeleteIcon from '@mui/icons-material/Delete'

//Styles
import { addColor, chosenColors, iconStyle, nav, theme } from './ColorStyle'
import './ColorCss.css'
import { ColorInfo, getColorInfo, isValidColor } from '../../utils/helpers'

const Color = () => {
  const [colors, setColors] = useState<ColorInfo[]>([])
  const [newColor, setNewColor] = useState<string>('')

  useEffect(() => {
    const localStore = localStorage.getItem('colors')

    if (localStore) {
      const storedColors: ColorInfo[] = JSON.parse(localStore)

      if (storedColors) {
        setColors(storedColors)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleAddColor()
  }

  const handleAddColor = () => {
    if (colors && newColor.length > 0) {
      if (isValidColor(newColor)) {
        const newColorObject = getColorInfo(newColor)

        newColor && setColors([...colors, newColorObject])
        localStorage.setItem('colors', JSON.stringify([...colors, newColorObject]))
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
                  variant='filled'
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
                background: color.hex,
              }

              const chipStyle: React.CSSProperties = {
                background: '#ebebeb',
                color: '#414141',
              }

              return (
                <Card className='colorCard' key={i}>
                  <ThemeProvider theme={theme}>
                    <Button className='deleteBtn' onClick={() => deleteColor(i)}>
                      <DeleteIcon />
                    </Button>
                  </ThemeProvider>
                  <Stack direction={'column'} spacing={0.5}>
                    {/* <Chip avatar={<span style={{ background: color.hex, borderRadius: '50%' }}></span>} label={color.hex} /> */}
                    <Card elevation={10} style={chosenColorCard} key={i}>
                      <Stack spacing={0.5}>
                        {color.name && <Chip style={chipStyle} label={color.name} />}
                        <Chip style={chipStyle} label={color.hex} />
                        <Chip style={chipStyle} label={color.rgb} />
                      </Stack>
                    </Card>
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
