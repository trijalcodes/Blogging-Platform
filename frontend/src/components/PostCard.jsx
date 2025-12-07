// src/components/PostCard.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function PostCard({post, onDeleted}) {
  const { user } = useAuth()
  const nav = useNavigate()
  const isAuthor = user && post.author && String(user.id) === String(post.author._id || post.author)

  const handleDelete = async () => {
    if(!confirm('Delete this post?')) return
    try {
      await api.delete(`/posts/${post._id}`)
      if(onDeleted) onDeleted(post._id)
    } catch(err) {
      alert(err?.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <motion.article layout whileHover={{ y:-4 }} className="glass p-6 rounded-2xl mb-6">
      <div className="flex justify-between items-start">
        <Link to={`/posts/${post._id}`} className="flex-1">
          <h3 className="text-xl font-semibold leading-snug">{post.title}</h3>
          <p className="mt-2 text-slate-400 line-clamp-3">{post.content}</p>
          <div className="mt-4 text-sm text-slate-500">By {post.author?.username || 'Unknown'}</div>
        </Link>

        {isAuthor && (
          <div className="ml-4 flex flex-col gap-2">
            <Link to={`/posts/edit/${post._id}`} className="text-sm px-2 py-1 border rounded-md">Edit</Link>
            <button onClick={handleDelete} className="text-sm px-2 py-1 bg-rose-600 rounded-md">Delete</button>
          </div>
        )}
      </div>
    </motion.article>
  )
}
