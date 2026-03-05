import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/im.jpg"

const FeaturesCollections = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 bg-black overflow-hidden">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(234,179,8,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(220,38,38,0.07) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }} />

      <div className="container mx-auto relative z-10">

        <div className="flex flex-col-reverse lg:flex-row items-stretch border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)' }}>

          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left relative">

            <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #EAB308, #DC2626, transparent)' }} />

            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5 self-center lg:self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow', sans-serif" }}>
                Everyday Essentials
              </span>
            </div>

            <h2 className="font-black leading-none mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px, 4.5vw, 64px)',
                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.04em',
                lineHeight: '1.05',
              }}>
              Designed for Comfort.<br />Built for Confidence.
            </h2>

            <div className="mb-6 h-px w-16 mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }} />

            <p className="text-white/45 text-base sm:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Discover premium-quality apparel crafted for modern lifestyles. From effortless casual wear to
              refined statement pieces, our collections are designed to move with you — every day, everywhere.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-8 mb-10">
              {[['500+', 'Styles'], ['4.9★', 'Rating'], ['Free', 'Shipping']].map(([num, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-black leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '26px',
                      background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                    {num}
                  </div>
                  <div className="text-white/35 text-xs tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                to="/collections/all"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-semibold text-black px-8 py-3.5 transition-opacity duration-300 hover:opacity-90"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                Explore Collection →
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative overflow-hidden" style={{ minHeight: '360px' }}>
            <img
              src={featured}
              alt="Premium featured collection"
              className="w-full h-full object-cover"
              style={{ minHeight: '360px', filter: 'brightness(0.85) contrast(1.05)' }}
            />
            
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, transparent 50%, rgba(220,38,38,0.1) 100%)' }} />
           
            <div className="hidden lg:block absolute inset-y-0 left-0 w-16"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }} />
          </div>

        </div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #EAB308, transparent)' }} />
    </section>
  )
}

export default FeaturesCollections