import React, { useState } from 'react'
import { FaBook, FaTachometerAlt, FaUserEdit, FaUsers } from 'react-icons/fa'
import {  NavLink } from 'react-router-dom'
import AdminProfileEdit from './AdminProfileEdit'

function AdminSidebar() {

  const [showModal, setShowModal] = useState(false)

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-300 hover:bg-gray-800 hover:text-white"
     }`
  return (
    <>
      <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-10 text-center">
          SkillNest <span className="text-blue-400">Admin</span>
        </h1>
  
        {/* Navigation */}
        <nav className="space-y-3">
          <NavLink to="/admin/dashboard" className={linkClasses}>
            <FaTachometerAlt />
            Dashboard
          </NavLink>
  
          <NavLink to="/admin/users" className={linkClasses}>
            <FaUsers />
            Users
          </NavLink>
  
          <NavLink to="/admin/courses" className={linkClasses}>
            <FaBook />
            Courses
          </NavLink>
          <button onClick={() => setShowModal(true)} className='flex items-center  px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition w-full'><FaUserEdit className='me-2' />Edit Profile</button>
        </nav>
      </div>
      {showModal&&
      <AdminProfileEdit isOpen={showModal} onClose={() => setShowModal(false)}/>}
    </>
  )
}

export default AdminSidebar