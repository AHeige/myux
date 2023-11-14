import React, { useState } from 'react'

import { Button, Card, Chip, Stack, ThemeProvider, Typography } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

//Styles
import { chosenColors, theme } from './ColorStyle'
import './ColorCss.css'

//Interfaces
import { SavedColor } from '../../interfaces/ColorInterfaces'
import Header from '../Header/Header'
import AddColor from './AddColor'

interface Props {
  inputLabel?: string
  onColorSelect: (newColor: SavedColor) => void
  colors: SavedColor[]
  deleteColor: (i: number) => void
}

const Color: React.FC<Props> = (props): JSX.Element => {
  const { inputLabel = '#color', onColorSelect, colors, deleteColor } = props
  const [newColor, setNewColor] = useState<SavedColor>()

  const handleSelectedColor = (color: SavedColor) => {
    setNewColor(color)
    onColorSelect(color)
  }

  return (
    <>
      <Header>
        <AddColor inputLabel={inputLabel} onColorSelect={(c) => handleSelectedColor(c)} />
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
          : [!newColor && 'No colors created yet :('].map((text, i) => (
              <Typography key={i} style={{ color: 'rgb(130,130,130)' }} variant='h4'>
                {text}
              </Typography>
            ))}
      </div>
    </>
  )
}

export default Color
