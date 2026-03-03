import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSideBar from '../components/products/FilterSideBar'
import SortOPtions from '../components/products/SortOPtions'
import ProductGrid from '../components/products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByFilters } from '../redux/slice/productSlice'

const CollectionPage = () => {
    const {collection} = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const {products, loading, error} = useSelector((state) => state.products)
    const queryParams = Object.fromEntries([...searchParams])
    const sidebarRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchProductByFilters({ collection, ...queryParams}))
    }, [dispatch, collection, searchParams.toString()])

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isSideBarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [isSideBarOpen])

    

    return (
        <div className="min-h-screen bg-gradient-to-br 
        from-gray-950 via-slate-900 to-black text-white">

            <div className="flex relative">

                {isSideBarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSideBarOpen(false)}/>
                )}

                <div ref={sidebarRef} className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`} > <FilterSideBar /> </div>

                <div className="flex-1 p-4 sm:p-6 lg:p-10">

                    <div className="lg:hidden mb-4">

                        <button onClick={toggleSidebar} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300">
                            <FaFilter />
                            Filters
                        </button>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent uppercase"> All Collection </h2>

                    <div className="mb-6"> <SortOPtions /> </div>

                    <ProductGrid products={products} loading={loading} error={error}/>

                </div>
            </div>
        </div>
    )
}

export default CollectionPage