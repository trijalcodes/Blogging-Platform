// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { HiOutlineMenu, HiOutlineSearch, HiOutlineX } from 'react-icons/hi'

export default function Navbar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    // navigate to home with a query param — Home reads it via URL if desired
    nav(`/?search=${encodeURIComponent(q)}`)
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
setTimeout(() => { window.location.href = '/' }, 0.5)

  }

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:text-white'}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  )

  return (
    <header className="py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo + title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl font-bold select-none">
              B
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold">Blogging</div>
              <div className="text-xs text-slate-400">Stories & Ideas</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
        </nav>
        </div>
        
        {/* Right:*/}
        <div className="flex items-center gap-3">
          {/* New post */}
          {user ? (
            <Link to="/posts/new" className="px-3 py-2 bg-slate-700 rounded-md text-sm font-medium hidden sm:inline-block">
              New post
            </Link>
          ) : (
            <Link to="/login" className="px-3 py-2 border rounded-md text-sm hidden sm:inline-block">Sign in</Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label="Open menu"
            className="p-2 rounded-md glass inline-flex md:hidden"
            title="Menu"
          >
            {open ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
          </button>

          {/* User dropdown (desktop) */}
          {user && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setOpen(v => !v)}
                className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium"
                aria-haspopup="true"
                aria-expanded={open}
              >
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </button>

              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-40 glass rounded-md shadow-lg p-2 z-30"
                >
                  <Link to="/posts/new" className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">New post</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-sm text-rose-400 hover:bg-slate-800">Sign out</button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="md:hidden mt-3 glass p-3 rounded-xl">
        

          <div className="flex flex-col gap-2">
            <NavItem to="/">Home</NavItem>
            {user ? (
              <>
                <Link to="/posts/new" className="px-3 py-2 bg-slate-700 rounded-md text-sm text-center">New post</Link>
                <button onClick={handleLogout} className="px-3 py-2 border rounded-md text-sm">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 border rounded-md text-sm text-center">Sign in</Link>
                <Link to="/register" className="px-3 py-2 bg-slate-700 rounded-md text-sm text-center">Sign up</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
