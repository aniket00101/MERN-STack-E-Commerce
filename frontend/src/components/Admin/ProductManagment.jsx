import React from "react";
import { Link } from "react-router-dom";

const ProductManagment = () => {
  const products = [
    {
      _id: 123123,
      name: "Shirt",
      price: 110,
      sku: "123123123",
    },
    {
      _id: 456456,
      name: "Jeans",
      price: 250,
      sku: "456456456",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the product")) {
      console.log("Delete product with id: ", id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-gray-200 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
          Product Management
        </h2>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 
                rounded-2xl p-6 shadow-xl hover:bg-white/10 
                hover:-translate-y-1 transition duration-300"
              >

                {/* Product Name */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-2xl font-semibold text-emerald-400">
                    ${product.price}
                  </p>
                </div>

                {/* SKU */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400">SKU</p>
                  <p className="text-gray-300">{product.sku}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="flex-1 text-center bg-yellow-500/80 hover:bg-yellow-500 
                    text-white py-2 rounded-lg transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-600/80 hover:bg-red-600 
                    text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 
          rounded-2xl p-10 text-center text-gray-400">
            No Products Found.
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductManagment;