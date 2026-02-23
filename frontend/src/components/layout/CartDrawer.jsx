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
      <div onClick={toogleCartDrawer} className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${drawerOPen ? "opacity-100 visible" : "opacity-0 invisible"}`}/>

      <div className={`fixed top-0 right-0 h-screen w-full sm:w-3/4 md:w-1/2 lg:w-[28rem] xl:w-[32rem] bg-[#0f172a] text-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.6)] transform transition-transform duration-300 flex flex-col z-50
        ${drawerOPen ? "translate-x-0" : "translate-x-full"}`}>

        <div className='flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0f172a]/95 backdrop-blur-sm z-10'>

          <h2 className='text-lg sm:text-xl font-semibold tracking-wide'> Your Cart </h2>

          <button onClick={toogleCartDrawer} className='hover:text-purple-400 transition text-lg sm:text-2xl p-1 rounded hover:bg-white/10' aria-label="Close Cart" > <IoMdClose className='h-6 w-6 sm:h-7 sm:w-7' /> </button>

        </div>

        <div className='flex-grow px-4 sm:px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pb-24 sm:pb-4'> <CartContent /> </div>

        <div className='px-4 sm:px-6 py-6 border-t border-white/10 bg-[#0b1220]/95 backdrop-blur-sm sticky bottom-0 z-10 shrink-0'>

          <div className='flex justify-between items-center mb-4 pb-2 border-b border-white/5'>

            <span className='text-sm sm:text-base font-medium text-gray-300'>Subtotal:</span>

            <span className='text-xl sm:text-2xl font-bold text-white'>$99.99</span>

          </div>
          
          <button
            onClick={handleCheckout} disabled={false} className='w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'> Proceed to Checkout </button>

          <p className='text-xs sm:text-sm text-gray-400 mt-3 text-center'> Shipping, taxes, and discounts calculated at checkout.</p>
          
        </div>
      </div>
    </>
  )
}

export default CartDrawer
