import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
   <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome!</h1>
        <div className="space-y-4">
          <Link
            to="/signin"
            className="block w-64 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Login As User
          </Link>
          <Link
            to="/admin-login"
            className="block w-64 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Login As Admin
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
