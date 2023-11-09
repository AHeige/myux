import React, { FC, FormEvent, useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Chip, InputBaseComponentProps, Stack, TextField, ThemeProvider, Typography } from '@mui/material'

//Icons
import colorIcon from '../../assets/colorIcon.svg'
import DeleteIcon from '@mui/icons-material/Delete'

//Styles
import { addColor, chosenColors, iconStyle, theme } from './ColorStyle'
import './ColorCss.css'

//Utils
import { createColorObject, isValidColor } from '../../utils/helpers'

//Interfaces
import { SavedColor } from '../../interfaces/ColorInterfaces'
import Header from '../Header/Header'

interface Props {
  inputLabel?: string
}

const Color: FC<Props> = (props): JSX.Element => {
  const { inputLabel = '#color' } = props

  const [colors, setColors] = useState<SavedColor[]>([])
  const [newColor, setNewColor] = useState<string>('')

  useEffect(() => {
    const localStore = localStorage.getItem('colors')

    if (localStore) {
      const data = JSON.parse(localStore)

      //If old data is stored as string[] -- before SavedColor[] was implemented.
      if (data.length > 0 && !data[0].colorDetails) {
        const oldData: string[] = data

        const migratedColors: SavedColor[] = oldData.map((color) => {
          return createColorObject(color)
        })

        setColors(migratedColors)
        // localStorage.setItem('colors', JSON.stringify([...colors]))
      } else if (data.length > 0) {
        const storedColors: SavedColor[] = data

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
        const newColorObject: SavedColor = createColorObject(newColor)

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
      <Header
        children={
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
                    label={inputLabel}
                  />
                  <Button disabled={!isValidColor(newColor)} color={'success'} variant='contained' onClick={() => handleAddColor()}>
                    Add Color
                  </Button>
                </Stack>
              </form>
            </Card>
          </Stack>
        }
      />

      <div style={chosenColors}>
        {colors.length > 0
          ? colors.map((color, i) => {
              const chosenColorCard: React.CSSProperties = {
                padding: '3em',
                background: color.colorDetails.hex,
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
                  <Stack direction={'column'} spacing={1}>
                    {/* <Chip avatar={<span style={{ background: color.hex, borderRadius: '50%' }}></span>} label={color.hex} /> */}
                    <Stack direction={'row'} spacing={0.5}>
                      {color.colorDetails.name && <Chip style={chipStyle} label={color.colorDetails.name} />}
                      <Chip style={chipStyle} label={color.colorDetails.hex} />
                      <Chip style={chipStyle} label={color.colorDetails.rgb} />
                    </Stack>
                    <Card elevation={10} style={chosenColorCard} key={i}></Card>
                    <Stack direction={'row'}>
                      {color.category.map((d) => {
                        return <Chip style={chipStyle} label={d.name} />
                      })}
                    </Stack>
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
