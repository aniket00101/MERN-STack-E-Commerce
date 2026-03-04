import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import FilterSideBar from '../components/products/FilterSideBar'
import SortOPtions from '../components/products/SortOPtions'
import ProductGrid from '../components/products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByFilters } from '../redux/slice/productSlice'

const CollectionPage = () => {
  const { collection } = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const queryParams = Object.fromEntries([...searchParams])
  const sidebarRef = useRef(null)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProductByFilters({ collection, ...queryParams }))
  }, [dispatch, collection, searchParams.toString()])

  const toggleSidebar = () => setIsSideBarOpen(!isSideBarOpen)

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isSideBarOpen ? "hidden" : "auto"
  }, [isSideBarOpen])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 0% 50%, rgba(234,179,8,0.05) 0%, transparent 60%)' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="flex relative z-10">

        {/* Mobile sidebar backdrop */}
        {isSideBarOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSideBarOpen(false)} />
        )}

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 border-r border-white/8 lg:static lg:translate-x-0 lg:w-64 lg:flex-shrink-0 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: isSideBarOpen ? 'rgba(0,0,0,0.97)' : 'transparent' }}
        >
          {/* Mobile sidebar close */}
          {isSideBarOpen && (
            <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-white/8">
              <span className="font-black tracking-wide text-sm"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>
                Filters
              </span>
              <button onClick={toggleSidebar} className="text-white/40 hover:text-white transition-colors">
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>
          )}
          <FilterSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">

          {/* Mobile filter button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black px-5 py-2.5 transition-opacity hover:opacity-80"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              }}>
              <FaFilter className="text-xs" />
              Filters
            </button>
          </div>

          {/* Page header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Browse
              </span>
            </div>

            <h2 className="font-black leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '0.04em',
              }}>
              All Collections
            </h2>

            <div className="mt-3 h-px w-16"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            {/* Product count */}
            {!loading && products.length > 0 && (
              <p className="mt-3 text-white/30 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                {products.length} style{products.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Sort + results */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <SortOPtions />
          </div>

          <ProductGrid products={products} loading={loading} error={error} />

        </div>
      </div>
    </div>
  )
}

export default CollectionPage