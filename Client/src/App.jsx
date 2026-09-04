import React from 'react'
import Register from './pages/Register'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
