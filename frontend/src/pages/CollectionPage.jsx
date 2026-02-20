import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSideBar from '../components/products/FilterSideBar';
import SortOPtions from '../components/products/SortOPtions';
import ProductGrid from '../components/products/ProductGrid';
const CollectionPage = () => {
    const [product, setProduct] = useState([]);
    const sidebarRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const toogleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const handleClickOutside = (e) => {
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }

    useEffect (() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("moudedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const fetchedProduct = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=2" }],
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=3" }],
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=4" }],
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=5" }],
                },
            ]
            setProduct(fetchedProduct)
        }, 1000)
    }, [])
    return (
        <div className='flex flex-col lg:flex-row'>
            
            <button onClick={toogleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>    <FaFilter className='mr-2'/> </button>

            <div ref={sidebarRef} className={`${ isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSideBar /> 
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
                <SortOPtions />
                <ProductGrid product={product}/>
            </div>
        </div>
    )
}

export default CollectionPage
