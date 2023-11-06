// server.ts
import express from 'express'

const app = express()
const port = process.env.PORT || 6060

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
