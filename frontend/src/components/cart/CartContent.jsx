import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice';

const CartContent = ({cart, userId, guestId}) => {
  const dispatch = useDispatch()
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta
    if(newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      )
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({productId, guestId, userId, size, color}))
  }

  return (
    <div className="space-y-5">
      {cart.products.map((product, index) => (

        <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:bg-white/10 transition">

          <div className='flex items-start gap-4'>

            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover rounded-xl shadow-md'/>

            <div>

              <h3 className=' font-semibold text-lg bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent'> {product.name}</h3>

              <p className='text-sm text-gray-400 mt-1'>
                Size: <span className="text-yellow-400">{product.size}</span> | 
                Color: <span className="text-red-400">{product.color}</span>
              </p>

              <div className='flex items-center mt-3'>

                <button className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1 text-lg font-medium transition' onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}> - </button>

                <span className='mx-4 text-yellow-400 font-semibold'> {product.quantity} </span>

                <button className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1 text-lg font-medium transition
                ' onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}>+</button>

              </div>

            </div>

          </div>

          <div className='text-right'>

            <p className='font-semibold text-lg text-red-400'> ₹ {product.price.toLocaleString()} </p>

            <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)} className='mt-3 hover:text-red-500 transition'> <RiDeleteBin3Line className="h-6 w-6 text-red-400" /> </button>

          </div>

        </div>

      ))}
    </div>
  )
}

export default CartContent