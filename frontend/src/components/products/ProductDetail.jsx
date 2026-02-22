import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const similarProduct = [
    {
      _id: 1,
      name: "Product 1",
      price: 100,
      images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      _id: 2,
      name: "Product 2",
      price: 110,
      images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
      _id: 3,
      name: "Product 3",
      price: 95,
      images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
      _id: 4,
      name: "Product 4",
      price: 130,
      images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
  ];

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

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

    setTimeout(() => {
      toast.success("Product added to Cart!", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 600);
  };

  const discount =
    selectedProduct.originalPrice &&
    Math.round(
      ((selectedProduct.originalPrice - selectedProduct.price) /
        selectedProduct.originalPrice) *
        100
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT SIDE IMAGES */}
          <div className="lg:w-1/2 flex gap-6">

            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-4">
              {selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.altText}
                  onClick={() => setMainImage(img.url)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border transition
                  ${
                    mainImage === img.url
                      ? "border-purple-500"
                      : "border-gray-800 hover:border-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 overflow-hidden rounded-2xl">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="lg:w-1/2">

            <h1 className="text-3xl font-bold mb-3">
              {selectedProduct.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold text-purple-400">
                ${selectedProduct.price}
              </span>

              {selectedProduct.originalPrice && (
                <>
                  <span className="line-through text-gray-500">
                    ${selectedProduct.originalPrice}
                  </span>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-400 mb-6">
              {selectedProduct.description}
            </p>

            {/* COLOR */}
            <div className="mb-6">
              <p className="mb-2 font-medium">Color</p>
              <div className="flex gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border transition
                    ${
                      selectedColor === color
                        ? "ring-2 ring-purple-500 border-white"
                        : "border-gray-700"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-6">
              <p className="mb-2 font-medium">Size</p>
              <div className="flex gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border transition
                    ${
                      selectedSize === size
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-gray-800 border-gray-700 hover:border-purple-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-8">
              <p className="mb-2 font-medium">Quantity</p>
              <div className="flex items-center gap-6 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 w-fit">
                <button onClick={() => handleQuantityChange("minus")} className="text-lg">
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button onClick={() => handleQuantityChange("plus")} className="text-lg">
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-xl font-semibold transition
              ${
                isButtonDisabled
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add To Cart"}
            </button>

            {/* CHARACTERISTICS */}
            <div className="mt-12 border-t border-gray-800 pt-6">
              <h3 className="text-xl font-semibold mb-4">Characteristics</h3>
              <div className="space-y-2 text-gray-400">
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

        {/* SIMILAR PRODUCTS */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold text-center mb-8">
            You May Also Like
          </h2>
          <ProductGrid product={similarProduct} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;