import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOPtions = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (e) => {
    const sortBy = e.target.value

    const newParams = new URLSearchParams(searchParams)
    if (sortBy) {
      newParams.set("sortBy", sortBy)
    } else {
      newParams.delete("sortBy")
    }

    setSearchParams(newParams)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

      <p className="text-gray-400 text-sm sm:text-base"> Sort Products </p>
 
      <div className="relative w-full sm:w-64">

        <select id="sort" onChange={handleSortChange} value={searchParams.get("sortBy") || ""} className="w-full appearance-none bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 cursor-pointer">

          <option value="" className="bg-gray-900 text-white"> Default </option>

          <option value="priceAsc" className="bg-gray-900 text-white"> Price: Low to High </option>

          <option value="priceDesc" className="bg-gray-900 text-white"> Price: High to Low </option>

          <option value="popularity" className="bg-gray-900 text-white"> Popularity </option>

        </select>

        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"> ▼ </div>
        
      </div>
    </div>
  )
}

export default SortOPtions