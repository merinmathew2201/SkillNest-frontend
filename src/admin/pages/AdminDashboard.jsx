import React from 'react'
import { FaBook, FaChalkboardTeacher, FaClock, FaUsers } from 'react-icons/fa'

function AdminDashboard() {
  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

      {/* Welcome Text */}
      <div className='my-10'>
        <h1 className="text-3xl  text-slate-800 mb-2">Welcome, Admin!</h1>
        <p className="text-slate-600 text-sm md:text-base">
          Manage courses, monitor users, and oversee platform activities all in one place. 
          Stay on top of pending requests, track analytics, and keep the learning environment running smoothly.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Students Card */}
        <div className="flex items-center gap-4 p-6 rounded-lg shadow hover:shadow-lg transition bg-blue-100">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">1200</h2>
            <p className="text-gray-700">Total Students</p>
          </div>
        </div>

        {/* Total Educators Card */}
        <div className="flex items-center gap-4 p-6 rounded-lg shadow hover:shadow-lg transition bg-green-100">
          <FaChalkboardTeacher className="text-3xl text-green-500" />
          <div>
            <h2 className="text-2xl font-bold">45</h2>
            <p className="text-gray-700">Total Educators</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="flex items-center gap-4 p-6 rounded-lg shadow hover:shadow-lg transition bg-purple-100">
          <FaBook className="text-3xl text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold">78</h2>
            <p className="text-gray-700">Total Courses</p>
          </div>
        </div>

        {/* Pending Approvals Card */}
        <div className="flex items-center gap-4 p-6 rounded-lg shadow hover:shadow-lg transition bg-red-100">
          <FaClock className="text-3xl text-red-500" />
          <div>
            <h2 className="text-2xl font-bold">5</h2>
            <p className="text-gray-700">Pending Approvals</p>
          </div>
        </div>

      </div>
    </div>
   
  )
}

export default AdminDashboard