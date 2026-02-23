import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

const TopBar = () => {
  return (
    <div className=" sticky top-0 z-50 bg-[#0F1E33]/80 backdrop-blur-2xl border-b border-white/5 text-gray-300 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">

      <div className="container mx-auto flex justify-between items-center py-3 px-4">

        <div className="hidden md:flex items-center space-x-5">

          <a href="#" className="hover:text-purple-400 transition duration-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>

          <a href="#" className="hover:text-purple-400 transition duration-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>

          <a href="#" className="hover:text-purple-400 transition duration-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>

        </div>

        <div className="text-sm text-center flex-grow font-medium tracking-wide">

          <span className="text-gray-400"> Free Worldwide Shipping on Orders Over $100 </span>

        </div>

        <div className="text-sm hidden md:block">

          <a href="tel:+8697544131" className="hover:text-purple-400 transition duration-300"> + (91) 8697544131 </a>
          
        </div>

      </div>
    </div>
  )
}

export default TopBar