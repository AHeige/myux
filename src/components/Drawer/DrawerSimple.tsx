import { Button, Drawer, Stack } from '@mui/material'

//Icons
import BorderStyleIcon from '@mui/icons-material/BorderStyle'
import PaletteIcon from '@mui/icons-material/Palette'
import { useNavigate } from 'react-router-dom'

const DrawerSimple = () => {
  const navigate = useNavigate()

  return (
    <Drawer open variant='persistent' elevation={0} PaperProps={{ style: { backgroundColor: '#414141' } }}>
      <Stack spacing={2} direction={'column'} sx={{ marginTop: '1em' }}>
        <Button onClick={() => navigate('/')}>
          <PaletteIcon sx={{ color: '#fff' }} />
        </Button>
        <Button title='Design' onClick={() => navigate('/design')}>
          <BorderStyleIcon sx={{ color: '#fff' }} />
        </Button>
      </Stack>
    </Drawer>
  )
}

export default DrawerSimple