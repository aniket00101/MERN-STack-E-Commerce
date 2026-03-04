import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products = [], loading, error }) => {

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="overflow-hidden border border-white/8 animate-pulse"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-full h-72 bg-white/5" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-white/8 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )

  if (error) return (
    <p className="text-center text-red-400 text-sm tracking-widest uppercase py-12"
      style={{ fontFamily: "'Barlow', sans-serif" }}>
      Error: {error}
    </p>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((item, index) => (
            <Link key={item._id} to={`/product/${item._id}`} className="group block">

              <div className="relative overflow-hidden border border-white/8 transition-all duration-500 hover:-translate-y-1 hover:border-yellow-500/30"
                style={{ background: 'rgba(255,255,255,0.03)' }}>

                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

                <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-black">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.images?.[0]?.altText || item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(220,38,38,0.1) 100%)' }} />

                  <div className="absolute top-2 right-3 font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 leading-none pointer-events-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 whitespace-nowrap">
                    <span className="text-black text-xs font-bold tracking-widest uppercase px-4 py-1.5"
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                      }}>
                      Quick Shop →
                    </span>
                  </div>
                </div>

                <div className="p-4 relative">
                  <div className="mb-3 h-px w-6 group-hover:w-10 transition-all duration-500"
                    style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

                  <h3 className="text-white/75 group-hover:text-white font-semibold text-sm mb-2 leading-snug transition-colors duration-300 line-clamp-2"
                    style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
                    {item.name}
                  </h3>

                  <p className="font-black tracking-wide"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '20px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    ₹ {item.price}
                  </p>
                </div>

              </div>
            </Link>
          ))
        ) : (
          <p className="text-white/30 col-span-full text-center tracking-widest uppercase text-sm py-16"
            style={{ fontFamily: "'Barlow', sans-serif" }}>
            No products available
          </p>
        )}
      </div>
    </>
  )
}

export default ProductGrid