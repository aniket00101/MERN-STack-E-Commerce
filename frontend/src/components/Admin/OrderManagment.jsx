// ── OrderManagment.jsx ────────────────────────────────────────────────
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllOrders, updateOrderStatus } from "../../redux/slice/adminOrderSlice"

const statusColors = {
  Delivered: { border: 'rgba(16,185,129,0.3)', text: '#34d399', bg: 'rgba(16,185,129,0.06)' },
  Shipped:   { border: 'rgba(59,130,246,0.3)', text: '#60a5fa', bg: 'rgba(59,130,246,0.06)' },
  Cancelled: { border: 'rgba(220,38,38,0.3)',  text: '#f87171', bg: 'rgba(220,38,38,0.06)' },
  Processing:{ border: 'rgba(234,179,8,0.3)',  text: '#facc15', bg: 'rgba(234,179,8,0.06)' },
}

const selectStyle = {
  fontFamily: "'Barlow', sans-serif",
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(8px)',
}

export const OrderManagment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { orders, loading, error } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/")
    else dispatch(fetchAllOrders())
  }, [dispatch, user, navigate])

  const handleStatusChange = (orderId, status) => dispatch(updateOrderStatus({ id: orderId, status }))

  if (loading) return <div className="flex items-center gap-3 py-10"><div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" /><p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading…</p></div>
  if (error) return <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-red-500/30 bg-red-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Admin</span>
        </div>
        <h2 className="font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 58px)', background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.04em' }}>
          Order Management
        </h2>
        <div className="mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
      </div>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const sc = statusColors[order.status] || statusColors.Processing
            return (
              <div key={order._id} className="relative border border-white/8 p-6 transition-all duration-300 hover:border-yellow-500/20 group overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

                <div className="flex justify-between items-start mb-4 gap-2">
                  <p className="font-mono text-xs text-white/30 break-all">#{order._id.slice(-8).toUpperCase()}</p>
                  <span className="flex-shrink-0 px-2.5 py-1 text-xs font-bold tracking-widest uppercase border" style={{ fontFamily: "'Barlow', sans-serif", borderColor: sc.border, color: sc.text, background: sc.bg }}>{order.status}</span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-white/25 tracking-widest uppercase mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>Customer</p>
                  <p className="text-white/75 text-sm font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>{order.user.name}</p>
                </div>

                <div className="mb-5">
                  <p className="text-xs text-white/25 tracking-widest uppercase mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>Total</p>
                  <span className="font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', background: 'linear-gradient(90deg, #EAB308, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.05em' }}>
                    ₹ {order.totalPrice.toFixed(0)}
                  </span>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-white/25 tracking-widest uppercase mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>Update Status</label>
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="w-full px-3 py-2 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/50 transition-colors" style={selectStyle}>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button onClick={() => handleStatusChange(order._id, "Delivered")} className="w-full py-2.5 text-xs font-bold tracking-widest uppercase text-black transition-opacity hover:opacity-80" style={{ fontFamily: "'Barlow', sans-serif", background: 'linear-gradient(90deg, #EAB308, #DC2626)', clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>
                  Mark as Delivered
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="border border-white/8 p-10 text-center text-white/25 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.01)' }}>
          No orders found
        </div>
      )}
    </div>
  )
}

export default OrderManagment