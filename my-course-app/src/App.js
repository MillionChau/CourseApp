import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import CourseList from './components/CourseList'
import AddCourse from './components/AddCourse'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EditCourse from './components/UpdateCourse'

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  )
}

function AppWithRouter() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login'

  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/courses/:courseId/edit" element={<EditCourse />} />
          </Routes>
        </div>
        {/* Ẩn Footer nếu đang ở trang Register hoặc Login */}
        {!isAuthPage && <Footer />}
      </div>
    </div>
  )
}

export default App
