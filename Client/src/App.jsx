import React from 'react'
import Loginstudent from './pages/Student/Login'
import Registerstudent from './pages/Student/Register'
import Instructions from './components/Instructions'
import Loginteacher from './pages/Teacher/Login'
import { Routes, Route } from 'react-router-dom'
import Studentdashboard from './pages/Student/Dashboard/Dashboard'
import Home from './pages/Student/Dashboard/pages/Home'
import Coursecontent from './pages/Student/Dashboard/pages/Coursecontent'
import Attendence from './pages/Student/Dashboard/pages/Attendence'
import Fees from './pages/Student/Dashboard/pages/Fees'
const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Instructions />} />
          <Route path='/student/login' element={<Loginstudent />} />
          <Route path='/student/register' element={<Registerstudent />} />
          <Route path='/student/portal' element={<Studentdashboard />}>
            <Route path='home' element={<Home />} />
            <Route path='content' element={<Coursecontent />} />
            <Route path='attendence' element={<Attendence />} />
            <Route path='fees' element={<Fees />} />
          </Route>
        </Routes>
        <Routes>
          <Route path='/teacher/login' element={<Loginteacher />} />
        </Routes>
      </div>
    </>
  )
}

export default App
