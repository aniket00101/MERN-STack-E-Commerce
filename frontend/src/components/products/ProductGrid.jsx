import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products=[], loading, error }) => {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

      {products.length > 0 ? (
        products.map((item) => (
          <Link key={item._id} to={`/product/${item._id}`} className="group block">

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">

              <div className="w-full h-72 sm:h-80 md:h-72 xl:h-80 overflow-hidden rounded-xl mb-4 bg-[#0F1E33]">

                <img
                  src={item.images?.[0]?.url}
                  alt={item.images?.[0]?.altText || item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

              </div>

              <h3 className="text-gray-300 font-medium text-sm sm:text-base mb-2 group-hover:text-white transition-colors duration-300">
                {item.name}
              </h3>

              <p className="text-purple-400 font-semibold text-sm sm:text-base tracking-wide">
                ₹ {item.price}
              </p>

            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">
          No products available
        </p>
      )}

    </div>
  );
};

export default ProductGrid;