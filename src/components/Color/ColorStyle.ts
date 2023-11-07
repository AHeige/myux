import { createTheme } from '@mui/material'

export const addColor: React.CSSProperties = {
  display: 'flex',
  // gap: '1em',
  alignContent: 'center',
  justifyContent: 'center',
  padding: '1em',
  background: 'transparent',
  width: 'fit-content',
}

export const iconStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexWrap: 'wrap',
  filter: 'grayscale(50%)',
}

export const chosenColors: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flexDirection: 'row',
  gap: '1em',
  padding: '1em',
  marginTop: '10em',
}

export const nav: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  background: '#414141',
  flexDirection: 'row',
}

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          display: 'none',
          position: 'absolute',
          transition: 'all 1s ease-in-out',
          opacity: '0',
          width: '2em',
          height: '2em',
          padding: '2em',
          minWidth: 'unset',
        },
      },
    },
  },
})
