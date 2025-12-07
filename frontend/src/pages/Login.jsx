import React, { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const [animState, setAnimState] = useState("idle")  
  // idle → normal view
  // exit → play exit animation then navigate

  const submit = async(e)=>{
    e.preventDefault()
    try{
      const res = await api.post('/users/login', { email, password })
      login(res.data)

      // start exit animation
      setAnimState("exit")

    }catch(err){
      alert(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        animState === "exit"
          ? { opacity: 0, y: -40 }        // exit animation
          : { opacity: 1, y: 0 }          // entrance animation
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (animState === "exit") nav('/')  // navigate ONLY after animation finishes
      }}
      className="max-w-md mx-auto glass p-6 rounded-2xl"
    >
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          required
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="bg-transparent border px-3 py-2 rounded-md"
        />

        <input
          required
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Password"
          className="bg-transparent border px-3 py-2 rounded-md"
        />

        <button className="mt-2 px-4 py-2 bg-slate-700 rounded-md">
          Sign in
        </button>
      </form>
    </motion.div>
  )
}
