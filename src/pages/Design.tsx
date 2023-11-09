import { FC } from 'react'
import Header from '../components/Header/Header'
import { Card } from '@mui/material'

const Design: FC = (): JSX.Element => {
  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <Header children={<h1>Design</h1>} />
      <Card sx={{ marginTop: '10em', width: '100%', height: '100%' }}>Test Your Colors Here!</Card>
    </div>
  )
}

export default Design
