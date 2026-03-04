import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.", { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);
    dispatch(addToCart({
      productId: productFetchId,
      quantity,
      size: selectedSize,
      color: selectedColor,
      guestId,
      userId: user?._id,
    }))
      .then(() => toast.success("Product added to cart", { duration: 1000 }))
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/30 text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Barlow', sans-serif" }}>Loading product…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-red-400 text-sm tracking-widest uppercase"
        style={{ fontFamily: "'Barlow', sans-serif" }}>Error: {error}</p>
    </div>
  );

  const discount = selectedProduct?.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 relative overflow-hidden">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 30%, rgba(234,179,8,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 70%, rgba(220,38,38,0.07) 0%, transparent 60%)' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {selectedProduct && (
          <div className="border border-white/8 p-6 sm:p-8 lg:p-10"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

              {/* ── Images ── */}
              <div className="lg:w-1/2 flex gap-4">

                {/* Thumbnails */}
                <div className="hidden md:flex flex-col gap-3">
                  {selectedProduct.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img.url)}
                      className="w-18 h-18 overflow-hidden border transition-all duration-300 flex-shrink-0"
                      style={{
                        width: '72px',
                        height: '72px',
                        borderColor: mainImage === img.url ? '#EAB308' : 'rgba(255,255,255,0.1)',
                        outline: mainImage === img.url ? '1px solid rgba(234,179,8,0.4)' : 'none',
                      }}
                    >
                      <img src={img.url} alt={img.altText}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 relative overflow-hidden" style={{ maxHeight: '580px' }}>
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    style={{ minHeight: '400px', filter: 'brightness(0.95) contrast(1.05)' }}
                  />
                  {/* Subtle tint */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />

                  {/* Discount badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 text-black text-xs font-bold tracking-widest uppercase px-3 py-1"
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                      }}>
                      -{discount}% OFF
                    </div>
                  )}
                </div>
              </div>

              {/* ── Product Info ── */}
              <div className="lg:w-1/2 flex flex-col justify-start">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5 self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {selectedProduct.brand || 'Featured'}
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-black leading-none mb-5"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    letterSpacing: '0.04em',
                    background: 'linear-gradient(135deg, #ffffff 30%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  {selectedProduct.name}
                </h1>

                {/* Price row */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/8">
                  <span className="font-black"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '36px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    ₹ {selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="line-through text-white/30 text-lg"
                      style={{ fontFamily: "'Barlow', sans-serif" }}>
                      ₹ {selectedProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-white/45 mb-8 leading-relaxed text-sm sm:text-base"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                  {selectedProduct.description}
                </p>

                {/* Color */}
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-white/50"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Color {selectedColor && <span className="text-yellow-400 ml-2">— {selectedColor}</span>}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className="w-9 h-9 transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: color.toLowerCase(),
                          outline: selectedColor === color ? '2px solid #EAB308' : '2px solid transparent',
                          outlineOffset: '3px',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-white/50"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Size {selectedSize && <span className="text-yellow-400 ml-2">— {selectedSize}</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="px-4 py-2 text-sm font-semibold tracking-wider border transition-all duration-300"
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          background: selectedSize === size
                            ? 'linear-gradient(90deg, #EAB308, #DC2626)'
                            : 'rgba(255,255,255,0.03)',
                          borderColor: selectedSize === size ? 'transparent' : 'rgba(255,255,255,0.1)',
                          color: selectedSize === size ? '#000' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-white/50"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Quantity
                  </p>
                  <div className="flex items-center gap-0 border border-white/10 w-fit"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <button
                      onClick={() => handleQuantityChange("minus")}
                      className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 text-xl border-r border-white/10"
                    >−</button>
                    <span className="w-12 text-center font-bold text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.1em' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("plus")}
                      className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 text-xl border-l border-white/10"
                    >+</button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  disabled={isButtonDisabled}
                  onClick={handleAddToCart}
                  className="w-full py-4 font-bold tracking-widest uppercase text-sm transition-all duration-300"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: isButtonDisabled
                      ? 'rgba(255,255,255,0.05)'
                      : 'linear-gradient(90deg, #EAB308, #DC2626)',
                    color: isButtonDisabled ? 'rgba(255,255,255,0.3)' : '#000',
                    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                  }}
                >
                  {isButtonDisabled ? "Adding to Cart…" : "Add to Cart →"}
                </button>

                {/* Product Details */}
                <div className="mt-10 pt-6 border-t border-white/8">
                  <h3 className="font-black mb-5 tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.1em' }}>
                    Product Details
                  </h3>
                  <div className="space-y-3">
                    {[['Brand', selectedProduct.brand], ['Material', selectedProduct.material]].map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-white/35 text-sm tracking-widest uppercase"
                          style={{ fontFamily: "'Barlow', sans-serif", fontSize: '11px' }}>
                          {label}
                        </span>
                        <span className="text-white/80 text-sm font-medium"
                          style={{ fontFamily: "'Barlow', sans-serif" }}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Similar Products */}
            <div className="mt-20 pt-10 border-t border-white/8">
              <div className="flex flex-col items-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-red-500/30 bg-red-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-xs font-semibold tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Curated for You
                  </span>
                </div>
                <h2 className="font-black leading-none text-center"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(32px, 5vw, 60px)',
                    background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.04em',
                  }}>
                  You May Also Like
                </h2>
                <div className="mt-3 h-px w-16"
                  style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
              </div>

              <ProductGrid products={similarProducts || []} loading={loading} error={error} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;