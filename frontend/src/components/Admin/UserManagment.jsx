import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser, deleteUser, updateUser, fetchUsers } from "../../redux/slice/adminSlice"

const inputClass = "w-full px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors duration-300 placeholder-white/20"
const inputStyle = { fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }

const UserManagment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { users, loading, error } = useSelector((state) => state.admin)

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/")
    else dispatch(fetchUsers())
  }, [user, navigate, dispatch])

  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addUser(formData))
    setFormData({ name: "", email: "", password: "", role: "customer" })
  }

  const handleRoleChange = (userId, newRole) => dispatch(updateUser({ id: userId, role: newRole }))

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) dispatch(deleteUser(userId))
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Admin</span>
        </div>
        <h2 className="font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 58px)', background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.04em' }}>
          User Management
        </h2>
        <div className="mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
      </div>

      {loading && <div className="flex items-center gap-3 py-4"><div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" /></div>}
      {error && <p className="text-red-400 text-sm mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>}

      <div className="border border-white/8 p-6 sm:p-8 mb-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-5" style={{ background: 'linear-gradient(to bottom, #EAB308, #DC2626)' }} />
          <h3 className="font-black tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
            Add New User
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
                style={{ fontFamily: "'Barlow', sans-serif" }}>{label}</label>
              <input type={type} name={name} value={formData[name]}
                onChange={handleChange} placeholder={placeholder} required
                className={inputClass} style={inputStyle} />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
              style={{ fontFamily: "'Barlow', sans-serif" }}>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required
              className="w-full px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors"
              style={inputStyle}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button type="submit"
              className="w-full py-4 text-xs font-bold tracking-widest uppercase text-black transition-opacity hover:opacity-90"
              style={{ fontFamily: "'Barlow', sans-serif", background: 'linear-gradient(90deg, #EAB308, #DC2626)', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              Add User →
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5" style={{ background: 'linear-gradient(to bottom, #EAB308, #DC2626)' }} />
        <h3 className="font-black tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
          All Users
        </h3>
        <span className="text-white/25 text-xs tracking-widest" style={{ fontFamily: "'Barlow', sans-serif" }}>
          ({users.length})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u._id} className="relative border border-white/8 p-6 transition-all duration-300 hover:border-yellow-500/20 group overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <div className="flex justify-between items-start mb-3 gap-3">
              <h4 className="font-bold text-white/85 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>{u.name}</h4>
              <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold tracking-widest uppercase border ${
                u.role === "admin"
                  ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/6"
                  : "border-white/15 text-white/40 bg-white/3"
              }`} style={{ fontFamily: "'Barlow', sans-serif" }}>
                {u.role}
              </span>
            </div>

            <p className="text-white/30 text-xs mb-5 truncate" style={{ fontFamily: "'Barlow', sans-serif" }}>{u.email}</p>

            <div className="mb-4">
              <label className="block text-xs text-white/25 tracking-widest uppercase mb-2"
                style={{ fontFamily: "'Barlow', sans-serif" }}>Change Role</label>
              <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}
                className="w-full px-3 py-2 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/50 transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.04)' }}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button onClick={() => handleDeleteUser(u._id)}
              className="w-full py-2.5 text-xs font-bold tracking-widest uppercase text-white/40 border border-red-500/20 hover:text-red-400 hover:border-red-400/40 hover:bg-red-500/5 transition-all duration-300"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserManagment