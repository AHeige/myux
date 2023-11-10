import React, { FormEvent } from 'react'
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
  onColorSelect: (newColor: SavedColor) => void
  colors: SavedColor[]
  deleteColor: (i: number) => void
}

const Color: React.FC<Props> = (props): JSX.Element => {
  const { inputLabel = '#color', onColorSelect, colors, deleteColor } = props

  const [newColor, setNewColor] = useState<string>('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleAddColor()
  }

  const handleAddColor = () => {
    if (colors && newColor.length > 0) {
      if (typeof newColor === 'string') {
        if (isValidColor(newColor)) {
          const newColorObject: SavedColor = createColorObject(newColor)

          if (newColorObject) {
            onColorSelect(newColorObject)

            setNewColor('')
          }
        }
      }
    }
  }

  const inputProp: InputBaseComponentProps = {
    style: {
      color: isValidColor(newColor) ? '#fff' : 'rgb(130,130,130)',
    },
  }

  return (
    <>
      <Header>
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
      </Header>

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
