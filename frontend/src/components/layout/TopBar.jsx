import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="relative sticky top-0 z-50 bg-[#0F1E33]/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">

      {/* Gradient Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-70"></div>

      <div className="container mx-auto flex items-center justify-between py-3 px-6 text-gray-300">

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-6 text-lg">

          <a
            href="#"
            className="hover:text-purple-400 hover:scale-110 transition duration-300"
          >
            <TbBrandMeta />
          </a>

          <a
            href="#"
            className="hover:text-purple-400 hover:scale-110 transition duration-300"
          >
            <IoLogoInstagram />
          </a>

          <a
            href="#"
            className="hover:text-purple-400 hover:scale-110 transition duration-300"
          >
            <RiTwitterXLine />
          </a>

        </div>

        {/* Announcement */}
        <div className="text-sm text-center flex-grow font-medium tracking-wide">
          <span className="text-gray-400 animate-pulse">
            Free Worldwide Shipping on Orders Over $100
          </span>
        </div>

        {/* Contact */}
        <div className="hidden md:block">
          <a
            href="tel:+918697544131"
            className="px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition duration-300 text-xs font-semibold tracking-wide"
          >
            +91 86975 44131
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;