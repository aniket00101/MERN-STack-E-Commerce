import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice'

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity, guestId, userId, size, color }))
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }))
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>
      <div className="space-y-4">
        {cart.products.map((product, index) => (
          <div key={index}
            className="group flex items-start gap-4 p-4 border border-white/8 transition-all duration-300 hover:border-yellow-500/20"
            style={{ background: 'rgba(255,255,255,0.02)' }}>

            <div className="absolute left-0 top-0 w-0 group-hover:w-full h-px transition-all duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <div className="relative flex-shrink-0">
              <img src={product.image} alt={product.name}
                className="w-16 h-20 object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-white/85 mb-1 truncate"
                style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
                {product.name}
              </h3>
              <p className="text-xs text-white/35 mb-3 tracking-wider" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Size: <span className="text-yellow-400/70">{product.size}</span>
                {' · '}
                Color: <span className="text-red-400/70">{product.color}</span>
              </p>

              <div className="flex items-center border border-white/10 w-fit"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <button
                  onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all border-r border-white/10 text-base">
                  −
                </button>
                <span className="w-9 text-center font-black text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.1em' }}>
                  {product.quantity}
                </span>
                <button
                  onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all border-l border-white/10 text-base">
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <span className="font-black"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px',
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.05em',
                }}>
                ₹ {product.price?.toLocaleString()}
              </span>
              <button
                onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                className="text-white/25 hover:text-red-400 transition-colors duration-300">
                <RiDeleteBin3Line className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default CartContent