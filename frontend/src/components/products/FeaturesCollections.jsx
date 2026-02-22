import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp"

const FeaturesCollections = () => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-[#0F1E33] relative overflow-hidden">

      {/* Subtle Glow Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] 
      bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] 
      bg-blue-600/20 rounded-full blur-[120px]"></div>

      <div className="container mx-auto relative z-10">

        <div className="flex flex-col-reverse lg:flex-row items-center 
        bg-white/5 backdrop-blur-2xl 
        border border-white/10 
        rounded-3xl overflow-hidden shadow-2xl">

          {/* Text Section */}
          <div className="lg:w-1/2 p-8 sm:p-12 text-center lg:text-left">

            <p className="text-purple-400 font-semibold uppercase tracking-wider mb-3">
              Everyday Essentials
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 
            font-bold text-white leading-tight mb-6">
              Designed for Comfort. <br className="hidden sm:block"/>
              Built for Confidence.
            </h2>

            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Discover premium-quality apparel crafted for modern lifestyles. 
              From effortless casual wear to refined statement pieces, 
              our collections are designed to move with you — every day, everywhere.
            </p>

            <Link
              to="/collections/all"
              className="inline-block bg-gradient-to-r 
              from-purple-600 via-blue-600 to-indigo-600
              text-white px-8 py-3 rounded-xl 
              font-semibold text-base sm:text-lg
              hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Collection →
            </Link>

          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">

            <img
              src={featured}
              alt="Premium featured collection"
              className="w-full h-[300px] sm:h-[400px] lg:h-full 
              object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
            />

          </div>

        </div>

      </div>
    </section>
  )
}

export default FeaturesCollections