import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Find from './pages/Find'
import DrawerSimple from './components/Drawer/DrawerSimple'
import Design from './pages/Design'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DrawerSimple />
      <Routes>
        <Route path={'/'} element={<Find />}></Route>
        <Route path={'/design'} element={<Design />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
