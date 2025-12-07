// src/components/Pagination.jsx
import React from 'react'

export default function Pagination({ pageCount = 1, onPageChange = () => {}, forcePage = 1 }) {
  // clamp values
  const current = Math.max(1, Math.min(forcePage || 1, pageCount || 1))
  const pagesToShow = 5 // how many page buttons to show
  const half = Math.floor(pagesToShow / 2)

  let start = Math.max(1, current - half)
  let end = Math.min(pageCount, start + pagesToShow - 1)
  if (end - start < pagesToShow - 1) start = Math.max(1, end - pagesToShow + 1)

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  const handleClick = (p) => {
    if (p === current) return
    onPageChange(p)
  }

  return (
    <nav className="flex justify-center mt-6" aria-label="Pagination">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => handleClick(Math.max(1, current - 1))}
          className="pag-btn px-3 py-1 rounded-md text-sm font-medium"
          disabled={current === 1}
        >
          &lt;
        </button>

        {start > 1 && (
          <>
            <button onClick={() => handleClick(1)} className="pag-btn px-3 py-1 rounded-md text-sm font-medium">1</button>
            {start > 2 && <span className="px-2 text-slate-500">...</span>}
          </>
        )}

        {pages.map(p => (
          <button
            key={p}
            onClick={() => handleClick(p)}
            className={`pag-btn px-3 py-1 rounded-md text-sm font-medium ${p === current ? 'pag-active' : 'text-slate-200'}`}
            aria-current={p === current ? 'page' : undefined}
          >
            {p}
          </button>
        ))}

        {end < pageCount && (
          <>
            {end < pageCount - 1 && <span className="px-2 text-slate-500">...</span>}
            <button onClick={() => handleClick(pageCount)} className="pag-btn px-3 py-1 rounded-md text-sm font-medium">{pageCount}</button>
          </>
        )}

        <button
          onClick={() => handleClick(Math.min(pageCount, current + 1))}
          className="pag-btn px-3 py-1 rounded-md text-sm font-medium"
          disabled={current === pageCount}
        >
          &gt;
        </button>
      </div>
    </nav>
  )
}
