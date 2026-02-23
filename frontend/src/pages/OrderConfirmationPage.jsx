import React from 'react'

const OrderConfirmationPage = () => {

    const checkout = {
        _id: "12345",
        createdAt: new Date(),
        checkoutItems: [
            {
                productId: "1",
                name: "Jacket",
                color: "black",
                size: "M",
                price: 150,
                quantity: 1,
                image: "https://picsum.photos/150?random=1"
            },
            {
                productId: "2",
                name: "Jacket",
                color: "black",
                size: "M",
                price: 150,
                quantity: 1,
                image: "https://picsum.photos/150?random=2"
            }
        ],
        shippingAddress: {
            address: "123 Fashion street",
            city: "New York",
            country: "USA"
        }
    }

    const calculateEstimateDelivery = (createdAt) => {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate() + 10)
        return orderDate.toLocaleDateString()
    }

    return (
        <div className='min-h-screen bg-gray-950 text-gray-200 py-12 px-6'>
            <div className='max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-8'>

                <h1 className='text-4xl font-bold text-center text-emerald-400 mb-10'> Thank You for Your Order </h1>

                {
                    checkout &&
                    <div className='rounded-xl border border-gray-800 p-6'>

                        <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12'>

                            <div>
                                <h2 className='text-xl font-semibold text-white'> .Order ID: {checkout._id} </h2>

                                <p className='text-gray-400 mt-1'> Order date: {new Date(checkout.createdAt).toLocaleDateString()} </p>
                            </div>

                            <div>
                                <p className='text-emerald-400 text-sm'> Estimated Delivery: {calculateEstimateDelivery(checkout.createdAt)} </p>
                            </div>

                        </div>

                        <div className='space-y-6 mb-12'>
                            {checkout.checkoutItems.map((item) => (

                                <div key={item.productId} className='flex items-center bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition'>

                                    <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-lg mr-4'/>

                                    <div>
                                        <h4 className='text-md font-semibold text-white'> {item.name} </h4>
                                        <p className='text-sm text-gray-400'> {item.color} | {item.size} </p>
                                    </div>

                                    <div className='ml-auto text-right'>
                                        <p className='text-md font-semibold text-white'> ${item.price} </p>
                                        <p className='text-sm text-gray-400'> Qty: {item.quantity} </p>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-800 pt-8'>

                            <div>
                                <h4 className='text-lg font-semibold mb-2 text-white'> Payment </h4>

                                <p className='text-gray-400'> PayPal </p>
                            </div>

                            <div>
                                <h4 className='text-lg font-semibold mb-2 text-white'> Delivery </h4>

                                <p className='text-gray-400'> {checkout.shippingAddress.address} </p>

                                <p className='text-gray-400'> {checkout.shippingAddress.city},{" "} {checkout.shippingAddress.country} </p>
                            </div>

                        </div>

                    </div>
                }

            </div>
        </div>
    )
}

export default OrderConfirmationPage