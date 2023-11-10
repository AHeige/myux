import { AppBar } from '@mui/material'
import React, { ReactNode } from 'react'
import { nav } from './HeaderStyle'

interface Props {
  children: ReactNode
}

const Header: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <AppBar elevation={0} style={nav}>
      {children}
    </AppBar>
  )
}

export default Header
