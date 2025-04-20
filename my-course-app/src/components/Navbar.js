import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navigate = useNavigate()

  const userRole = localStorage.getItem('role')
  const name = localStorage.getItem('name')

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">CourseApp</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarSupportedContent"
        aria-expanded={!isNavbarCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {!userRole ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/courses">Courses</Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  onClick={toggleDropdown}
                >
                  {name}
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} dropdown-menu-end`}>
                  {userRole === 'admin' && (
                    <>
                      <li><Link className="dropdown-item" to="/add-course">Create Course</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                    </>
                  )}
                  <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Log out</Link></li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
