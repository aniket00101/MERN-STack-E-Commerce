import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton'

const Checkout = () => {

    const cart = {
        product: [
            {
                name: "Stylish Jacket",
                size: "M",
                color: "Black",
                price: 120,
                image: "https://picsum.photos/150?random=1",
            },
            {
                name: "Casual Sneakers",
                size: "42",
                color: "White",
                price: 75,
                image: "https://picsum.photos/150?random=2",
            }
        ],
        totalPrice: 195,
    }

    const navigate = useNavigate()
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

    const handleCreateCheckout = (e) => {
        e.preventDefault()
        setCheckoutId(123)
    }

    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful", details);
        navigate("/order-confirmation")
    }
    return (
        <div className="min-h-screen bg-gray-950 text-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">

                {/* LEFT SIDE */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

                    <h2 className="text-2xl uppercase mb-6">Checkout</h2>

                    <form onSubmit={handleCreateCheckout}>
                        <h3 className="text-lg mb-4 text-gray-300">Contact Details</h3>

                        <div className="mb-4">
                            <label className="block text-gray-400">Email</label>
                            <input
                                type="email"
                                value="user@example.com"
                                disabled
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400"
                            />
                        </div>

                        <h3 className="text-lg mb-4 mt-6 text-gray-300">Delivery</h3>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">First Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.firstName}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            firstName: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400">Last Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.lastName}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            lastName: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-400">Address</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400">City</label>
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            city: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400">Postal Code</label>
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-400">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        country: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-400">Phone No</label>
                            <input
                                type="tel"
                                value={shippingAddress.phone}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        <div className="mt-6">
                            {!checkoutId ? (
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
                                >
                                    Continue to Payment
                                </button>
                            ) : (
                                <div>
                                    <h3 className="text-lg mb-4">Pay with Paypal</h3>
                                    <PaypalButton
                                        amount={100}
                                        onSuccess={handlePaymentSuccess}
                                        onError={() => alert("Payment failed. Try again later.")}
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">

                    <h3 className="text-lg mb-6">Order Summary</h3>

                    <div className="border-t border-gray-800 py-4 mb-4">
                        {cart.product.map((products, index) => (
                            <div key={index} className="flex items-start justify-between py-4 border-b border-gray-800">
                                <div className="flex items-start">
                                    <img
                                        src={products.image}
                                        alt={products.name}
                                        className="w-20 h-24 object-cover rounded-lg mr-4"
                                    />
                                    <div>
                                        <h3 className="text-md">{products.name}</h3>
                                        <p className="text-gray-400 text-sm">Size: {products.size}</p>
                                        <p className="text-gray-400 text-sm">Color: {products.color}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-medium">
                                    ${products.price?.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-lg mb-3">
                        <p className="text-gray-400">Subtotal</p>
                        <p>${cart.totalPrice?.toLocaleString()}</p>
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