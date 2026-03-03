import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";


const ProductDetail = ({ productId }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, loading, error, similarProducts } =
  useSelector((state) => state.products)
  const { user, guestId } = useSelector((state) => state.auth)
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId))
      dispatch(fetchSimilarProducts({ id: productFetchId }))
    }
  }, [dispatch, productFetchId])


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

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id
      })
    ).then(() => {
      toast.success("Product added to cart", {
        duration: 1000
      })
    })
      .finally(() => {
        setIsButtonDisabled(false)
      })
  };

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: ${error}</p>
  }

  const discount =
  selectedProduct?.originalPrice
    ? Math.round(
        ((selectedProduct.originalPrice - selectedProduct.price) /
          selectedProduct.originalPrice) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#0F1E33] text-gray-200 py-12 px-4 relative overflow-hidden">


      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-blue-600/20 rounded-full blur-[120px]"></div>

      
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          {selectedProduct && (

            <div className="flex flex-col lg:flex-row gap-12">

              <div className="lg:w-1/2 flex gap-6">

                <div className="hidden md:flex flex-col gap-4">
                  {selectedProduct.images.map((img, index) => (

                    <img key={index} src={img.url} alt={img.altText} onClick={() => setMainImage(img.url)} className={`w-20 h-20 object-cover rounded-xl cursor-pointer border transition ${mainImage === img.url ? "border-purple-500" : "border-white/10 hover:border-white/30"}`} />

                  ))}
                </div>

                <div className="flex-1 overflow-hidden rounded-2xl">

                  <img src={mainImage} alt="Main Product" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition duration-500" />

                </div>
              </div>

              <div className="lg:w-1/2">

                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white"> {selectedProduct.name} </h1>

                <div className="flex items-center gap-4 mb-6">

                  <span className="text-2xl font-semibold text-purple-400"> ${selectedProduct.price} </span>

                  {selectedProduct.originalPrice && (
                    <>
                      <span className="line-through text-gray-400"> ${selectedProduct.originalPrice} </span>

                      <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full"> -{discount}% </span>

                    </>
                  )}
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed"> {selectedProduct.description} </p>

                {/* COLOR */}
                <div className="mb-6">

                  <p className="mb-3 font-medium text-gray-300">Color</p>

                  <div className="flex gap-3">
                    {selectedProduct.colors.map((color) => (

                      <button key={color} onClick={() => setSelectedColor(color)} className={`w-10 h-10 rounded-full border transition ${selectedColor === color ? "ring-2 ring-purple-500 border-white" : "border-white/20"}`} style={{ backgroundColor: color.toLowerCase() }} />

                    ))}
                  </div>
                </div>

                <div className="mb-6">

                  <p className="mb-3 font-medium text-gray-300">Size</p>

                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map((size) => (

                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2 rounded-xl border transition ${selectedSize === size ? "bg-purple-600 text-white border-purple-600" : "bg-white/5 border-white/10 hover:border-purple-500"}`} > {size} </button>

                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="mb-3 font-medium text-gray-300">Quantity</p>
                  <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-xl px-6 py-3 w-fit">

                    <button onClick={() => handleQuantityChange("minus")} className="text-lg">− </button>

                    <span className="text-lg font-semibold">{quantity}</span>

                    <button onClick={() => handleQuantityChange("plus")} className="text-lg">+</button>

                  </div>
                </div>

                <button disabled={isButtonDisabled} onClick={handleAddToCart} className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${isButtonDisabled ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:scale-[1.02]"}`}> {isButtonDisabled ? "Adding..." : "Add To Cart"} </button>

                <div className="mt-12 border-t border-white/10 pt-6">

                  <h3 className="text-xl font-semibold mb-4 text-white"> Product Details </h3>

                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Brand</span>
                      <span>{selectedProduct.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Material</span>
                      <span>{selectedProduct.material}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            )}

            <div className="mt-24">
              <h2 className="text-3xl font-bold text-center text-white mb-10"> You May Also Like </h2>
              <ProductGrid products={similarProducts || []} loading={loading} error={error}/>
            </div>

          </div>
        </div>
      
    </div>
  );
};

export default ProductDetail;