import React, { useState } from "react";

const UserManagment = () => {
  const users = [
    {
      _id: 123456,
      name: "John Doe",
      email: "john@gmail.com",
      role: "admin",
    },
    {
      _id: 789012,
      name: "Jane Smith",
      email: "jane@gmail.com",
      role: "customer",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ id: userId, role: newRole });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("deleting user with ID", userId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-gray-200 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          User Management
        </h2>

        {/* ================= FORM ================= */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 
        rounded-3xl shadow-2xl p-6 sm:p-8 mb-12">

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
            Add New User
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                text-white rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                text-white rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                text-white rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                text-white rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 
                text-white py-3 rounded-xl font-semibold 
                hover:scale-[1.02] active:scale-95 transition"
              >
                Add User →
              </button>
            </div>
          </form>
        </div>

        {/* ================= USER CARDS ================= */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
          All Users
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 
              rounded-2xl p-6 shadow-xl hover:bg-white/10 
              hover:-translate-y-1 transition duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">
                  {user.name}
                </h4>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold
                  ${user.role === "admin"
                      ? "bg-purple-900/40 text-purple-400 border border-purple-700"
                      : "bg-blue-900/40 text-blue-400 border border-blue-700"
                    }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Email */}
              <p className="text-gray-400 text-sm mb-4">
                {user.email}
              </p>

              {/* Role Selector */}
              <div className="mb-4">
                <label className="block text-xs text-gray-400 mb-1">
                  Change Role
                </label>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 
                  text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="w-full bg-red-600/80 hover:bg-red-600 
                text-white py-2 rounded-lg transition"
              >
                Delete User
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default UserManagment;