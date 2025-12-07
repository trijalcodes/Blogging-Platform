import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'


export default function Register(){
const [username,setUsername]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const nav = useNavigate()


const submit = async(e)=>{
e.preventDefault()
try{ await api.post('/users/register', { username, email, password }); nav('/login') }
catch(err){ alert(err?.response?.data?.message || 'Register failed') }
}


return (
<div className="max-w-md mx-auto glass p-6 rounded-2xl">
<h2 className="text-2xl font-semibold mb-4">Create account</h2>
<form onSubmit={submit} className="flex flex-col gap-3">
<input required value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="bg-transparent border px-3 py-2 rounded-md" />
<input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="bg-transparent border px-3 py-2 rounded-md" />
<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="bg-transparent border px-3 py-2 rounded-md" />
<button className="mt-2 px-4 py-2 bg-slate-700 rounded-md">Create</button>
</form>
</div>
)
}