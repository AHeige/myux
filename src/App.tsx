import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Styles
import './App.css'

//Pages
import Find from './pages/Find'
import Design from './pages/Design'
import { useEffect, useState } from 'react'

//Interfaces
import { SavedColor } from './interfaces/ColorInterfaces'
import { createColorObject } from './utils/helpers'

const App: React.FC = () => {
  const [colors, setColors] = useState<SavedColor[]>([])

  const handleAddColor = (newColor: SavedColor) => {
    console.log(newColor)
    setColors([...colors, newColor])
    localStorage.setItem('colors', JSON.stringify([...colors, newColor]))
  }

  const handleDeleteColor = (i: number) => {
    console.log('deleted: ', colors[i])
    colors.splice(i, 1)
    setColors([...colors])
    localStorage.setItem('colors', JSON.stringify(colors))
  }

  useEffect(() => {
    const localStore = localStorage.getItem('colors')

    if (localStore) {
      const data = JSON.parse(localStore)

      //If old data is stored as string[] -- before SavedColor[] was implemented.
      if (data.length > 0 && !data[0].colorDetails) {
        const oldData: string[] = data

        const migratedColors: SavedColor[] = []

        oldData.map((color) => {
          if (typeof color === 'string') {
            migratedColors.push(createColorObject(color))
          }
        })

        setColors(migratedColors)
        localStorage.setItem('colors', JSON.stringify(migratedColors))
      } else if (data.length > 0) {
        const storedColors: SavedColor[] = data

        setColors(storedColors)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Find colors={colors} onColorSelect={(newColor: SavedColor) => handleAddColor(newColor)} handleDeleteColor={(i) => handleDeleteColor(i)} />}></Route>
        <Route path={'/design'} element={<Design colors={colors} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
