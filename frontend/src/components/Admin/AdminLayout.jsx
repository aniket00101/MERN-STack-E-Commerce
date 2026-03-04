import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import AdminSideBar from './AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      {/* Mobile topbar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-white/8 z-20 flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="text-white/50 hover:text-white transition-colors">
            <FaBars size={20} />
          </button>
          <span className="font-black"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '20px',
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            NexMart Admin
          </span>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isSideBarOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsSideBarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-60 z-20 border-r border-white/8 transform transition-transform duration-300 md:static md:translate-x-0 md:flex-shrink-0 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}>
        <AdminSideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6"
        style={{ background: 'rgba(0,0,0,0.8)' }}>
        <div className="border border-white/8 min-h-[calc(100vh-80px)] p-4 sm:p-6"
          style={{ background: 'rgba(255,255,255,0.01)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout