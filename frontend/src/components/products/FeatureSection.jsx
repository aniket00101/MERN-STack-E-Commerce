import React from 'react'
import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag
} from 'react-icons/hi2'

const features = [
  {
    icon: <HiShoppingBag className="text-2xl text-black" />,
    title: 'Free International Shipping',
    desc: 'Enjoy worldwide delivery on all orders above ₹999.',
    tag: '01',
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-2xl text-black" />,
    title: '45-Day Returns',
    desc: 'Shop confidently with our hassle-free return policy.',
    tag: '02',
  },
  {
    icon: <HiOutlineCreditCard className="text-2xl text-black" />,
    title: 'Secure Checkout',
    desc: '100% encrypted and protected payment processing.',
    tag: '03',
  },
]

const FeatureSection = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 bg-black overflow-hidden">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(220,38,38,0.08) 0%, transparent 70%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="container mx-auto relative z-10">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-red-500/30 bg-red-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Barlow', sans-serif" }}>
              Why Choose Us
            </span>
          </div>

          <h2 className="font-black leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 5vw, 68px)',
              background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.04em',
            }}>
            We Go the Extra Mile
          </h2>

          <div className="mt-4 h-px w-16 mx-auto"
            style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc, tag }) => (
            <div
              key={tag}
              className="group relative border border-white/8 p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.05) 0%, rgba(220,38,38,0.05) 100%)' }} />

              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <div className="absolute top-4 right-5 font-black text-white/4 group-hover:text-white/8 transition-colors duration-500 leading-none pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '64px' }}>
                {tag}
              </div>

              <div className="inline-flex items-center justify-center w-12 h-12 mb-6"
                style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }}>
                {icon}
              </div>

              <div className="mb-4 h-px w-8 group-hover:w-12 transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

              <h4 className="text-white font-bold text-lg mb-3 leading-snug"
                style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: '0.02em' }}>
                {title}
              </h4>

              <p className="text-white/40 text-sm leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #EAB308, transparent)' }} />
    </section>
  )
}

export default FeatureSection