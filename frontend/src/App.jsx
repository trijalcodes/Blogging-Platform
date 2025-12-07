import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreateEdit from './pages/CreateEdit'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './components/PageTransition'

export default function App(){
  const { user } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#0b0f14,_#07060a)] text-slate-100 antialiased">
      <div className="max-w-5xl mx-auto px-4">
        <Navbar />
        <main className="py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home/></PageTransition>} />
              <Route path="/login" element={!user ? <PageTransition><Login/></PageTransition> : <Navigate to='/' />} />
              <Route path="/register" element={!user ? <PageTransition><Register/></PageTransition> : <Navigate to='/' />} />
              <Route path="/posts/new" element={user ? <PageTransition><CreateEdit/></PageTransition> : <Navigate to='/login' />} />
              <Route path="/posts/edit/:id" element={user ? <PageTransition><CreateEdit edit/></PageTransition> : <Navigate to='/login' />} />
              <Route path="/posts/:id" element={<PageTransition><PostDetails/></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
