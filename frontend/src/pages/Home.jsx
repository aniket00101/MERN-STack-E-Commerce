import React from 'react'
import Hero from '../components/layout/Hero'
import GenderCollections from '../components/products/GenderCollections'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetail from '../components/products/ProductDetail'
import ProductGrid from '../components/products/ProductGrid'
import FeaturesCollections from '../components/products/FeaturesCollections'
import FeatureSection from '../components/products/FeatureSection'

const placeholderProduct = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=2" }],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=5" }],
  },
]

const Home = () => {
  return (
    <div className="overflow-x-hidden">

      <Hero />

      <GenderCollections />

      <NewArrivals />

      {/* Best Seller Section */}
      <section className="bg-[#0F1E33] py-12 sm:py-16 px-4">
        <div className="container mx-auto text-center">
          
          <h2 className=" text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,120,0,0.3)]">Best Seller</h2>

          <ProductDetail />
        </div>
      </section>

      <section className="bg-[#0F1E33] py-12 sm:py-16 px-4">
        <div className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-purple-400 uppercase tracking-widest text-sm mb-3"> Women's Collection </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"> Top Wears for Women </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed"> Discover timeless silhouettes and modern essentials crafted for confidence,
              comfort, and effortless everyday elegance. Designed to move with you — from casual mornings to elevated evenings. </p>

          </div>

          <ProductGrid product={placeholderProduct} />

        </div>
      </section>

      <FeaturesCollections />

      <FeatureSection />

    </div>
  )
}

export default Home