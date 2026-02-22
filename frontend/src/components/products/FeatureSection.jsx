import React from 'react'
import { 
  HiArrowPathRoundedSquare, 
  HiOutlineCreditCard, 
  HiShoppingBag 
} from 'react-icons/hi2'

const FeatureSection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 
    bg-gradient-to-br from-[#0F1E33] via-[#0c1629] to-[#0a1424] 
    relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] 
      bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] 
      bg-blue-600/20 rounded-full blur-[120px]"></div>

      <div className="container mx-auto relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">

          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl p-8 transition duration-300 hover:scale-105 hover:shadow-xl">

            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full 
              bg-gradient-to-r from-purple-600 to-blue-600 
              shadow-lg">
                <HiShoppingBag className="text-2xl text-white" />
              </div>
            </div>

            <h4 className="text-white font-semibold text-lg mb-2 tracking-wide">
              Free International Shipping
            </h4>

            <p className="text-gray-300 text-sm">
              Enjoy worldwide delivery on all orders above $100.
            </p>

          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl p-8 transition duration-300 hover:scale-105 hover:shadow-xl">

            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full 
              bg-gradient-to-r from-purple-600 to-blue-600 
              shadow-lg">
                <HiArrowPathRoundedSquare className="text-2xl text-white" />
              </div>
            </div>

            <h4 className="text-white font-semibold text-lg mb-2 tracking-wide">
              45-Day Returns
            </h4>

            <p className="text-gray-300 text-sm">
              Shop confidently with our hassle-free return policy.
            </p>

          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl p-8 transition duration-300 hover:scale-105 hover:shadow-xl">

            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full 
              bg-gradient-to-r from-purple-600 to-blue-600 
              shadow-lg">
                <HiOutlineCreditCard className="text-2xl text-white" />
              </div>
            </div>

            <h4 className="text-white font-semibold text-lg mb-2 tracking-wide">
              Secure Checkout
            </h4>

            <p className="text-gray-300 text-sm">
              100% encrypted and protected payment processing.
            </p>

          </div>

        </div>
      </div>
    </section>
  )
}

export default FeatureSection