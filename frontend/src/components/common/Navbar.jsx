import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import { IoMdClose } from 'react-icons/io'
import SearchBar from './SearchBar'
import CartDrawer from '../layout/CartDrawer'

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <div>

            {/* Navbar */}
            <nav className='
                sticky top-0 z-40
                backdrop-blur-xl
                bg-[#0f172a]/80
                border-b border-white/10
                shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            '>

                <div className='container mx-auto flex items-center justify-between py-4 px-6 text-gray-200'>

                    {/* Logo */}
                    <Link to="/" className='text-2xl font-semibold tracking-wide hover:text-purple-400 transition'>
                        Rabbit
                    </Link>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wide'>
                        <Link to="/collections/all" className='hover:text-purple-400 transition'>Men</Link>
                        <Link to="#" className='hover:text-purple-400 transition'>Women</Link>
                        <Link to="#" className='hover:text-purple-400 transition'>Top Wear</Link>
                        <Link to="#" className='hover:text-purple-400 transition'>Bottom Wear</Link>
                    </div>

                    {/* Right Section */}
                    <div className='flex items-center space-x-5'>

                        <Link 
                            to="/admin" 
                            className='sm:block bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-xs font-medium transition'
                        >
                            Admin
                        </Link>

                        <Link to="/profile" className='hover:text-purple-400 transition'>
                            <HiOutlineUser className='h-6 w-6' />
                        </Link>

                        {/* Cart */}
                        <button onClick={toggleCartDrawer} className='relative hover:text-purple-400 transition'>
                            <HiOutlineShoppingBag className='h-6 w-6' />
                            <span className='
                                absolute -top-2 -right-2
                                bg-purple-600
                                text-white text-xs
                                rounded-full
                                px-2 py-0.5
                                shadow-md
                            '>
                                4
                            </span>
                        </button>

                        {/* Search */}
                        <div className='md:block'>
                            <SearchBar />
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleNavDrawer} className='md:hidden hover:text-purple-400 transition'>
                            <HiBars3BottomRight className='h-7 w-7' />
                        </button>

                    </div>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer drawerOPen={drawerOpen} toogleCartDrawer={toggleCartDrawer} />

            {/* Mobile Nav Drawer */}
            <div className={`
                fixed top-0 left-0
                w-3/4 sm:w-1/2 md:w-1/3
                h-full
                bg-[#0f172a]
                text-gray-200
                backdrop-blur-xl
                shadow-2xl
                transform transition-transform duration-300 z-50
                ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}
            `}>

                {/* Close Button */}
                <div className='flex justify-end p-5'>
                    <button onClick={toggleNavDrawer} className='hover:text-purple-400 transition'>
                        <IoMdClose className='h-7 w-7' />
                    </button>
                </div>

                {/* Menu Items */}
                <div className='px-6'>
                    <h2 className='text-lg font-semibold mb-6 tracking-wide'>
                        Menu
                    </h2>

                    <nav className='space-y-6 text-base font-medium'>
                        <Link to="#" onClick={toggleNavDrawer} className='block hover:text-purple-400 transition'>
                            Men
                        </Link>

                        <Link to="#" onClick={toggleNavDrawer} className='block hover:text-purple-400 transition'>
                            Women
                        </Link>

                        <Link to="#" onClick={toggleNavDrawer} className='block hover:text-purple-400 transition'>
                            Top Wear
                        </Link>

                        <Link to="#" onClick={toggleNavDrawer} className='block hover:text-purple-400 transition'>
                            Bottom Wear
                        </Link>
                    </nav>
                </div>

            </div>

        </div>
    )
}

export default Navbar