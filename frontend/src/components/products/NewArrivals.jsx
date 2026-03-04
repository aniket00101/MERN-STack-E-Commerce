import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeftPos, setScrollLeftPos] = useState(0)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const autoScrollRef = useRef(null)
    const directionRef = useRef(1)

    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchNewArrivals()
    }, [])

    const startAutoScroll = () => {
        stopAutoScroll()
        autoScrollRef.current = setInterval(() => {
            const container = scrollRef.current
            if (!container) return
            const maxScroll = container.scrollWidth - container.clientWidth
            const currentScroll = container.scrollLeft
            if (currentScroll >= maxScroll - 2) directionRef.current = -1
            else if (currentScroll <= 2) directionRef.current = 1
            container.scrollLeft += directionRef.current * 1.5
        }, 16)
    }

    const stopAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
            autoScrollRef.current = null
        }
    }

    useEffect(() => {
        startAutoScroll()
        return () => stopAutoScroll()
    }, [])

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current
        if (container) {
            const leftScroll = container.scrollLeft
            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(container.scrollWidth > leftScroll + container.clientWidth)
        }
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons()
            return () => container.removeEventListener("scroll", updateScrollButtons)
        }
    }, [newArrivals])

    const handleMouseDown = (e) => {
        stopAutoScroll()
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeftPos(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const x = e.pageX - scrollRef.current.offsetLeft
        scrollRef.current.scrollLeft = scrollLeftPos - (x - startX)
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
        startAutoScroll()
    }

    return (
        <section className="relative py-20 px-4 lg:px-0 bg-black overflow-hidden">

            {/* Google Fonts */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');`}</style>

            {/* Background radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(220,38,38,0.1) 0%, transparent 70%)' }}
            />

            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #EAB308, #DC2626, transparent)' }}
            />

            <div className="container mx-auto relative z-10">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">

                    {/* Title block */}
                    <div>
                        {/* Live badge */}
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-yellow-500/30 bg-yellow-500/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                            <span
                                className="text-yellow-400 text-xs font-semibold tracking-widest uppercase"
                                style={{ fontFamily: "'Barlow', sans-serif" }}
                            >
                                Just Dropped
                            </span>
                        </div>

                        <h2
                            className="font-black leading-none tracking-tight"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: 'clamp(42px, 6vw, 80px)',
                                background: 'linear-gradient(135deg, #ffffff 20%, #EAB308 60%, #DC2626 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '0.04em',
                            }}
                        >
                            New Arrivals
                        </h2>

                        <p
                            className="mt-3 text-white/40 text-sm tracking-widest uppercase font-light"
                            style={{ fontFamily: "'Barlow', sans-serif" }}
                        >
                            Fresh off the rack — styles that define the season
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">

                        <Link
                            to="/collections/all"
                            className="hidden sm:inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-black px-5 py-2.5 transition-opacity duration-300 hover:opacity-90"
                            style={{
                                fontFamily: "'Barlow', sans-serif",
                                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                            }}
                        >
                            View All →
                        </Link>

                        <button
                            onClick={() => { stopAutoScroll(); scroll("left"); setTimeout(startAutoScroll, 2000) }}
                            disabled={!canScrollLeft}
                            className={`p-3 border transition-all duration-300 ${canScrollLeft
                                ? "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400"
                                : "border-white/10 text-white/20 cursor-not-allowed"
                            }`}
                        >
                            <FiChevronLeft className="text-xl" />
                        </button>

                        <button
                            onClick={() => { stopAutoScroll(); scroll("right"); setTimeout(startAutoScroll, 2000) }}
                            disabled={!canScrollRight}
                            className={`p-3 border transition-all duration-300 ${canScrollRight
                                ? "border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-400"
                                : "border-white/10 text-white/20 cursor-not-allowed"
                            }`}
                        >
                            <FiChevronRight className="text-xl" />
                        </button>

                    </div>
                </div>

                {/* ── Scroll Track ── */}
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className={`flex gap-5 overflow-x-auto scrollbar-hide select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{ scrollBehavior: 'auto' }}
                >
                    {newArrivals.map((product, index) => (
                        <div
                            key={product._id}
                            className="relative group flex-shrink-0 overflow-hidden"
                            style={{ minWidth: 'min(100%, clamp(260px, 30vw, 340px))' }}
                        >
                            {/* Image wrapper */}
                            <div className="relative overflow-hidden" style={{ height: '480px' }}>

                                <img
                                    src={product.images[0]?.url}
                                    alt={product.images[0]?.altText || product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    draggable="false"
                                    style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                                />

                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                {/* Hover red tint */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, transparent 60%)' }}
                                />

                                {/* NEW badge */}
                                <div
                                    className="absolute top-4 left-4 px-2.5 py-1 text-black font-bold tracking-widest uppercase"
                                    style={{
                                        fontFamily: "'Barlow', sans-serif",
                                        fontSize: '10px',
                                        background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                                    }}
                                >
                                    New
                                </div>

                                {/* Ghost index number */}
                                <div
                                    className="absolute top-2 right-3 text-white/5 group-hover:text-white/10 transition-colors duration-500 font-black leading-none pointer-events-none"
                                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '72px' }}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Card info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">

                                    {/* Animated accent line */}
                                    <div
                                        className="mb-3 h-px w-8 group-hover:w-14 transition-all duration-500"
                                        style={{ background: 'linear-gradient(90deg, #EAB308, #DC2626)' }}
                                    />

                                    <Link to={`/product/${product._id}`} className="block">
                                        <h4
                                            className="text-white font-bold leading-tight mb-2 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-2"
                                            style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(14px, 2vw, 17px)', letterSpacing: '0.02em' }}
                                        >
                                            {product.name}
                                        </h4>

                                        <div className="flex items-center justify-between">
                                            <span
                                                className="font-bold"
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    fontSize: '22px',
                                                    background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    letterSpacing: '0.05em',
                                                }}
                                            >
                                                ₹ {product.price}
                                            </span>

                                            <span
                                                className="text-white/40 tracking-widest uppercase"
                                                style={{ fontFamily: "'Barlow', sans-serif", fontSize: '10px' }}
                                            >
                                                Shop →
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 flex justify-center sm:hidden">
                    <Link
                        to="/collections/all"
                        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-black px-8 py-3 transition-opacity hover:opacity-90"
                        style={{
                            fontFamily: "'Barlow', sans-serif",
                            background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                        }}
                    >
                        View All Arrivals →
                    </Link>
                </div>

            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #DC2626, #EAB308, transparent)' }}
            />

        </section>
    )
}

export default NewArrivals