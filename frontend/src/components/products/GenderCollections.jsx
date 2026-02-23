import React from 'react'
import mens from "../../assets/Men.jpg"
import women from "../../assets/women.jpg"
import { Link } from 'react-router-dom'

const GenderCollections = () => {
  return (
    <section className="relative py-20 px-4 lg:px-0 bg-[#0F1E33] overflow-hidden">

      <div className="container relative z-10 mx-auto flex flex-col md:flex-row gap-10">

        <div className="relative flex-1 group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

          <img src={women} alt="Women collection" className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700"/>

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-10 z-10">

            <h2 className="text-3xl font-bold text-white mb-4"> Women's Collections </h2>

            <Link to="/collections/all?gender=Women" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"> Shop Now → </Link>

          </div>
        </div>

        <div className="relative flex-1 group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

          <img src={mens} alt="Men collection" className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-700" />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-10 z-10">

            <h2 className="text-3xl font-bold text-white mb-4"> Men's Collections </h2>

            <Link to="/collections/all?gender=Men" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"> Shop Now → </Link>
            
          </div>
        </div>

      </div>
    </section>
  )
}

export default GenderCollections