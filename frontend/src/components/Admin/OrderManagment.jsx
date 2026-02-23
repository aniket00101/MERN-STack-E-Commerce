import React from "react";

const OrderManagment = () => {
  const orders = [
    {
      _id: 123123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 456456456,
      user: {
        name: "Jane Smith",
      },
      totalPrice: 250,
      status: "Shipped",
    },
  ];

  const handleStatusChange = (orderId, status) => {
    console.log({ id: orderId, status });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-gray-200 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10"> Order Management </h2>

        {orders.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {orders.map((order) => (

              <div key={order._id} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:-translate-y-1 transition duration-300">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-lg font-bold text-white"> #{order._id} </h3>

                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${order.status === "Delivered" ? "bg-green-900/40 text-green-400 border border-green-700" : order.status === "Shipped" ? "bg-blue-900/40 text-blue-400 border border-blue-700" : order.status === "Cancelled" ? "bg-red-900/40 text-red-400 border border-red-700" : "bg-yellow-900/40 text-yellow-400 border border-yellow-700"}`} > {order.status} </span>

                </div>

                <div className="mb-3">

                  <p className="text-sm text-gray-400">Customer</p>

                  <p className="text-white font-medium"> {order.user.name} </p>

                </div>

                <div className="mb-5">

                  <p className="text-sm text-gray-400">Total Price</p>

                  <p className="text-2xl font-semibold text-emerald-400"> ${order.totalPrice} </p>
                </div>

                <div className="mb-4">

                  <label className="block text-xs text-gray-400 mb-1"> Update Status </label>

                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-purple-500">
                    
                    <option value="Processing">Processing</option>

                    <option value="Shipped">Shipped</option>

                    <option value="Delivered">Delivered</option>

                    <option value="Cancelled">Cancelled</option>

                  </select>
                </div>

                <button onClick={() => handleStatusChange(order._id, "Delivered")} className="w-full bg-green-600/80 hover:bg-green-600 
                  text-white py-2 rounded-lg transition">Mark as Delivered</button>

              </div>
            ))}

          </div>
        ) : (

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 text-center text-gray-400">No Orders Found.</div>
          
        )}

      </div>
    </div>
  );
};

export default OrderManagment;