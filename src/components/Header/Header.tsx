import { AppBar } from '@mui/material'
import { FC, ReactNode } from 'react'
import { nav } from './HeaderStyle'

interface Props {
  children: ReactNode
}

const Header: FC<Props> = ({ children }) => {
  return (
    <AppBar elevation={0} style={nav}>
      {children}
    </AppBar>
  )
}

export default Header
