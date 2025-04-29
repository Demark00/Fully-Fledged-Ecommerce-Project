import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Left: Welcome Banner */}
      <div className="hidden md:flex flex-col justify-center items-center w-2/5 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to NextCart!</h1>
        <p className="text-lg">Your one-stop destination for smart shopping.</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Shopping"
          className="w-64 h-64 mt-8"
        />
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login to Your Account</h2>
        <form className="w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page