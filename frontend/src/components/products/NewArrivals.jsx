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
    const directionRef = useRef(1) // 1 = right, -1 = left

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

    // Auto scroll animation
    const startAutoScroll = () => {
        stopAutoScroll()
        autoScrollRef.current = setInterval(() => {
            const container = scrollRef.current
            if (!container) return

            const maxScroll = container.scrollWidth - container.clientWidth
            const currentScroll = container.scrollLeft

            // Reverse direction at edges
            if (currentScroll >= maxScroll - 2) {
                directionRef.current = -1
            } else if (currentScroll <= 2) {
                directionRef.current = 1
            }

            container.scrollLeft += directionRef.current * 1.5 // speed: increase for faster
        }, 16) // ~60fps
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
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(rightScrollable)
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons()
            return () => container.removeEventListener("scroll", updateScrollButtons)
        }
    }, [newArrivals])

    const handleMouseDown = (e) => {
        stopAutoScroll() // pause auto scroll while dragging
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeftPos(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeftPos - walk
    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
        startAutoScroll() // resume auto scroll after drag
    }

    return (
        <section className="py-20 px-4 lg:px-0 bg-[#0F1E33] relative overflow-hidden">

            <div className="container mx-auto text-center mb-12 relative z-10">

                <h2 className="text-3xl md:text-4xl font-extrabold mb-5 bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,120,0,0.3)]">
                    Explore New Arrivals
                </h2>

                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                    Discover the latest
                    <span className="text-yellow-400 font-medium"> styles </span>
                    straight off the
                    <span className="text-red-400 font-medium"> runway</span>.
                </p>

                <div className="absolute right-0 bottom-[-40px] flex space-x-3">

                    <button
                        onClick={() => { stopAutoScroll(); scroll("left"); setTimeout(startAutoScroll, 2000) }}
                        disabled={!canScrollLeft}
                        className={`p-3 rounded-full border transition ${canScrollLeft ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>

                    <button
                        onClick={() => { stopAutoScroll(); scroll("right"); setTimeout(startAutoScroll, 2000) }}
                        disabled={!canScrollRight}
                        className={`p-3 rounded-full border transition ${canScrollRight ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>

                </div>
            </div>

            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className={`container mx-auto overflow-x-auto scrollbar-hide flex space-x-6 relative z-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ scrollBehavior: 'auto' }} // must be 'auto' for smooth interval-based scroll
            >

                {newArrivals.map((product) => (
                    <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative group">

                        <img
                            src={product.images[0]?.url}
                            alt={product.images[0]?.altText || product.name}
                            className="w-full h-[500px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                            draggable="false"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-5 rounded-b-2xl">
                            <Link to={`/product/${product._id}`}>
                                <h4 className="font-semibold text-lg">{product.name}</h4>
                                <p className="mt-1 text-gray-300">₹ {product.price}</p>
                            </Link>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    )
}

export default NewArrivals