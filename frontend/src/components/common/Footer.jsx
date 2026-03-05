import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi"

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-20 pb-8 overflow-hidden">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(234,179,8,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(220,38,38,0.06) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="container mx-auto px-4 relative z-10">

        <div className="mb-14 pb-10 border-b border-white/8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-black leading-none mb-1"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 5vw, 60px)',
                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.06em',
              }}>
              NextMart
            </h2>
            <p className="text-white/35 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Style. Confidence. Identity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: 'https://www.facebook.com', icon: <TbBrandMeta className="w-4 h-4" />, label: 'Meta' },
              { href: 'https://www.instagram.com', icon: <IoLogoInstagram className="w-4 h-4" />, label: 'Instagram' },
              { href: 'https://www.twitter.com', icon: <RiTwitterXLine className="w-4 h-4" />, label: 'Twitter' },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 border border-white/10 text-white/40 hover:text-black transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #EAB308, #DC2626)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Newsletter
              </span>
            </div>

            <p className="text-white/40 text-sm mb-3 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Be the first to discover new arrivals, exclusive drops, and special offers.
            </p>

            <p className="text-sm mb-5"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              Sign up & get 10% off your first order.
            </p>

            <form className="flex" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 p-3 text-xs bg-white/5 border border-white/10 border-r-0 text-white placeholder-white/25 focus:outline-none focus:border-yellow-500/50"
                style={{ fontFamily: "'Barlow', sans-serif" }}
                required
              />
              <button
                type="submit"
                className="px-5 py-3 text-xs font-bold tracking-widest uppercase text-black transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                }}
              >
                Join
              </button>
            </form>
          </div>

          <div>
            <h3 className="font-black mb-5 tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
              Shop
            </h3>
            <div className="mb-4 h-px w-8"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
            <ul className="space-y-3 text-white/40 text-sm" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map(item => (
                <li key={item}>
                  <Link to="#"
                    className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)', display: 'inline-block' }} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black mb-5 tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
              Support
            </h3>
            <div className="mb-4 h-px w-8"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
            <ul className="space-y-3 text-white/40 text-sm" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              {['Contact Us', 'About Us', 'FAQs', 'Features'].map(item => (
                <li key={item}>
                  <Link to="#"
                    className="hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)', display: 'inline-block' }} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black mb-5 tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
              Contact
            </h3>
            <div className="mb-4 h-px w-8"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <div className="flex items-center gap-3 p-4 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }}>
                <FiPhoneCall className="text-black text-sm" />
              </div>
              <div>
                <p className="text-white/30 text-xs tracking-widest uppercase mb-0.5"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Call Us
                </p>
                <p className="text-white font-semibold text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  8697544131
                </p>
              </div>
            </div>

            <p className="mt-4 text-white/25 text-xs leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Mon – Sat, 9am – 6pm IST
            </p>
          </div>

        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs tracking-widest"
            style={{ fontFamily: "'Barlow', sans-serif" }}>
            © 2026 CompileTab. All Rights Reserved.
          </p>
          <p className="text-xs tracking-widest"
            style={{
              fontFamily: "'Barlow', sans-serif",
              background: 'linear-gradient(90deg, #EAB308, #DC2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            ✦ &nbsp;Crafted with passion
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer