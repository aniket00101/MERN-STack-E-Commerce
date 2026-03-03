import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { createCheckout } from '../../redux/slice/checkoutSlice'

const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart, loading, error } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const [checkoutId, setCheckoutId] = useState(null)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/")
        }
    }, [cart, navigate])

    // FIX 1: Added await so res.payload is populated from the resolved action
    const handleCreateCheckout = async (e) => {
        e.preventDefault()
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Paypal",
                    totalPrice: cart.totalPrice,
                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id)
            }
        }
    }

    const handlePaymentSuccess = async (details) => {
        try {
            // FIX 2: Added checkoutId to the payment URL
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
            await handleFinalizeCheckout(checkoutId)
        } catch (error) {
            console.error(error)
        }
    }

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
            )
            navigate("order-confirmation")
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return <p>Loading cart</p>
    }

    // FIX 3: Changed template literal ${error} to JSX expression {error}
    if (error) {
        return <p>Error: {error}</p>
    }

    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

                    <h2 className="text-2xl uppercase mb-6">Checkout</h2>

                    <form onSubmit={handleCreateCheckout}>

                        <h3 className="text-lg mb-4 text-gray-300">Contact Details</h3>

                        <div className="mb-4">

                            <label className="block text-gray-400">Email</label>

                            <input type="email" value={user ? user.email : ""} disabled className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400" />

                        </div>

                        <h3 className="text-lg mb-4 mt-6 text-gray-300">Delivery</h3>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>

                                <label className="block text-gray-400">First Name</label>

                                <input type="text" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                            </div>

                            <div>

                                <label className="block text-gray-400">Last Name</label>

                                <input type="text" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                            </div>
                        </div>

                        <div className="mb-4">

                            <label className="block text-gray-400">Address</label>

                            <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">

                            <div>

                                <label className="block text-gray-400">City</label>

                                <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                            </div>

                            <div>

                                <label className="block text-gray-400">Postal Code</label>

                                <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                            </div>
                        </div>

                        <div className="mb-4">

                            <label className="block text-gray-400">Country</label>

                            <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-400">Phone No</label>

                            <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value, })} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500" required />

                        </div>

                        <div className="mt-6">

                            {!checkoutId ? (

                                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
                                > Continue to Payment </button>

                            ) : (
                                <div>

                                    <h3 className="text-lg mb-4">Pay with Paypal</h3>

                                    <PaypalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={() => alert("Payment failed. Try again later.")} />

                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">

                    <h3 className="text-lg mb-6">Order Summary</h3>

                    <div className="border-t border-gray-800 py-4 mb-4">
                        {/* FIX 4: Changed cart.product.map to cart.products.map */}
                        {cart.products.map((products, index) => (
                            <div key={index} className="flex items-start justify-between py-4 border-b border-gray-800">
                                <div className="flex items-start">

                                    <img src={products.image} alt={products.name} className="w-20 h-24 object-cover rounded-lg mr-4" />

                                    <div>

                                        <h3 className="text-md">{products.name}</h3>

                                        <p className="text-gray-400 text-sm">Size: {products.size}</p>

                                        <p className="text-gray-400 text-sm">Color: {products.color}</p>

                                    </div>
                                </div>

                                <p className="text-lg font-medium"> ₹ {products.price?.toLocaleString()} </p>

                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-lg mb-3">
                        <p className="text-gray-400">Subtotal</p>
                        <p>₹ {cart.totalPrice?.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between items-center text-lg">
                        <p className="text-gray-400">Shipping</p>
                        <p>Free</p>
                    </div>

                    <div className="flex justify-between items-center text-xl mt-6 border-t border-gray-800 pt-6 font-semibold">
                        <p>Total</p>
                        <p>${cart.totalPrice?.toLocaleString()}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout