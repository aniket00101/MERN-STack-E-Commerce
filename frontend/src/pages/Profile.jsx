import React, { useEffect } from 'react'
import MyOrderPage from './MyOrderPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlice'
import { clearCart } from '../redux/slice/cartSlice'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCart())
    navigate("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 0%, rgba(234,179,8,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 100%, rgba(220,38,38,0.06) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="container mx-auto px-4 py-12 relative z-10">

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              My Account
            </span>
          </div>
          <h1 className="font-black leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '0.04em',
            }}>
            Profile
          </h1>
          <div className="mt-3 h-px w-16"
            style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="border border-white/8 p-6"
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>

              <div className="h-px mb-6 w-full"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 flex items-center justify-center text-black text-2xl font-black mb-4"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    background: 'linear-gradient(135deg, #EAB308, #DC2626)',
                    letterSpacing: '0.1em',
                  }}>
                  {initials}
                </div>

                <h2 className="font-black text-lg leading-none mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}>
                  {user?.name}
                </h2>

                <p className="text-white/35 text-xs tracking-wide mt-1 break-all"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {user?.email}
                </p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/8">
                {[
                  ['Member Since', new Date().getFullYear()],
                  ['Account Type', user?.role === 'admin' ? 'Admin' : 'Customer'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-white/30 uppercase tracking-widest"
                      style={{ fontFamily: "'Barlow', sans-serif" }}>{label}</span>
                    <span className="text-white/60 font-semibold"
                      style={{ fontFamily: "'Barlow', sans-serif" }}>{val}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 text-xs font-bold tracking-widest uppercase text-white border border-red-500/30 transition-all duration-300 hover:bg-red-500/10 hover:border-red-400"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Sign Out →
              </button>
            </div>
          </div>

          <div className="flex-1 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>

            <div className="px-6 py-5 border-b border-white/8 flex items-center gap-3">
              <div className="w-1 h-5" style={{ background: 'linear-gradient(to bottom, #EAB308, #DC2626)' }} />
              <h2 className="font-black tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
                Order History
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              <MyOrderPage />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile