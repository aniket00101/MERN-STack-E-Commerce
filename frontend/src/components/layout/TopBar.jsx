import React from "react"
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const TopBar = () => {
  return (
    <div className="relative sticky top-0 z-50 border-b border-white/6"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600&display=swap');`}</style>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="container mx-auto flex items-center justify-between py-2.5 px-4 sm:px-6">

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-5">
          {[
            { href: '#', icon: <TbBrandMeta className="w-4 h-4" />, label: 'Meta' },
            { href: '#', icon: <IoLogoInstagram className="w-4 h-4" />, label: 'Instagram' },
            { href: '#', icon: <RiTwitterXLine className="w-3.5 h-3.5" />, label: 'Twitter' },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href}
              className="text-white/30 hover:text-yellow-400 transition-colors duration-300"
              aria-label={label}>
              {icon}
            </a>
          ))}
        </div>

        {/* Announcement */}
        <div className="flex-1 text-center">
          <span className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>
            <span className="text-white/30">✦ &nbsp;</span>
            <span style={{
              background: 'linear-gradient(90deg, #EAB308, #DC2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Free Worldwide Shipping
            </span>
            <span className="text-white/30"> &nbsp;on Orders Over ₹999 &nbsp;✦</span>
          </span>
        </div>

        {/* Phone */}
        <div className="hidden md:flex items-center">
          <a href="tel:+918697544131"
            className="text-xs font-semibold tracking-widest text-black px-4 py-1.5 transition-opacity hover:opacity-80"
            style={{
              fontFamily: "'Barlow', sans-serif",
              background: 'linear-gradient(90deg, #EAB308, #DC2626)',
              clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
            }}>
            +91 86975 44131
          </a>
        </div>

      </div>
    </div>
  )
}

export default TopBar