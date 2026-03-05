import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/slice/cartSlice"
import { logout } from "../../redux/slice/authSlice"

const navItems = [
  { to: "/admin/users",    icon: <FaUser className="text-xs" />,         label: "Users" },
  { to: "/admin/products", icon: <FaBoxOpen className="text-xs" />,      label: "Products" },
  { to: "/admin/orders",   icon: <FaClipboardList className="text-xs" />, label: "Orders" },
  { to: "/",               icon: <FaStore className="text-xs" />,         label: "Shop" },
]

const AdminSideBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    navigate("/")
  }

  return (
    <div className="flex flex-col h-full p-5">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="h-px mb-6 w-full"
        style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

      <Link to="/admin" className="mb-1">
        <span className="font-black leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '24px',
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
          NexMart
        </span>
      </Link>

      <p className="text-white/25 text-xs tracking-widest uppercase mb-8"
        style={{ fontFamily: "'Barlow', sans-serif" }}>
        Admin Panel
      </p>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                isActive
                  ? "text-black border-transparent"
                  : "text-white/40 border-transparent hover:text-white hover:border-white/10 hover:bg-white/3"
              }`
            }
            style={({ isActive }) => ({
              fontFamily: "'Barlow', sans-serif",
              background: isActive ? 'linear-gradient(90deg, #EAB308, #DC2626)' : 'transparent',
              clipPath: isActive ? 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' : 'none',
            })}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase text-white/40 border border-red-500/20 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300"
          style={{ fontFamily: "'Barlow', sans-serif" }}>
          <FaSignOutAlt className="text-xs" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default AdminSideBar