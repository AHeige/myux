import React, { ReactElement, useState } from 'react'

//Interfaces
import { SavedColor } from '../interfaces/ColorInterfaces'

//Components
import Header from '../components/Header/Header'
import DrawerSimple from '../components/Drawer/DrawerSimple'

//Mui
import { AppBar, Card, Chip, Stack } from '@mui/material'
import { Circle } from '@mui/icons-material'

//Context
import { ColorProvider } from '../components/Design/ColorProvider'
// import { useColorContext } from '../components/Design/ColorContext'
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useColorContext } from '../components/Design/ColorContext'
import AddColor from '../components/Color/AddColor'

interface Props {
  colors: SavedColor[]
  onColorSelect: (newColor: SavedColor) => void
}

interface ColorDraggableProps {
  color: string
}

interface DropTargetProps {
  type: string
  child: ReactElement
  callbackColor?: (color: string) => void
  background?: string
}

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

interface DrawerComponentProps {
  colors: SavedColor[]
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ colors }) => {
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

const DropTarget: React.FC<DropTargetProps> = ({ type, child, callbackColor, background = 'var(--main-accent-color)' }) => {
  const [chosenColor, setChosenColor] = useState<string>(background)

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

const navBar = () => {
  const padding = '2em'

  return (
    <AppBar position='relative'>
      <Stack direction={'row'} style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        {['Home', 'Profile', 'Settings', 'About'].map((c) => {
          return <Chip sx={{ padding: padding, background: 'transparent', color: '#fff' }} label={c} />
        })}
      </Stack>
    </AppBar>
  )
}

const Design: React.FC<Props> = ({ colors, onColorSelect }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <div>
      <Header>
        <AddColor onColorSelect={(c) => onColorSelect(c)} />
      </Header>

      <DndProvider backend={HTML5Backend}>
        <ColorProvider>
          <>
            <DrawerSimple
              variant='persistent'
              mainDrawer={false}
              open={openDrawer}
              children={<DrawerComponent colors={colors} />}
              toggleDrawer={toggleDrawer}
            />
            {/* Design card with drop targets */}
            <div style={{ display: 'grid', marginTop: '10em', justifyContent: 'flex-start', flexDirection: 'row', position: 'relative' }}>
              {/* Nav */}
              <div style={{ position: 'absolute' }}>
                <DropTarget background='var(--main-nav-color)' type='Nav' child={navBar()} />
              </div>

              {/* Background */}
              <DropTarget
                type='background'
                background='var(--main-bg-color)'
                child={
                  <Card elevation={5} sx={{ borderRadius: '0.5em', background: 'transparent', padding: '25em' }}>
                    Background
                  </Card>
                }
              />

              {/* Card */}
              <div style={{ position: 'absolute', width: '45%', alignSelf: 'center', justifySelf: 'center' }}>
                <DropTarget
                  background='var(--main-accent-color)'
                  type='card'
                  child={
                    <Card elevation={5} sx={{ borderRadius: '0.5em', background: 'transparent', padding: '2em' }}>
                      <h2>Card</h2>
                      <p>With some fancy text!</p>
                    </Card>
                  }
                />
              </div>
            </div>
          </>
        </ColorProvider>
      </DndProvider>
    </div>
  )
}

export default Design
