import React, { ReactNode, useState } from 'react'

//Mui
import { AppBar, Button, Grid } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

//Css
import { nav } from './HeaderStyle'

//Components
import DrawerSimple from '../Drawer/DrawerSimple'

interface Props {
  children: ReactNode
}

const Header: React.FC<Props> = ({ children }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <DrawerSimple open={openDrawer} toggleDrawer={toggleDrawer} />
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
