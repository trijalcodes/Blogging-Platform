import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Home(){
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [q, setQ] = useState('')

  const fetch = async(p=1,search='')=>{
    const res = await api.get('/posts', { params: { page: p, limit: 6, search } })
    setPosts(res.data.posts)
    setTotalPages(res.data.totalPages)
  }

  useEffect(()=>{ fetch(page,q) },[page,q])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div layout className="glass p-4 rounded-2xl mb-6">
        <div className="flex gap-3">
          <input
            value={q}
            onChange={e=>{ setQ(e.target.value); setPage(1); }}
            className="flex-1 bg-transparent border px-3 py-2 rounded-md"
            placeholder="Search posts..."
          />
        </div>
      </motion.div>

      <section>
        {posts.map(p=> <PostCard key={p._id} post={p} />)}
      </section>

      <Pagination pageCount={totalPages} onPageChange={p=>setPage(p)} forcePage={page} />

      {/* Footer */}
      <div className="mt-10 mb-6 text-center text-slate-400">
        <div className="mb-2">Developed by <span className="text-slate-200 font-semibold">Trijal Shukla</span></div>

        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://github.com/trijalcodes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="hover:text-white hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>

          <a
            href="https://instagram.com/trijxl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="hover:text-pink-400 hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://linkedin.com/in/trijalshukla/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="hover:text-blue-400 hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
