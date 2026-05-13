import React from 'react'
import Login from '../Pages/auth/Login'
import { BrowserRouter, Route, Routes, } from 'react-router'
import ProtectedRoute from '../Components/ProtectedRoute'
import UserHome from '../Pages/user/UserHome'
import Register from '../Pages/auth/Register'
import CreateJob from '../Pages/user/CreateJob'
import ProviderDashboard from '../Pages/provider/ProviderDashboard'
import LandingPage from '../Pages/LandingPage'
import ForgotPassword from '../Pages/auth/ForgotPassword'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/user/create-job' element={<ProtectedRoute allowedRole="user"><CreateJob /></ProtectedRoute>} />
          <Route path='/user' element={<ProtectedRoute allowedRole="user"> <UserHome /> </ProtectedRoute>} />
          <Route path='provider' element={<ProtectedRoute allowedRole="provider"><ProviderDashboard /></ProtectedRoute>} />
          <Route path='/forgot-Password' element={<ForgotPassword/>}/> 
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App