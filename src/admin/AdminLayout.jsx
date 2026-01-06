import React from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader />

        <div className="p-6">
         <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminLayout