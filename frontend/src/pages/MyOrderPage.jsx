import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyOrderPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            const mockOrder = [
                {
                    _id: "12345",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 1",
                            image: "https://picsum.photos/500/500?random=1"
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true
                },
                {
                    _id: "12395",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 2",
                            image: "https://picsum.photos/500/500?random=2"
                        },
                    ],
                    totalPrice: 250,
                    isPaid: false
                },
            ]
            setOrders(mockOrder)
            setLoading(false)
        }, 1000)
    }, [])

    const navigate = useNavigate()

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }

    return (
        <div className="w-full min-h-screen bg-gray-950 text-gray-200 p-4 sm:p-6">

            <h2 className="text-3xl font-bold mb-8 text-white"> My Orders </h2>

            {loading ? (
                <div className="text-gray-400 animate-pulse"> Loading your orders... </div>
            ) : orders.length === 0 ? ( 
            <div className="text-gray-500 text-center py-12"> You have no orders. </div>
            ) : (
                <>
                    <div className="hidden md:block overflow-x-auto bg-gray-900 border border-gray-800 rounded-2xl shadow-xl">
                        <table className="min-w-full text-sm text-gray-300">
                            <thead className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Image</th>
                                    <th className="px-6 py-4 text-left">Order ID</th>
                                    <th className="px-6 py-4 text-left">Created</th>
                                    <th className="px-6 py-4 text-left">Shipping</th>
                                    <th className="px-6 py-4 text-left">Items</th>
                                    <th className="px-6 py-4 text-left">Price</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} onClick={() => handleRowClick(order._id)} className="border-t border-gray-800 hover:bg-gray-800/60 cursor-pointer ">
                                        <td className="px-6 py-4">
                                            <img src={order.orderItems[0].image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-white"> #{order._id} </td>

                                        <td className="px-6 py-4 text-gray-400"> {new Date(order.createdAt).toLocaleDateString()} </td>

                                        <td className="px-6 py-4 text-gray-400"> {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"} </td>

                                        <td className="px-6 py-4 text-gray-400"> {order.orderItems.length} </td>

                                        <td className="px-6 py-4 font-semibold text-white"> ${order.totalPrice} </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700" : "bg-red-900/40 text-red-400 border border-red-700"}`}> {order.isPaid ? "Paid" : "Pending"} </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-5">
                        {orders.map((order) => (

                            <div key={order._id} onClick={() => handleRowClick(order._id)} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg cursor-pointer hover:bg-gray-800 transition" >
                                <div className="flex items-center gap-4">
                                     
                                    <img src={order.orderItems[0].image} alt="" className="w-16 h-16 rounded-lg object-cover"/>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white"> Order #{order._id} </h3>

                                        <p className="text-gray-400 text-sm"> ${order.totalPrice} </p>
                                    </div>
                                </div>

                                <div className="mt-3 text-sm text-gray-400"> {order.shippingAddress.city}, {order.shippingAddress.country} </div>

                                <div className="mt-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isPaid ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700" : "bg-red-900/40 text-red-400 border border-red-700"}`}> {order.isPaid ? "Paid" : "Pending"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MyOrderPage