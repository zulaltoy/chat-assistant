import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
          <header>
        <nav>
          <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Home
          </NavLink>{' '}
          |{' '}
          <NavLink to="/chat" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Chat
          </NavLink>{' '}
          |{' '}
          <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2025 Chat Assistant</p>
      </footer>
    </div>
  )
}

export default RootLayout;