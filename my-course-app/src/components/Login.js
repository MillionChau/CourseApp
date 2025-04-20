import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      })

      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('role', user.role)
      localStorage.setItem('name', user.username)

      if (user.role === 'admin') {
        navigate('/')
      } else {
        navigate('/')
      }

      // Thực hiện refresh lại trang
      window.location.reload()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error during registration'
      setError(errorMessage)
    }
  }

  return (
    <div className="container" style={{
      maxWidth: '400px',
      minHeight:  450,
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  )
}

export default Login
