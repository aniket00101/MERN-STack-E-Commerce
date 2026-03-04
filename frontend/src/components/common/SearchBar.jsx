// ── SearchBar.jsx ─────────────────────────────────────────────────────
import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductByFilters, setFilters } from '../../redux/slice/productSlice'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchToggle = () => setIsOpen(!isOpen)

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setFilters({ search: searchTerm }))
    dispatch(fetchProductByFilters({ search: searchTerm }))
    navigate(`/collections/all?search=${searchTerm}`)
    setIsOpen(false)
  }

  return (
    <div className="relative flex items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600&display=swap');
        @keyframes searchFadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .search-animate { animation: searchFadeIn 0.25s ease forwards; }
      `}</style>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleSearchToggle() }}>

          <div className="search-animate w-full max-w-2xl">

            {/* Close */}
            <div className="flex justify-end mb-4">
              <button onClick={handleSearchToggle}
                className="text-white/30 hover:text-white transition-colors p-1">
                <HiMiniXMark className="h-7 w-7" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="relative">
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <input
                type="text"
                placeholder="Search products, brands and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="w-full text-white text-base py-4 px-5 pr-14 focus:outline-none border border-white/10  placeholder-white/20"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                }}
              />

              <button type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-yellow-400 transition-colors duration-300">
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
            </form>

            <p className="mt-3 text-white/20 text-xs tracking-widest text-center uppercase"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Press Enter to search · Esc to close
            </p>
          </div>
        </div>
      ) : (
        <button onClick={handleSearchToggle}
          className="transition-colors duration-300">
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

export default SearchBar