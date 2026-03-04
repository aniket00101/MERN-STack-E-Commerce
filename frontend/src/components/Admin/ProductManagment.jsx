import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, fetchAdminProducts } from "../../redux/slice/adminProductSlice"

const ProductManagment = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.adminProducts)

  useEffect(() => { dispatch(fetchAdminProducts()) }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
    }
  }

  if (loading) return <div className="flex items-center gap-3 py-10"><div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" /><p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading…</p></div>
  if (error) return <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Catalog</span>
          </div>
          <h2 className="font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 58px)', background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.04em' }}>
            Product Management
          </h2>
          <div className="mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
        </div>
        <Link to="/admin/products/add"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black px-6 py-3 transition-opacity hover:opacity-80 self-start"
          style={{ fontFamily: "'Barlow', sans-serif", background: 'linear-gradient(90deg, #EAB308, #DC2626)', clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>
          + Add Product
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="relative border border-white/8 p-6 transition-all duration-300 hover:border-yellow-500/20 group overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <h3 className="font-bold text-white/85 mb-4 text-sm leading-snug" style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>{product.name}</h3>

              <div className="mb-3">
                <p className="text-xs text-white/25 tracking-widest uppercase mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>Price</p>
                <span className="font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', background: 'linear-gradient(90deg, #EAB308, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.05em' }}>
                  ₹ {product.price}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs text-white/25 tracking-widest uppercase mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>SKU</p>
                <p className="text-white/50 text-xs font-mono">{product.sku}</p>
              </div>

              <div className="flex gap-2">
                <Link to={`/admin/products/${product._id}/edit`}
                  className="flex-1 text-center py-2.5 text-xs font-bold tracking-widest uppercase text-black transition-opacity hover:opacity-80"
                  style={{ fontFamily: "'Barlow', sans-serif", background: 'linear-gradient(90deg, #EAB308, rgba(220,38,38,0.6))', clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)' }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(product._id)}
                  className="flex-1 py-2.5 text-xs font-bold tracking-widest uppercase text-white/50 border border-red-500/20 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300"
                  style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-white/8 p-10 text-center text-white/25 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.01)' }}>
          No products found
        </div>
      )}
    </div>
  )
}

export default ProductManagment