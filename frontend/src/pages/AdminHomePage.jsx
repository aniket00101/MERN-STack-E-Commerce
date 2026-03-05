import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrders } from "../redux/slice/adminOrderSlice"
import { fetchAdminProducts } from "../redux/slice/adminProductSlice"

const StatCard = ({ label, value, link, linkLabel, accent }) => (
  <div className="relative border border-white/8 p-7 group transition-all duration-300 hover:border-yellow-500/20 overflow-hidden"
    style={{ background: 'rgba(255,255,255,0.02)' }}>
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, ${accent === 'red' ? '#DC2626, #EAB308' : '#EAB308, #DC2626'})` }} />
    <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4"
      style={{ fontFamily: "'Barlow', sans-serif" }}>
      {label}
    </p>
    <p className="font-black leading-none mb-4"
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(32px, 4vw, 48px)',
        background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '0.04em',
      }}>
      {value}
    </p>
    {link && (
      <Link to={link}
        className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 hover:text-yellow-400 text-white/35"
        style={{ fontFamily: "'Barlow', sans-serif" }}>
        {linkLabel} →
      </Link>
    )}
  </div>
)

const AdminHomePage = () => {
  const dispatch = useDispatch()
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts)
  const { orders, totalOrders, totalSales, loading: orderLoading, error: ordersError } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    dispatch(fetchAdminProducts())
    dispatch(fetchAllOrders())
  }, [dispatch])

  const isLoading = productsLoading || orderLoading

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 0% 0%, rgba(234,179,8,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 100% 100%, rgba(220,38,38,0.05) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}>Overview</span>
        </div>
        <h1 className="font-black leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(38px, 5vw, 68px)',
            background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '0.04em',
          }}>
          Admin Dashboard
        </h1>
        <div className="mt-3 h-px w-16"
          style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 py-10">
          <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}>Loading data…</p>
        </div>
      ) : productsError ? (
        <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {ordersError}</p>
      ) : (
        <>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <StatCard label="Total Revenue" value={`₹ ${(totalSales || 0).toFixed(0)}`} accent="yellow" />
            <StatCard label="Total Orders" value={totalOrders} link="/admin/orders" linkLabel="Manage Orders" accent="red" />
            <StatCard label="Total Products" value={products.length} link="/admin/products" linkLabel="Manage Products" accent="yellow" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-1 h-5" style={{ background: 'linear-gradient(to bottom, #EAB308, #DC2626)' }} />
              <h2 className="font-black tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '0.1em' }}>
                Recent Orders
              </h2>
            </div>

            {orders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                  <div key={order._id}
                    className="relative border border-white/8 p-6 transition-all duration-300 hover:border-yellow-500/20 overflow-hidden group"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>

                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

                    <div className="flex justify-between items-start mb-4 gap-3">
                      <p className="font-mono text-xs text-white/30 break-all">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold tracking-widest uppercase border ${
                        order.status === "Completed"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/8"
                          : "border-yellow-500/30 text-yellow-400 bg-yellow-500/8"
                      }`}
                        style={{ fontFamily: "'Barlow', sans-serif" }}>
                        {order.status}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-white/25 tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Barlow', sans-serif" }}>Customer</p>
                      <p className="text-white/75 text-sm font-medium"
                        style={{ fontFamily: "'Barlow', sans-serif" }}>
                        {order.user.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white/25 tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Barlow', sans-serif" }}>Total</p>
                      <span className="font-black"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: '26px',
                          background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                          letterSpacing: '0.05em',
                        }}>
                        ₹ {order.totalPrice.toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-white/8 p-10 text-center text-white/25 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.01)' }}>
                No recent orders found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminHomePage