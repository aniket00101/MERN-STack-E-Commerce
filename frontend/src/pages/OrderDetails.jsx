import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetails = () => {
    const { id } = useParams()
    const [orderDetails, setOrderDetails] = useState(null)
    
    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "PayPal",
            shippingMethod: "Standard",
            shippingAddress: { city: "New York", country: "USA" },
            orderItems: [
                {
                    productId: "1",
                    name: "Jacket",
                    price: 120,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=1",
                },
                {
                    productId: "2",
                    name: "T-Shirt",
                    price: 150,
                    quantity: 2,
                    image: "https://picsum.photos/150?random=2",
                },
            ],
        };
        setOrderDetails(mockOrderDetails)
    }, [id])
    
    return (
        <div className='min-h-screen bg-gray-950 text-gray-200'>
            <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
                
                <h2 className='text-3xl lg:text-4xl font-bold mb-8 text-white'> Order Details </h2>

                {!orderDetails ? (
                    <p className='text-center text-gray-400 py-12'> No Order Detail Found </p>
                ) : (
                    <div className='bg-gray-900 p-6 lg:p-8 rounded-2xl border border-gray-800 shadow-xl'>
                        
                        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12'>
                            <div>
                                
                                <h3 className='text-2xl font-bold text-white'> Order ID: #{orderDetails._id} </h3>
                                
                                <p className='text-gray-400 mt-2'> Placed on {new Date(orderDetails.createdAt).toLocaleDateString()} </p>
                            
                            </div>

                            <div className='flex gap-3 flex-wrap'>
                                <span className={`${orderDetails.isPaid ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700" : "bg-red-900/40 text-red-400 border border-red-700"} px-4 py-2 rounded-full text-sm font-semibold`}> {orderDetails.isPaid ? "Paid" : "Pending"} </span>

                                <span className={`${orderDetails.isDelivered ? "bg-green-900/40 text-green-400 border border-green-700" : "bg-yellow-900/40 text-yellow-400 border border-yellow-700"} px-4 py-2 rounded-full text-sm font-semibold`}> {orderDetails.isDelivered ? "Delivered" : "Shipping"} </span>

                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                            
                            <div className='bg-gray-800 p-6 rounded-xl border border-gray-700'>

                                <h4 className='text-lg font-semibold mb-3 text-white'> Payment Info </h4>

                                <p className='text-gray-400 mb-2'> <span className='font-medium text-gray-300'>Method:</span> {orderDetails.paymentMethod} </p>

                                <p className='text-gray-400'> <span className='font-medium text-gray-300'>Status:</span> {orderDetails.isPaid ? "Paid" : "Unpaid"} </p>

                            </div>

                            <div className='bg-gray-800 p-6 rounded-xl border border-gray-700'>

                                <h4 className='text-lg font-semibold mb-3 text-white'> Shipping Info </h4>

                                <p className='text-gray-400 mb-2'> <span className='font-medium text-gray-300'>Method:</span> {orderDetails.shippingMethod} </p>

                                <p className='text-gray-400'> <span className='font-medium text-gray-300'>Address:</span> {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country} </p>

                            </div>

                        </div>

                        <div>
                            <h4 className='text-2xl font-bold mb-6 text-white'> Order Items ({orderDetails.orderItems.length}) </h4>

                            <div className='space-y-5'>
                                {orderDetails.orderItems.map((item) => (

                                    <div key={item.productId} className='flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-800 p-5 rounded-xl border border-gray-700 hover:bg-gray-750 transition'>

                                        <img src={item.image} alt={item.name} className='w-20 h-20 object-cover rounded-lg'/>

                                        <div className='flex-1'>

                                            <Link to={`/product/${item.productId}`} className='text-lg font-semibold text-white hover:text-emerald-400 transition'> {item.name}
                                            </Link>

                                            <p className='text-gray-400 text-sm mt-1'> Price: ${item.price.toFixed(2)} | Qty: {item.quantity} </p>

                                        </div>

                                        <div className='text-right'>

                                            <p className='text-xl font-bold text-emerald-400'> ${(item.price * item.quantity).toFixed(2)} </p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-10'>

                            <Link to="/my-orders" className='inline-block bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-xl border border-gray-700 transition'> ← Back to My Orders </Link>
                            
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDetails