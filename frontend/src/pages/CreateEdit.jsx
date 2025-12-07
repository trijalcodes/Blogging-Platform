import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'


export default function CreateEdit({ edit }){
const { id } = useParams()
const [title,setTitle]=useState('')
const [content,setContent]=useState('')
const nav = useNavigate()


useEffect(()=>{ if(edit && id){ api.get(`/posts/${id}`).then(r=>{ setTitle(r.data.title); setContent(r.data.content) }) } },[edit,id])


const submit = async(e)=>{
e.preventDefault()
try{
if(edit) await api.put(`/posts/${id}`, { title, content })
else {
await api.post('/posts', { title, content })
}
nav('/')
}catch(err){ alert('Save failed') }
}


return (
<div className="max-w-2xl mx-auto glass p-6 rounded-2xl">
<h2 className="text-2xl font-semibold mb-4">{edit ? 'Edit post' : 'Create post'}</h2>
<form onSubmit={submit} className="flex flex-col gap-3">
<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="bg-transparent border px-3 py-2 rounded-md" />
<textarea required value={content} onChange={e=>setContent(e.target.value)} rows={8} placeholder="Content" className="bg-transparent border px-3 py-2 rounded-md" />
<div className="flex gap-2">
<button className="px-4 py-2 bg-slate-700 rounded-md">Save</button>
</div>
</form>
</div>
)
}