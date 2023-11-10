import React from 'react'
import Header from '../components/Header/Header'
import { Card } from '@mui/material'

const DesignHeader: React.FC = () => (
  <>
    <h1>Design</h1>
  </>
)

const Design: React.FC = (): JSX.Element => {
  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <Header>
        <DesignHeader />
      </Header>
      <Card sx={{ marginTop: '10em', width: '100%', height: '100%' }}>Test Your Colors Here!</Card>
    </div>
  )
}

export default Design
