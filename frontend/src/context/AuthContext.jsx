import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
try { return JSON.parse(localStorage.getItem('user')) || null } catch(e){ return null }
})


useEffect(()=>{
if(user) localStorage.setItem('user', JSON.stringify(user))
else localStorage.removeItem('user')
},[user])


const login = (data) => { localStorage.setItem('token', data.token); setUser({ id: data.id, username: data.username }) }
const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null) }


return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext)