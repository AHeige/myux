import React, { ReactElement, useState } from 'react'

//Interfaces
import { SavedColor } from '../interfaces/ColorInterfaces'

//Components
import Header from '../components/Header/Header'
import DrawerSimple from '../components/Drawer/DrawerSimple'

//Mui
import { Card, Chip, Stack } from '@mui/material'
import { Circle } from '@mui/icons-material'

//Context
import { ColorProvider } from '../components/Design/ColorProvider'
// import { useColorContext } from '../components/Design/ColorContext'
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useColorContext } from '../components/Design/ColorContext'

interface Props {
  colors: SavedColor[]
}

interface ColorDraggableProps {
  color: string
}

interface DropTargetProps {
  type: string
  child: ReactElement
  callbackColor?: (color: string) => void
}

const DesignHeader: React.FC = () => (
  <>
    <h1>Design</h1>
  </>
)

const ColorDraggable: React.FC<ColorDraggableProps> = ({ color }) => {
  const [, drag] = useDrag(() => ({
    type: 'color',
    item: { color },
  }))

  return (
    <div ref={drag} draggable key={color}>
      <Chip
        sx={{
          color: '#fff',
          '& .MuiChip-avatar': {
            borderRadius: '50%',
            color: color,
          },
        }}
        avatar={<Circle />}
        label={color}
      />
    </div>
  )
}

const DrawerComponent: React.FC<Props> = ({ colors }) => {
  return (
    <Stack spacing={2} direction={'column'} sx={{ padding: '2em', color: 'var(--main-font-color)', marginTop: '1em' }}>
      <p>Your colors:</p>
      {colors &&
        colors.map((color, i) => {
          return <ColorDraggable key={i} color={color.colorDetails.hex} />
        })}
    </Stack>
  )
}

const DropTarget: React.FC<DropTargetProps> = ({ type, child, callbackColor }) => {
  const [chosenColor, setChosenColor] = useState<string>('var(--main-accent-color)')

  const { colors, setColors } = useColorContext()

  const [, drop] = useDrop(() => ({
    accept: 'color',
    drop: (item: { color: string }) => {
      setChosenColor(item.color)
      setColors([...colors, { color: item.color, type }])
      if (callbackColor) {
        callbackColor(item.color)
      }
    },
  }))

  const StyledWrapper = () => {
    const styles = {
      background: chosenColor,
      color: 'var(--main-font-color)',
    }

    return <>{React.cloneElement(child, { style: { ...child.props.style, ...styles }, ref: drop })}</>
  }

  return <StyledWrapper />
}

const Design: React.FC<Props> = ({ colors }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true)
  // const [background, setBackground] = useState<string>('var(--main-bg-color)')

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  // const changeBackground = (color: string) => {
  //   document.body.style.setProperty('--main-bg-color', color)
  // }

  return (
    <div>
      <Header>
        <DesignHeader />
      </Header>

      <DndProvider backend={HTML5Backend}>
        <ColorProvider>
          <>
            <DrawerSimple variant='persistent' mainDrawer={false} open={openDrawer} children={<DrawerComponent colors={colors} />} toggleDrawer={toggleDrawer} />
            <div style={{ marginTop: '10em', justifyContent: 'flex-start', display: 'flex' }}>
              <DropTarget type='red' child={<Card sx={{ borderRadius: '0.5em', background: 'transparent', padding: '10em' }}>Red</Card>} />
              <DropTarget type='chip' child={<Chip sx={{ padding: '1em', background: 'transparent' }} label='testC' />} />
            </div>
          </>
        </ColorProvider>
      </DndProvider>
    </div>
  )
}

export default Design
