import { Button, Drawer, Stack } from '@mui/material'

//Icons

import React, { ReactElement } from 'react'
import { ChevronLeft } from '@mui/icons-material'

interface Props {
  open: boolean
  toggleDrawer: () => void
  children: ReactElement
  mainDrawer: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
}

const DrawerSimple: React.FC<Props> = ({ open, toggleDrawer, children, mainDrawer = false, variant = 'persistent' }) => {
  const handleClose = () => {
    toggleDrawer()
  }

  return (
    <Drawer open={open} variant={variant} elevation={0} PaperProps={{ style: { top: mainDrawer ? '0px' : '88px', backgroundColor: 'var(--main-nav-color)' } }}>
      <Stack spacing={2} direction={'column'} sx={{ marginTop: '1em' }}>
        {mainDrawer && (
          <Button onClick={handleClose}>
            <ChevronLeft sx={{ color: '#fff' }} />
          </Button>
        )}
        {children}
      </Stack>
    </Drawer>
  )
}

export default DrawerSimple
