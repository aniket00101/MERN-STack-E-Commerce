import React, { useEffect, useRef } from 'react'
import mens from "../../assets/Men.jpg"
import women from "../../assets/women.jpg"
import { Link } from 'react-router-dom'

const GenderCollections = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.15 }
    )
    const cards = sectionRef.current?.querySelectorAll('.collection-card')
    cards?.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,700;1,400&family=Barlow:wght@300;400;600&display=swap');

        .gender-section {
          background: #000;
          position: relative;
          overflow: hidden;
        }

        .gender-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(220,38,38,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 80% 50%, rgba(234,179,8,0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .section-header {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.12em;
          line-height: 1;
        }

        .section-tagline {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .collection-card {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .collection-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .collection-card:nth-child(2) {
          transition-delay: 0.15s;
        }

        .card-inner {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
        }

        .card-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 4px;
          background: linear-gradient(135deg, rgba(234,179,8,0.3), transparent, rgba(220,38,38,0.3)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card-inner:hover::after {
          opacity: 1;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          filter: grayscale(20%) contrast(1.05);
        }

        .card-inner:hover .card-img {
          transform: scale(1.12);
          filter: grayscale(0%) contrast(1.1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.5) 40%,
            rgba(0,0,0,0.15) 70%,
            rgba(0,0,0,0.0) 100%
          );
        }

        .card-overlay-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, transparent 50%, rgba(234,179,8,0.1) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .card-inner:hover .card-overlay-hover {
          opacity: 1;
        }

        .card-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          position: absolute;
          top: 20px;
          right: 20px;
          user-select: none;
          transition: -webkit-text-stroke 0.4s ease;
        }

        .card-inner:hover .card-number {
          -webkit-text-stroke: 1px rgba(234,179,8,0.2);
        }

        .card-badge {
          font-family: 'Barlow', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #EAB308;
          border: 1px solid rgba(234,179,8,0.4);
          padding: 4px 12px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .card-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.06em;
          line-height: 0.95;
          background: linear-gradient(135deg, #ffffff 30%, #f5f5f5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-subtitle {
          font-family: 'Barlow', sans-serif;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.05em;
          margin-top: 6px;
        }

        .shop-btn {
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 12px;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          color: #000;
          background: linear-gradient(90deg, #EAB308, #DC2626);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .shop-btn:hover {
          background: linear-gradient(90deg, #DC2626, #EAB308);
          transform: translateX(4px);
          color: #000;
        }

        .shop-btn .arrow {
          transition: transform 0.3s ease;
        }

        .shop-btn:hover .arrow {
          transform: translateX(4px);
        }

        .divider-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #EAB308, #DC2626);
          margin-bottom: 16px;
          transition: width 0.4s ease;
        }

        .card-inner:hover .divider-line {
          width: 70px;
        }

        .stat-item {
          font-family: 'Barlow', sans-serif;
          border-left: 1px solid rgba(255,255,255,0.1);
          padding-left: 16px;
        }

        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          background: linear-gradient(90deg, #EAB308, #DC2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.05em;
        }

        .stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .cards-grid {
            flex-direction: column;
          }
          .card-height {
            height: 480px !important;
          }
        }

        @media (max-width: 480px) {
          .card-height {
            height: 400px !important;
          }
        }
      `}</style>

      <section className="gender-section py-16 md:py-24 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="noise-overlay" />

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto mb-12 md:mb-16">
          <p className="section-tagline text-xs text-red-500 mb-3">
            ✦ New Season Arrivals
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="section-header text-white" style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}>
              SHOP BY
              <span style={{
                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block'
              }}>
                COLLECTION
              </span>
            </h1>
            <p className="section-tagline text-sm text-white/40 sm:text-right max-w-xs">
              Curated styles for every identity — bold, refined, fearless.
            </p>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, #EAB308 0%, #DC2626 40%, transparent 100%)', marginTop: '24px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 cards-grid">

          <div className="collection-card flex-1">
            <div className="card-inner card-height" style={{ height: '620px' }}>
              <img src={women} alt="Women collection" className="card-img absolute inset-0" style={{ height: '100%' }} />
              <div className="card-overlay" />
              <div className="card-overlay-hover" />
              <div className="card-number">01</div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <div className="divider-line" />
                <div className="card-badge mb-3">Women's Edit</div>
                <h2 className="card-title mb-2" style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}>
                  HER<br />UNIVERSE
                </h2>
                <p className="card-subtitle text-sm mb-6">
                  Confidence woven into every thread.
                </p>

                <div className="flex gap-4 mb-6">
                  <div className="stat-item">
                    <div className="stat-num">340+</div>
                    <div className="stat-label">Styles</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">New</div>
                    <div className="stat-label">Weekly Drop</div>
                  </div>
                </div>

                <Link to="/collections/all?gender=Women" className="shop-btn">
                  Shop Women
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="collection-card flex-1">
            <div className="card-inner card-height" style={{ height: '620px' }}>
              <img src={mens} alt="Men collection" className="card-img absolute inset-0" style={{ height: '100%' }} />
              <div className="card-overlay" />
              <div className="card-overlay-hover" />
              <div className="card-number">02</div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <div className="divider-line" />
                <div className="card-badge mb-3">Men's Edit</div>
                <h2 className="card-title mb-2" style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}>
                  HIS<br />DOMINION
                </h2>
                <p className="card-subtitle text-sm mb-6">
                  Power dressed for every moment.
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="stat-item">
                    <div className="stat-num">280+</div>
                    <div className="stat-label">Styles</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">New</div>
                    <div className="stat-label">Weekly Drop</div>
                  </div>
                </div>

                <Link to="/collections/all?gender=Men" className="shop-btn">
                  Shop Men
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
        <div className="relative z-10 max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="section-tagline text-xs text-white/25">
            Free shipping on orders over ₹999 &nbsp;·&nbsp; Easy 30-day returns
          </p>
          <p className="section-tagline text-xs" style={{
            background: 'linear-gradient(90deg, #EAB308, #DC2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ✦ &nbsp;New drops every Monday
          </p>
        </div>

      </section>
    </>
  )
}

export default GenderCollections