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
    <div>
      <Hero />
      <GenderCollections />
      <NewArrivals />

      <h2 className='text-3xl text-center font-bold mb-4'> Best Seller </h2>

      <ProductDetail />

      <div className='container mx-auto'>

        <h2 className='text-3xl text-center font-bold mb-4'> Top Wears for Women </h2>

        <ProductGrid product={placeholderProduct} />

      </div>
      <FeaturesCollections />
      <FeatureSection />
    </div>
  )
}

export default Home