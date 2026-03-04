import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import { IoMdClose } from 'react-icons/io'
import SearchBar from './SearchBar'
import CartDrawer from '../layout/CartDrawer'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)
  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen)
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen)

  const navLinks = [
    { to: "/collections/all?gender=Men", label: "Men" },
    { to: "/collections/all?gender=Women", label: "Women" },
    { to: "/collections/all?category=Top Wear", label: "Top Wear" },
    { to: "/collections/all?category=Bottom Wear", label: "Bottom Wear" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #EAB308, #DC2626);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      {/* Main Nav */}
      <nav className="sticky top-0 z-40 border-b border-white/8"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}>

        {/* Bottom accent glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.4), rgba(220,38,38,0.4), transparent)' }} />

        <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">

          {/* Logo */}
          <Link to="/" className="font-black leading-none transition-opacity hover:opacity-80"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '26px',
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            NexMart
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={label} to={to}
                className="nav-link text-xs font-semibold tracking-widest uppercase text-white/55 hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {user?.role === "admin" && (
              <Link to="/admin"
                className="sm:inline-flex text-xs font-bold tracking-widest uppercase text-black px-4 py-1.5 transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                  clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
                }}>
                Admin
              </Link>
            )}

            <Link to="/profile"
              className="text-white/55 hover:text-white transition-colors duration-300">
              <HiOutlineUser className="h-5 w-5" />
            </Link>

            <button onClick={toggleCartDrawer}
              className="relative text-white/55 hover:text-white transition-colors duration-300">
              <HiOutlineShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-black text-[10px] font-bold"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: 'linear-gradient(135deg, #EAB308, #DC2626)',
                  }}>
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="text-white/55 hover:text-white transition-colors duration-300">
              <SearchBar />
            </div>

            <button onClick={toggleNavDrawer}
              className="md:hidden text-white/55 hover:text-white transition-colors duration-300">
              <HiBars3BottomRight className="h-6 w-6" />
            </button>

          </div>
        </div>
      </nav>

      <CartDrawer drawerOPen={drawerOpen} toogleCartDrawer={toggleCartDrawer} />

      {/* Mobile nav overlay */}
      <div
        onClick={toggleNavDrawer}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${navDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Mobile nav drawer */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full z-50 transform transition-transform duration-300 border-r border-white/8 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <span className="font-black"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            NexMart
          </span>
          <button onClick={toggleNavDrawer}
            className="text-white/40 hover:text-white transition-colors">
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-6 pt-8 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link key={label} to={to} onClick={toggleNavDrawer}
              className="flex items-center gap-3 py-3 text-sm font-semibold tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-300 border-b border-white/5"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              <span className="w-4 h-px" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar