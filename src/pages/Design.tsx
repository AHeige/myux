import React, { ReactElement, useState } from 'react'

//Interfaces
import { SavedColor } from '../interfaces/ColorInterfaces'

//Components
import Header from '../components/Header/Header'
import DrawerSimple from '../components/Drawer/DrawerSimple'

//Mui
import { AppBar, Card, Chip, Stack, Tooltip } from '@mui/material'
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
      borderRadius: '0.5em',
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
        {['Home', 'Profile', 'Settings', 'About'].map((c, i) => {
          return <Chip key={i} sx={{ padding: padding, background: 'transparent', color: '#fff' }} label={c} />
        })}
      </Stack>
    </AppBar>
  )
}

const Design: React.FC<Props> = ({ colors, onColorSelect }): JSX.Element => {
  const toolTipPlaceHolder = 'Drag a color here to use it!'

  const [openDrawer, setOpenDrawer] = useState<boolean>(true)
  const [bgColor, setBgColor] = useState<string>(toolTipPlaceHolder)
  const [navColor, setNavColor] = useState<string>(toolTipPlaceHolder)
  const [cardColor, setCardColor] = useState<string>(toolTipPlaceHolder)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Header>
        <AddColor onColorSelect={(c) => onColorSelect(c)} />
      </Header>

      <DndProvider backend={HTML5Backend}>
        <DrawerSimple variant='persistent' mainDrawer={false} open={openDrawer} children={<DrawerComponent colors={colors} />} toggleDrawer={toggleDrawer} />
        <ColorProvider>
          <div
            className='wrapper'
            style={{
              maxWidth: '1200px',
              width: '80%',
              marginLeft: '163px',
              height: '60vh',
              display: 'grid',
              marginTop: '10em',
              justifyContent: 'flex-start',
              borderRadius: '0.5em',
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            {/* Design card with drop targets */}

            {/* Nav */}
            <div style={{ position: 'absolute', zIndex: '1', borderRadius: '0.5em' }}>
              <DropTarget
                callbackColor={(c) => setNavColor(c)}
                background='var(--main-nav-color)'
                type='Nav'
                child={
                  <Tooltip placement='top-start' arrow title={navColor}>
                    {navBar()}
                  </Tooltip>
                }
              />
            </div>

            {/* Background */}
            <DropTarget
              callbackColor={(c) => setBgColor(c)}
              type='background'
              background='var(--main-bg-color)'
              child={
                <Tooltip placement='bottom-start' arrow title={bgColor}>
                  <Card elevation={5} sx={{ position: 'absolute', width: '100%', height: '100%', background: 'transparent' }}>
                    {/* Background */}
                  </Card>
                </Tooltip>
              }
            />

            {/* Card */}
            <div style={{ position: 'absolute', minWidth: '160px', width: '45%', alignSelf: 'center', justifySelf: 'center' }}>
              <DropTarget
                callbackColor={(c) => setCardColor(c)}
                background='var(--main-accent-color)'
                type='card'
                child={
                  <Tooltip placement='top-start' arrow title={cardColor}>
                    <Card elevation={5} sx={{ borderRadius: '0.5em', background: 'transparent', padding: '2em' }}>
                      <h2>Card</h2>
                      <p>With some fancy text!</p>
                    </Card>
                  </Tooltip>
                }
              />
            </div>
          </div>
        </ColorProvider>
      </DndProvider>
    </>
  )
}

export default Design
