import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductByFilters, setFilters } from '../../redux/slice/productSlice'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSearchToggle = () => {
    setIsOpen(!isOpen)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setFilters({search: searchTerm}))
    dispatch(fetchProductByFilters({search: searchTerm}))
    navigate(`/collections/all?search=${searchTerm}`)
    setIsOpen(false)
  }

  return (
    <div className="relative flex items-center">

      {isOpen ? (
        <div className=" fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-28 px-4 animate-fadeIn">

          <form onSubmit={handleSearch} className="relative w-full max-w-2xl">

            <input type="text" placeholder="Search products, brands and more..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus className="w-full bg-[#0f172a] text-white border border-white/10 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:border-purple-500 transition " />

            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"> <HiMagnifyingGlass className="h-6 w-6" /> </button>

            <button type="button" onClick={handleSearchToggle} className="absolute -top-14 right-2 text-white hover:text-purple-400 transition"
            > <HiMiniXMark className="h-8 w-8" /> </button>

          </form>

        </div>
      ) : (
        <button onClick={handleSearchToggle} className="hover:text-purple-400 transition"> <HiMagnifyingGlass className="h-6 w-6" /> </button>
      )}

    </div>
  )
}

export default SearchBar