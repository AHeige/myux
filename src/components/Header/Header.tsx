import React, { ReactNode, useState } from 'react'

//Mui
import { AppBar, Button, Grid, Stack } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ColorLens } from '@mui/icons-material'
import BorderStyleIcon from '@mui/icons-material/BorderStyle'

//Css
import { nav } from './HeaderStyle'

//Components
import DrawerSimple from '../Drawer/DrawerSimple'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const DrawerComponent: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Stack spacing={2} direction={'column'} sx={{ marginTop: '1em' }}>
      <Button onClick={() => navigate('/')}>
        <ColorLens sx={{ color: '#fff' }} />
      </Button>
      <Button title='Design' onClick={() => navigate('/design')}>
        <BorderStyleIcon sx={{ color: '#fff' }} />
      </Button>
    </Stack>
  )
}

const Header: React.FC<Props> = ({ children }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <DrawerSimple variant='temporary' mainDrawer open={openDrawer} toggleDrawer={toggleDrawer} children={<DrawerComponent />} />
      <AppBar elevation={0} style={nav}>
        <Grid container spacing={0} direction={'row'} wrap='wrap'>
          <Grid container justifyContent={'flex-start'} width={'8%'}>
            <Button onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: '#fff' }} />
            </Button>
          </Grid>
          <Grid container justifyContent='center' width={'92%'}>
            {children}
          </Grid>
        </Grid>
      </AppBar>
    </>
  )
}

export default Header
