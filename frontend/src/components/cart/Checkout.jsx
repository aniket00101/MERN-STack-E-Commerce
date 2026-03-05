import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { createCheckout } from '../../redux/slice/checkoutSlice'

const inputClass = `w-full p-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors duration-300`
const inputStyle = { fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }

const FieldLabel = ({ children }) => (
  <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
    style={{ fontFamily: "'Barlow', sans-serif" }}>
    {children}
  </label>
)

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart, loading, error } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const [checkoutId, setCheckoutId] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "", lastName: "", address: "", city: "",
    postalCode: "", country: "", phone: "",
  })

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) navigate("/")
  }, [cart, navigate])

  const handleCreateCheckout = async (e) => {
    e.preventDefault()
    if (cart && cart.products.length > 0) {
      const res = await dispatch(createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: "Paypal",
        totalPrice: cart.totalPrice,
      }))
      if (res.payload?._id) setCheckoutId(res.payload._id)
    }
  }

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      )
      await handleFinalizeCheckout(checkoutId)
    } catch (error) { console.error(error) }
  }

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      )
      navigate("order-confirmation")
    } catch (error) { console.error(error) }
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading cart…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-red-400 text-sm tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>
    </div>
  )

  if (!cart || !cart.products || cart.products.length === 0) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white/30 text-sm tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Your cart is empty</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 30%, rgba(234,179,8,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 70%, rgba(220,38,38,0.06) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 relative z-10">

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Secure Checkout
            </span>
          </div>
          <h1 className="font-black leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '0.04em',
            }}>
            Complete Your Order
          </h1>
          <div className="mt-3 h-px w-16 mx-auto"
            style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="border border-white/8 p-6 sm:p-8"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>

            <form onSubmit={handleCreateCheckout}>

              <div className="mb-8 pb-8 border-b border-white/8">
                <h3 className="font-black mb-5 tracking-wide flex items-center gap-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
                  <span className="w-6 h-6 flex items-center justify-center text-black text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }}>1</span>
                  Contact Details
                </h3>
                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <input type="email" value={user ? user.email : ""} disabled
                    className={inputClass + " opacity-40 cursor-not-allowed"} style={inputStyle} />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-black mb-5 tracking-wide flex items-center gap-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
                  <span className="w-6 h-6 flex items-center justify-center text-black text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }}>2</span>
                  Delivery Address
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <FieldLabel>First Name</FieldLabel>
                    <input type="text" value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                      className={inputClass} style={inputStyle} required />
                  </div>
                  <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <input type="text" value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                      className={inputClass} style={inputStyle} required />
                  </div>
                </div>

                <div className="mb-4">
                  <FieldLabel>Street Address</FieldLabel>
                  <input type="text" value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className={inputClass} style={inputStyle} required />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <FieldLabel>City</FieldLabel>
                    <input type="text" value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className={inputClass} style={inputStyle} required />
                  </div>
                  <div>
                    <FieldLabel>Postal Code</FieldLabel>
                    <input type="text" value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className={inputClass} style={inputStyle} required />
                  </div>
                </div>

                <div className="mb-4">
                  <FieldLabel>Country</FieldLabel>
                  <input type="text" value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className={inputClass} style={inputStyle} required />
                </div>

                <div>
                  <FieldLabel>Phone Number</FieldLabel>
                  <input type="tel" value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className={inputClass} style={inputStyle} required />
                </div>
              </div>

              <div className="mt-6">
                {!checkoutId ? (
                  <button type="submit"
                    className="w-full py-4 font-bold tracking-widest uppercase text-sm text-black transition-opacity hover:opacity-90"
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                    }}>
                    Continue to Payment →
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <span className="w-6 h-6 flex items-center justify-center text-black text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }}>3</span>
                      <h3 className="font-black tracking-wide"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
                        Pay with PayPal
                      </h3>
                    </div>
                    <PaypalButton
                      amount={cart.totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={() => alert("Payment failed. Try again later.")}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="border border-white/8 p-6 sm:p-8 h-fit"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>

            <h3 className="font-black mb-6 tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.1em' }}>
              Order Summary
            </h3>

            <div className="mb-6 pb-4 border-b border-white/8 space-y-4">
              {cart.products.map((product, index) => (
                <div key={index} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
                  <div className="relative flex-shrink-0">
                    <img src={product.image} alt={product.name}
                      className="w-16 h-20 object-cover"
                      style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-black text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)', fontFamily: "'Barlow', sans-serif" }}>
                      {product.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white/85 mb-1 truncate"
                      style={{ fontFamily: "'Barlow', sans-serif" }}>
                      {product.name}
                    </h3>
                    <p className="text-white/35 text-xs tracking-wider" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Size: <span className="text-yellow-400/70">{product.size}</span>
                      {' · '}
                      Color: <span className="text-red-400/70">{product.color}</span>
                    </p>
                  </div>
                  <p className="font-black text-sm flex-shrink-0"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '18px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    ₹ {product.price?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[['Subtotal', `₹ ${cart.totalPrice?.toLocaleString()}`], ['Shipping', 'Free']].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40" style={{ fontFamily: "'Barlow', sans-serif" }}>{label}</span>
                  <span className="text-white/70 font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>{val}</span>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/8">
                <span className="font-black tracking-wide"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '0.1em' }}>
                  Total
                </span>
                <span className="font-black"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '26px',
                    background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    letterSpacing: '0.05em',
                  }}>
                  ₹ {cart.totalPrice?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/8 grid grid-cols-3 gap-3">
              {['🔒 Secure Pay', '🚚 Free Ship', '↩ 45-Day Returns'].map((badge) => (
                <div key={badge} className="text-center py-2 border border-white/6 text-xs text-white/30 tracking-wide"
                  style={{ fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.02)' }}>
                  {badge}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout