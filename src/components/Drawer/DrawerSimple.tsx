import { Button, Drawer, Stack } from '@mui/material'

//Icons
import BorderStyleIcon from '@mui/icons-material/BorderStyle'
import { ChevronLeft, ColorLens } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface Props {
  open: boolean
  toggleDrawer: () => void
}

const DrawerSimple: React.FC<Props> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate()

  const handleClose = () => {
    toggleDrawer()
  }

  return (
    <Drawer open={open} variant='persistent' elevation={0} PaperProps={{ style: { backgroundColor: '#414141' } }}>
      <Stack spacing={2} direction={'column'} sx={{ marginTop: '1em' }}>
        <Button onClick={handleClose}>
          <ChevronLeft sx={{ color: '#fff' }} />
        </Button>
        <Button onClick={() => navigate('/')}>
          <ColorLens sx={{ color: '#fff' }} />
        </Button>
        <Button title='Design' onClick={() => navigate('/design')}>
          <BorderStyleIcon sx={{ color: '#fff' }} />
        </Button>
      </Stack>
    </Drawer>
  )
}

export default DrawerSimple
