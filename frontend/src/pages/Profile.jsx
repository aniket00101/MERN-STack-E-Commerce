import React from 'react'
import MyOrderPage from './MyOrderPage'

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br 
    from-gray-950 via-slate-900 to-black text-white">

      <div className="container mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Profile Card */}
          <div className="w-full lg:w-1/4 
          bg-white/5 backdrop-blur-2xl 
          border border-white/10 
          rounded-3xl p-6 shadow-2xl">

            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full 
              bg-gradient-to-r from-purple-600 to-blue-600 
              flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
                JD
              </div>

              <h1 className="text-2xl font-bold mb-2">
                John Doe
              </h1>

              <p className="text-gray-400 mb-6">
                john@example.com
              </p>

              <button className="w-full bg-gradient-to-r 
              from-red-600 to-red-700 
              hover:from-red-500 hover:to-red-600 
              py-3 rounded-xl font-semibold 
              transition-all duration-300 
              hover:scale-105 active:scale-95 shadow-lg">
                Logout
              </button>

            </div>
          </div>

          {/* Orders Section */}
          <div className="w-full lg:w-3/4 
          bg-white/5 backdrop-blur-2xl 
          border border-white/10 
          rounded-3xl p-6 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6 
            bg-gradient-to-r from-blue-400 to-purple-400 
            bg-clip-text text-transparent">
              My Orders
            </h2>

            <MyOrderPage />

          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile