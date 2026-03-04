import React, { useEffect, useState } from "react";
import Hero from "../components/layout/Hero";
import GenderCollections from "../components/products/GenderCollections";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetail from "../components/products/ProductDetail";
import ProductGrid from "../components/products/ProductGrid";
import FeaturesCollections from "../components/products/FeaturesCollections";
import FeatureSection from "../components/products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/slice/productSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductByFilters({ gender: "Women", category: "Bottom Wear", limit: 8 }));

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Best Seller Fetch Error:", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="overflow-x-hidden bg-black">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <Hero />
      <GenderCollections />
      <NewArrivals />

      <section className="relative bg-black py-16 sm:py-24 px-4 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(234,179,8,0.07) 0%, transparent 70%)' }} />

        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

        <div className="container mx-auto relative z-10">

          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-red-500/30 bg-red-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Most Loved
              </span>
            </div>

            <h2 className="font-black leading-none tracking-tight text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 76px)',
                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.04em',
              }}>
              Best Seller
            </h2>

            <div className="mt-4 h-px w-24"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
          </div>

          {bestSellerProduct ? (
            <ProductDetail productId={bestSellerProduct._id} />
          ) : (
            <p className="text-center text-white/40 tracking-widest text-sm uppercase"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Loading best seller…
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #EAB308, transparent)' }} />
      </section>

      <section className="relative bg-black py-16 sm:py-24 px-4 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(220,38,38,0.07) 0%, transparent 70%)' }} />

        <div className="container mx-auto relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Women's Collection
              </span>
            </div>

            <h2 className="font-black leading-none tracking-tight"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.04em',
              }}>
              Top Wears for Women
            </h2>

            <div className="mt-4 mb-6 h-px w-20 mx-auto"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <p className="text-white/40 text-base sm:text-lg leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Discover timeless silhouettes and modern essentials crafted for confidence, comfort,
              and effortless everyday elegance. Designed to move with you — from casual mornings to elevated evenings.
            </p>
          </div>

          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />
      </section>

      <FeaturesCollections />
      <FeatureSection />
    </div>
  );
};

export default Home;