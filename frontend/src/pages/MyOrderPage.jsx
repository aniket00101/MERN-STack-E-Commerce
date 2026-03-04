import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchUserOrders } from '../redux/slice/orderSlice'

const StatusBadge = ({ isPaid }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-widest uppercase"
    style={{
      fontFamily: "'Barlow', sans-serif",
      background: isPaid ? 'rgba(16,185,129,0.08)' : 'rgba(220,38,38,0.08)',
      border: `1px solid ${isPaid ? 'rgba(16,185,129,0.3)' : 'rgba(220,38,38,0.3)'}`,
      color: isPaid ? '#34d399' : '#f87171',
    }}>
    <span className="w-1.5 h-1.5 rounded-full" style={{ background: isPaid ? '#34d399' : '#f87171' }} />
    {isPaid ? 'Paid' : 'Pending'}
  </span>
)

const MyOrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  const handleRowClick = (orderId) => navigate(`/order/${orderId}`)

  if (loading) return (
    <div className="flex items-center gap-3 py-10 justify-center">
      <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-white/30 text-xs tracking-widest uppercase"
        style={{ fontFamily: "'Barlow', sans-serif" }}>Loading orders…</p>
    </div>
  )

  if (error) return (
    <p className="text-red-400 text-sm tracking-widest uppercase py-8 text-center"
      style={{ fontFamily: "'Barlow', sans-serif" }}>
      Error: {error}
    </p>
  )

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="text-5xl opacity-10">📦</div>
      <p className="text-white/25 text-xs tracking-widest uppercase"
        style={{ fontFamily: "'Barlow', sans-serif" }}>
        No orders yet
      </p>
    </div>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {['Item', 'Order ID', 'Date', 'Shipping', 'Items', 'Total', 'Status'].map((h) => (
                <th key={h}
                  className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-white/25"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border-b border-white/5 cursor-pointer transition-all duration-300 group hover:border-yellow-500/20"
                style={{ background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(234,179,8,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td className="px-4 py-4">
                  <div className="relative w-11 h-11 overflow-hidden flex-shrink-0">
                    <img src={order.orderItems[0]?.image} alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: 'brightness(0.9)' }} />
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="font-mono text-xs text-white/50 group-hover:text-yellow-400/70 transition-colors">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                </td>

                <td className="px-4 py-4 text-white/35 text-xs"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>

                <td className="px-4 py-4 text-white/35 text-xs"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {order.shippingAddress
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "N/A"}
                </td>

                <td className="px-4 py-4 text-white/35 text-xs text-center"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {order.orderItems.length}
                </td>

                <td className="px-4 py-4">
                  <span className="font-black"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '17px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    ₹ {order.totalPrice?.toLocaleString()}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge isPaid={order.isPaid} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => handleRowClick(order._id)}
            className="border border-white/8 p-4 cursor-pointer transition-all duration-300 hover:border-yellow-500/20 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            {/* Top hover line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <div className="flex items-start gap-4">
              <img src={order.orderItems[0]?.image} alt=""
                className="w-14 h-16 object-cover flex-shrink-0"
                style={{ filter: 'brightness(0.9) contrast(1.05)' }} />

              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-white/40 mb-1">
                  #{order._id.slice(-8).toUpperCase()}
                </p>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-black"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '20px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    ₹ {order.totalPrice?.toLocaleString()}
                  </span>
                  <StatusBadge isPaid={order.isPaid} />
                </div>

                <p className="text-white/30 text-xs"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  📍 {order.shippingAddress?.city}, {order.shippingAddress?.country}
                </p>

                <p className="text-white/20 text-xs mt-1"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  {' · '}
                  {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyOrderPage