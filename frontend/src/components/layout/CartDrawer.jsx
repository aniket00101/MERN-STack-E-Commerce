import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContent from '../cart/CartContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartDrawer = ({ drawerOPen, toogleCartDrawer }) => {
  const navigate = useNavigate()
  const { user, guestId } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  const userId = user ? user._id : null

  const handleCheckout = () => {
    toogleCartDrawer()
    if (!user) navigate("/login?redirect=checkout")
    else navigate("/checkout")
  }

  const subtotal = cart?.products?.reduce((total, product) => total + product.price * product.quantity, 0)

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div
        onClick={toogleCartDrawer}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${drawerOPen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <div className={`fixed top-0 right-0 h-screen w-full sm:w-3/4 md:w-[28rem] lg:w-[32rem] z-50 flex flex-col transform transition-transform duration-300 border-l border-white/8 ${drawerOPen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}>

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-black tracking-wide text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.1em' }}>
              Your Cart
            </h2>
            {cart?.products?.length > 0 && (
              <span className="w-6 h-6 flex items-center justify-center text-black text-xs font-bold"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'linear-gradient(135deg, #EAB308, #DC2626)',
                }}>
                {cart.products.length}
              </span>
            )}
          </div>
          <button onClick={toogleCartDrawer}
            className="text-white/40 hover:text-white transition-colors p-1">
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-0"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#EAB308 transparent' }}>
          {cart?.products?.length > 0 ? (
            <CartContent cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-6xl opacity-10">🛍</div>
              <p className="text-white/25 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Your cart is empty
              </p>
            </div>
          )}
        </div>

        {cart?.products?.length > 0 && (
          <div className="px-5 py-5 border-t border-white/8 flex-shrink-0"
            style={{ background: 'rgba(0,0,0,0.6)' }}>

            <div className="flex justify-between items-center mb-4">
              <span className="text-white/40 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Subtotal
              </span>
              <span className="font-black"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '24px',
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.05em',
                }}>
                ₹ {subtotal?.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 font-bold tracking-widest uppercase text-sm text-black transition-opacity hover:opacity-90"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              }}>
              Proceed to Checkout →
            </button>

            <p className="text-white/25 text-xs mt-3 text-center tracking-wider"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}

      </div>
    </>
  )
}

export default CartDrawer