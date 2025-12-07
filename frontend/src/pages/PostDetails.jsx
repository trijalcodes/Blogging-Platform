// src/pages/PostDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function PostDetails(){
  const { id } = useParams()
  const [post,setPost] = useState(null)
  const [comments,setComments] = useState([])
  const [text,setText] = useState('')
  const { user } = useAuth()
  const nav = useNavigate()

  useEffect(()=>{
    let mounted = true
    api.get(`/posts/${id}`).then(r=> mounted && setPost(r.data)).catch(()=>{})
    api.get(`/comments/${id}`).then(r=> mounted && setComments(r.data)).catch(()=>{})
    return ()=>{ mounted = false }
  },[id])

  const submit = async(e)=>{
    e.preventDefault()
    if(!text.trim()) return
    try{
      const res = await api.post(`/comments/${id}`, { comment: text })
      setComments(prev => [...prev, res.data])
      setText('')
    }catch(err){
      alert(err?.response?.data?.message || 'Comment failed')
    }
  }

  const handleDeletePost = async () => {
    if(!confirm('Delete this post? This action cannot be undone.')) return
    try {
      await api.delete(`/posts/${id}`)
      // on success go home
      nav('/')
    } catch(err) {
      alert(err?.response?.data?.message || 'Delete failed')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if(!confirm('Delete this comment?')) return
    try {
      await api.delete(`/comments/${commentId}`)
      setComments(prev => prev.filter(c => c._id !== commentId))
    } catch(err) {
      alert(err?.response?.data?.message || 'Delete failed')
    }
  }

  if(!post) return <div className="text-center">Loading...</div>

  const isAuthor = user && post.author && user.id === String(post.author._id || post.author)

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="text-sm text-slate-500">By {post.author?.username}</div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthor && (
            <>
              <Link to={`/posts/edit/${post._id}`} className="px-3 py-1 text-sm border rounded-md">Edit</Link>
              <button onClick={handleDeletePost} className="px-3 py-1 text-sm bg-rose-600 rounded-md">Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 text-slate-200 whitespace-pre-wrap">{post.content}</div>

      <hr className="my-4 border-slate-700" />
      <h3 className="font-semibold">Comments</h3>
      <div className="mt-3 space-y-3">
        {comments.length === 0 && <div className="text-slate-400">No comments yet</div>}
        {comments.map(c=> (
          <div key={c._id} className="p-3 bg-black/30 rounded-md flex justify-between items-start gap-3">
            <div>
              <div className="text-sm text-slate-300">{c.userId?.username || 'You'}</div>
              <div className="text-slate-100">{c.comment}</div>
            </div>

            <div className="flex items-center gap-2">
              {user && String(c.userId?._id || c.userId) === String(user.id) && (
                <button onClick={()=>handleDeleteComment(c._id)} className="text-sm px-2 py-1 rounded-md border text-rose-400">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={submit} className="mt-4 flex gap-2">
          <input required value={text} onChange={e=>setText(e.target.value)} className="flex-1 bg-transparent border px-3 py-2 rounded-md" placeholder="Write a comment..." />
          <button className="px-3 py-2 bg-slate-700 rounded-md">Send</button>
        </form>
      ) : (
        <div className="mt-4 text-slate-400">Please <Link to="/login" className="underline">sign in</Link> to comment.</div>
      )}
    </div>
  )
}
