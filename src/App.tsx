import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Find from './pages/Find'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Find />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
