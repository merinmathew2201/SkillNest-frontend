import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';

function AdminUsers() {
    const [activeTab, setActiveTab] = useState("pending");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-gray-700 mb-6">Manage platform users here.</p>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-4">
        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Requests
        </button>

        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("all")}
        >
          All Users
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-b-lg p-3 sm:p-4">
        <div className="overflow-x-auto">

          {/* Pending Users */}
          {activeTab === "pending" && (
            <table className="min-w-105 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">ID</th>
                  <th className="text-left p-2 sm:p-3">Name</th>
                  <th className="text-left p-2 sm:p-3">Email</th>
                  <th className="text-left p-2 sm:p-3">Role</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">1</td>
                  <td className="p-2 sm:p-3">Bob Smith</td>
                  <td className="p-2 sm:p-3">bob@example.com</td>
                  <td className="p-2 sm:p-3">Student</td>
                  <td className="p-2 sm:p-3 flex gap-2">
                    <button className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm">
                      Approve
                    </button>
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">2</td>
                  <td className="p-2 sm:p-3">Jane Doe</td>
                  <td className="p-2 sm:p-3">jane@example.com</td>
                  <td className="p-2 sm:p-3">Educator</td>
                  <td className="p-2 sm:p-3 flex gap-2">
                    <button className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm">
                      Approve
                    </button>
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {/* All Users */}
          {activeTab === "all" && (
            <table className="min-w-175 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">ID</th>
                  <th className="text-left p-2 sm:p-3">Name</th>
                  <th className="text-left p-2 sm:p-3">Email</th>
                  <th className="text-left p-2 sm:p-3">Role</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">3</td>
                  <td className="p-2 sm:p-3">Alice Johnson</td>
                  <td className="p-2 sm:p-3">alice@example.com</td>
                  <td className="p-2 sm:p-3">Student</td>
                  
                  <td className="p-2 sm:p-3">
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">4</td>
                  <td className="p-2 sm:p-3">Mark Lee</td>
                  <td className="p-2 sm:p-3">mark@example.com</td>
                  <td className="p-2 sm:p-3">Educator</td>
                  
                  <td className="p-2 sm:p-3">
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminUsers