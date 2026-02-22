import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br 
    from-[#0F1E33] via-[#0c1629] to-[#0a1424] 
    text-gray-300 pt-16 pb-8 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] 
      bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] 
      bg-blue-600/20 rounded-full blur-[120px]"></div>

      <div className="container mx-auto grid grid-cols-1 
      sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 relative z-10">

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Newsletter
          </h3>

          <p className="text-gray-400 mb-4 text-sm">
            Be the first to discover new arrivals, exclusive drops, and special offers.
          </p>

          <p className="font-medium text-sm text-purple-400 mb-6">
            Sign up & get 10% off your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm 
              bg-white/5 border border-white/10 
              rounded-l-md focus:outline-none 
              focus:ring-2 focus:ring-purple-500 
              placeholder-gray-500"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r 
              from-purple-600 to-blue-600
              text-white px-6 py-3 text-sm 
              rounded-r-md hover:opacity-90 
              transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Shop
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="#" className="hover:text-purple-400 transition">Men's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">Women's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">Men's Bottom Wear</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">Women's Bottom Wear</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="#" className="hover:text-purple-400 transition">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">About Us</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-purple-400 transition">Features</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex items-center space-x-5 mb-6">

            <a href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition">
              <TbBrandMeta className="h-5 w-5" />
            </a>

            <a href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition">
              <IoLogoInstagram className="h-5 w-5" />
            </a>

            <a href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition">
              <RiTwitterXLine className="h-4 w-4" />
            </a>

          </div>

          <p className="text-gray-400 text-sm mb-2">
            Call Us
          </p>

          <p className="text-white text-sm flex items-center">
            <FiPhoneCall className="inline-block mr-2 text-purple-400" />
            8697544131
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto mt-16 px-4 border-t border-white/10 pt-6 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          © 2026 CompileTab. All Rights Reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer