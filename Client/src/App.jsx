import React from 'react'
import Login from './pages/Student/Login'
import Registerstudent from './pages/Student/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Student/Dashboard/Dashboard'
import Home from './pages/Student/Dashboard/pages/Home'
import Coursecontent from './pages/Student/Dashboard/pages/Coursecontent'
import Attendence from './pages/Student/Dashboard/pages/Attendence'
import Fees from './pages/Student/Dashboard/pages/Fees'
import Leaves from './pages/Student/Dashboard/pages/Leaves'
import Assignment from './pages/Student/Dashboard/pages/Assignment'
import Complaint from './pages/Student/Dashboard/pages/Complaint'
import Profile from './pages/Student/Dashboard/pages/Profile'
import ProtectedRoute from './components/Protectedroute'
import Students from './pages/Student/Dashboard/pages/Students'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/student/register' element={<Registerstudent />} />

        {/* Protected Student Portal Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student','teacher']} />}>
          <Route path='/portal' element={<Dashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path='home' element={<Home />} />
            <Route path='students' element={<Students />} />
            <Route path='content' element={<Coursecontent />} />
            <Route path='attendence' element={<Attendence />} />
            <Route path='fees' element={<Fees />} />
            <Route path='leaves' element={<Leaves />} />
            <Route path='assignment' element={<Assignment />} />
            <Route path='complaint' element={<Complaint />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>

        {/* Catch-all redirect for undefined paths */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App