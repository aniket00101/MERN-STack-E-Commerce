import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrders} from "../redux/slice/adminOrderSlice"
import {fetchAdminProducts} from "../redux/slice/adminProductSlice"

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const {products, loading: productsLoading, error: productsError} = useSelector((state) => state.adminProducts)
    const {orders, totalOrders, totalSales, loading: orderLoading, error: ordersError} = useSelector((state) => state.adminOrders)

    useEffect(() => {
        dispatch(fetchAdminProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])

    return (
        <div className="min-h-screen p-6 lg:p-10 bg-gradient-to-br from-gray-950 via-slate-900 to-black text-gray-200 relative overflow-hidden"> 

            <h1 className="text-4xl font-black mb-12 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"> Admin Dashboard </h1>

            {productsLoading || orderLoading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className='text-red-500'>Error fetching products: {productsError}</p>
            ) : ordersError ? (
                <p className='text-red-500'>Error fetching orders: {ordersError}</p>
            ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

                    <h2 className="text-gray-400 text-sm uppercase tracking-wider"> Revenue </h2>

                    <p className="text-4xl font-bold mt-4 text-white"> Rs {(totalSales || 0).toFixed(2)} </p>

                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

                    <h2 className="text-gray-400 text-sm uppercase tracking-wider"> Total Orders </h2>

                    <p className="text-4xl font-bold mt-4 text-white"> {totalOrders} </p>

                    <Link to="/admin/orders" className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-semibold"> Manage Orders → </Link>

                </div>
                

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300">

                    <h2 className="text-gray-400 text-sm uppercase tracking-wider"> Total Products </h2>

                    <p className="text-4xl font-bold mt-4 text-white"> {products.length} </p>

                    <Link to="/admin/product" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300 font-semibold" > Manage Products → </Link>

                </div>
            </div>
            )}

            <div className="mt-20">

                <h2 className="text-2xl font-bold text-white mb-10"> Recent Orders </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {orders.length > 0 ? (
                        orders.map((order) => (

                            <div key={order._id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300" >
                                <div className="flex justify-between items-center mb-5">

                                    <p className="text-sm text-gray-400"> Order ID </p>

                                    <span className={`px-4 py-1 text-xs rounded-full font-semibold ${order.status === "Completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30" }`}> {order.status} </span>

                                </div>

                                <h3 className="text-xl font-bold text-white mb-4"> #{order._id} </h3>

                                <div className="mb-4">

                                    <p className="text-sm text-gray-400"> Customer </p>

                                    <p className="text-gray-200 font-medium"> {order.user.name} </p>

                                </div>

                                <div>
                                    <p className="text-sm text-gray-400"> Total Amount </p>
                                    <p className="text-3xl font-bold text-white"> ${order.totalPrice.toFixed(2)} </p>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-10"> No recent orders found. </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage