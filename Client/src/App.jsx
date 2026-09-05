import React from 'react'
import Loginstudent from './pages/Student/Login'
import Registerstudent from './pages/Student/Register'
import Instructions from './components/Instructions'
import Loginteacher from './pages/Teacher/Login'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Instructions/>} />
        <Route path='/student/login' element={<Loginstudent/>} />
        <Route path='/student/register' element={<Registerstudent/>} />
      </Routes>
      <Routes>
        <Route path='/teacher/login' element={<Loginteacher/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
