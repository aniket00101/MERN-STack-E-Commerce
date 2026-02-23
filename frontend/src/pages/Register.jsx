import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import register from '../assets/register.webp'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Register", { name, email, password })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 
        bg-gradient-to-br from-gray-950 via-slate-900 to-black relative overflow-hidden">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-20">
                <img
                    src={register}
                    alt="Register background"
                    className="w-full h-full object-cover blur-lg scale-110"
                />
            </div>

            <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-4xl 
            lg:flex bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl 
            border border-white/10 overflow-hidden">

                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black bg-gradient-to-r 
                        from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            NexMart
                        </h1>

                        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4">
                            Create Account 🚀
                        </h2>

                        <p className="text-gray-400 mt-2">
                            Enter your details to get started
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                                text-white placeholder-gray-400 rounded-xl 
                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                                outline-none transition-all duration-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                                text-white placeholder-gray-400 rounded-xl 
                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                                outline-none transition-all duration-300"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                                text-white placeholder-gray-400 rounded-xl 
                                focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                                outline-none transition-all duration-300"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 
                            text-white py-3 rounded-xl font-semibold text-lg 
                            shadow-lg hover:scale-105 active:scale-95 
                            transition-all duration-300"
                        >
                            Sign Up →
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:text-purple-300 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right Side Image (Desktop Only) */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center 
                bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8">
                    <img
                        src={register}
                        alt="Register"
                        className="rounded-2xl shadow-2xl max-h-[450px] object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Register