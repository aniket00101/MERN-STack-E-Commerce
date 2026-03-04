import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import loginpic from '../assets/login.webp'
import { loginUser } from '../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCart } from '../redux/slice/cartSlice'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, guestId } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  const redirect = new URLSearchParams(location.search).get("redirect") || "/"
  const isCheckoutRedirect = redirect.includes("checkout")

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        })
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/")
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

  const inputClass = "w-full px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors duration-300 placeholder-white/20"
  const inputStyle = { fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-black relative overflow-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img src={loginpic} alt="" className="w-full h-full object-cover blur-xl scale-110" />
      </div>

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(234,179,8,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(220,38,38,0.07) 0%, transparent 60%)' }} />

      <div className="relative z-10 w-full max-w-md lg:max-w-4xl">
        <div className="lg:flex border border-white/8 overflow-hidden shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

          {/* ── Form ── */}
          <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">

            {/* Brand */}
            <div className="mb-8">
              <h1 className="font-black leading-none mb-1"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '32px',
                  letterSpacing: '0.1em',
                  background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                NexMart
              </h1>
              <div className="h-px w-10 mb-5"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <h2 className="font-black leading-none mb-2"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.9)',
                }}>
                Welcome Back
              </h2>
              <p className="text-white/35 text-sm"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                Enter your credentials to continue shopping
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Email Address
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                  className={inputClass} style={inputStyle} />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Password
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className={inputClass} style={inputStyle} />
              </div>

              <button type="submit"
                className="w-full py-4 font-bold tracking-widest uppercase text-sm text-black transition-opacity hover:opacity-90 mt-2"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                  clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                }}>
                Sign In →
              </button>
            </form>

            <p className="mt-8 text-center text-white/30 text-xs tracking-wide"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Don't have an account?{" "}
              <Link to={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                Create one now
              </Link>
            </p>
          </div>

          {/* ── Image panel ── */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            <img src={loginpic} alt="Welcome"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) contrast(1.1)', minHeight: '500px' }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.1) 0%, transparent 50%, rgba(220,38,38,0.15) 100%)' }} />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-black text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', letterSpacing: '0.06em' }}>
                Style That Speaks.
              </p>
              <div className="mt-2 h-px w-20"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login