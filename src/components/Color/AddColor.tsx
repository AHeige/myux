import { useState, FormEvent } from 'react'

//Interfaces
import { SavedColor } from '../../interfaces/ColorInterfaces'

//Style
import { addColor, iconStyle } from './ColorStyle'

//Assets
import colorIcon from '../../assets/colorIcon.svg'

//Mui
import { Stack, Card, TextField, Button, colors, InputBaseComponentProps, useMediaQuery } from '@mui/material'

//Helpers
import { createColorObject, isValidColor } from '../../utils/helpers'

interface Props {
  onColorSelect: (newColor: SavedColor) => void
  inputLabel?: string
}

const AddColor: React.FC<Props> = ({ onColorSelect, inputLabel = '#color' }) => {
  const [newColor, setNewColor] = useState<string>('')

  const minWidth600 = useMediaQuery('(min-width:600px)')

  const inputProp: InputBaseComponentProps = {
    style: {
      color: isValidColor(newColor) ? '#fff' : 'rgb(130,130,130)',
    },
  }

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

  return (
    <Stack direction={'row'} spacing={3}>
      <Card style={addColor} elevation={0}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack direction={'row'} spacing={2}>
            {minWidth600 && (
              <div style={iconStyle}>
                <img width={'25px'} src={colorIcon}></img>
              </div>
            )}
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
              <span style={{ color: isValidColor(newColor) ? '#fff' : '#aa9090' }}>Add Color</span>
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  )
}

export default AddColor
