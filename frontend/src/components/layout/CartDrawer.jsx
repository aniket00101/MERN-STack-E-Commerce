import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContent from '../cart/CartContent'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({ drawerOPen, toogleCartDrawer }) => {
  const navigate = useNavigate()

  const handleCheckout = () => {
    toogleCartDrawer()
    navigate("/checkout")
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={toogleCartDrawer}
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300
          ${drawerOPen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0
        w-3/4 sm:w-1/2 md:w-[28rem]
        h-full
        bg-[#0f172a]
        text-gray-200
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        transform transition-transform duration-300
        flex flex-col
        z-50
        ${drawerOPen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-white/10'>
          <h2 className='text-lg font-semibold tracking-wide'>
            Your Cart
          </h2>

          <button 
            onClick={toogleCartDrawer}
            className='hover:text-purple-400 transition'
          >
            <IoMdClose className='h-6 w-6' />
          </button>
        </div>

        {/* Cart Items */}
        <div className='flex-grow px-6 py-4 overflow-y-auto'>
          <CartContent />
        </div>

        {/* Footer */}
        <div className='px-6 py-5 border-t border-white/10 bg-[#0b1220]'>

          <button
            onClick={handleCheckout}
            className='
              w-full
              bg-purple-600
              hover:bg-purple-700
              py-3
              rounded-xl
              font-semibold
              transition
              shadow-lg
            '
          >
            Proceed to Checkout
          </button>

          <p className='text-xs text-gray-400 mt-3 text-center'>
            Shipping, taxes, and discounts calculated at checkout.
          </p>

        </div>

      </div>
    </>
  )
}

export default CartDrawer