import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import AdminSideBar from './AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a] text-gray-200 relative">

      <div className="flex md:hidden items-center p-4 bg-[#1e293b] border-b border-gray-700 z-20">

        <button onClick={toggleSidebar} className="text-gray-300 hover:text-white transition">  <FaBars size={24} />  </button>

        <h1 className="ml-4 text-xl font-semibold tracking-wide"> Admin Dashboard </h1>

      </div>

      {isSideBarOpen && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden" onClick={toggleSidebar} />
      )}

      <div className={`bg-[#111827] w-64 min-h-screen border-r border-gray-800 absolute md:relative transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>  <AdminSideBar />  </div>

      <div className="flex-grow p-6 overflow-auto bg-[#0f172a]">

        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-gray-800 min-h-[calc(100vh-48px)]">

          <Outlet />
          
        </div>
      </div>

    </div>
  )
}

export default AdminLayout