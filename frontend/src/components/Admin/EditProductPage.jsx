import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProductDetails, updateProduct } from "../../redux/slice/productSlice"
import axios from 'axios'

const inputClass = "w-full px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors duration-300 placeholder-white/20"
const inputStyle = { fontFamily: "'Barlow', sans-serif", background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }

const FieldLabel = ({ children }) => (
  <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2"
    style={{ fontFamily: "'Barlow', sans-serif" }}>
    {children}
  </label>
)

const EditProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { selectedProduct, loading, error } = useSelector((state) => state.products)

  const [productData, setProductData] = useState({
    name: "", description: "", price: 0, countInStock: 0, sku: "",
    category: "", brand: "", sizes: [], colors: [], collections: "",
    material: "", gender: "", images: []
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => { if (id) dispatch(fetchProductDetails(id)) }, [dispatch, id])
  useEffect(() => { if (selectedProduct) setProductData(selectedProduct) }, [selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    try {
      setUploading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setProductData((prev) => ({ ...prev, images: [...prev.images, { url: data.imageUrl, altText: "" }] }))
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ id, productData }))
    navigate("/admin/products")
  }

  if (loading) return <div className="flex items-center gap-3 py-10"><div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" /><p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading…</p></div>
  if (error) return <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Edit</span>
        </div>
        <h2 className="font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 56px)', background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.04em' }}>
          Edit Product
        </h2>
        <div className="mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
      </div>

      <div className="border border-white/8 p-6 sm:p-8 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <FieldLabel>Product Name</FieldLabel>
              <input type="text" name="name" value={productData.name} onChange={handleChange} className={inputClass} style={inputStyle} required />
            </div>
            <div>
              <FieldLabel>SKU</FieldLabel>
              <input type="text" name="sku" value={productData.sku} onChange={handleChange} className={inputClass} style={inputStyle} required />
            </div>
            <div>
              <FieldLabel>Price (₹)</FieldLabel>
              <input type="number" name="price" value={productData.price} onChange={handleChange} className={inputClass} style={inputStyle} required />
            </div>
            <div>
              <FieldLabel>Count in Stock</FieldLabel>
              <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className={inputClass} style={inputStyle} required />
            </div>
            <div>
              <FieldLabel>Brand</FieldLabel>
              <input type="text" name="brand" value={productData.brand} onChange={handleChange} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <input type="text" name="category" value={productData.category} onChange={handleChange} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <FieldLabel>Material</FieldLabel>
              <input type="text" name="material" value={productData.material} onChange={handleChange} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select name="gender" value={productData.gender} onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:border-yellow-500/60 transition-colors"
                style={inputStyle}>
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea name="description" value={productData.description} onChange={handleChange}
              rows={4} className={inputClass + " resize-none"} style={inputStyle} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <FieldLabel>Sizes (comma-separated)</FieldLabel>
              <input type="text" value={productData.sizes.join(", ")}
                onChange={(e) => setProductData((prev) => ({ ...prev, sizes: e.target.value.split(",").map((s) => s.trim()) }))}
                placeholder="S, M, L, XL" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <FieldLabel>Colors (comma-separated)</FieldLabel>
              <input type="text" value={productData.colors.join(", ")}
                onChange={(e) => setProductData((prev) => ({ ...prev, colors: e.target.value.split(",").map((c) => c.trim()) }))}
                placeholder="Red, Blue, Black" className={inputClass} style={inputStyle} />
            </div>
          </div>

          <div>
            <FieldLabel>Product Images</FieldLabel>
            <div className="border border-white/10 border-dashed p-6 text-center cursor-pointer hover:border-yellow-500/40 transition-colors"
              style={{ background: 'rgba(255,255,255,0.02)' }}
              onClick={() => document.getElementById('imgUpload').click()}>
              <input id="imgUpload" type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>Uploading…</p>
                </div>
              ) : (
                <p className="text-white/25 text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Click to upload image
                </p>
              )}
            </div>

            {productData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative border border-white/10 overflow-hidden" style={{ width: '80px', height: '80px' }}>
                    <img src={image.url} alt={image.altText || "Product"} className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-4 text-xs font-bold tracking-widest uppercase text-black transition-opacity hover:opacity-90"
              style={{ fontFamily: "'Barlow', sans-serif", background: 'linear-gradient(90deg, #EAB308, #DC2626)', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
              Update Product →
            </button>
            <button type="button" onClick={() => navigate("/admin/products")}
              className="px-8 py-4 text-xs font-bold tracking-widest uppercase text-white/40 border border-white/10 hover:text-white hover:border-white/25 transition-all duration-300"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProductPage