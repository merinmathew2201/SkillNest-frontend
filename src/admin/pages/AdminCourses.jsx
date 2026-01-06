import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';

function AdminCourses() {
    const [activeTab, setActiveTab] = useState("pending");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Courses</h1>
      <p className="text-gray-700 mb-6">Manage all courses on the platform.</p>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-4">
        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Courses
        </button>

        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("all")}
        >
          All Courses
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-b-lg p-3 sm:p-4">

        <div className="overflow-x-auto">

          {activeTab === "pending" && (
            <table className="min-w-105 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">ID</th>
                  <th className="text-left p-2 sm:p-3">Title</th>
                  <th className="text-left p-2 sm:p-3">Educator</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">1</td>
                  <td className="p-2 sm:p-3">React for Beginners</td>
                  <td className="p-2 sm:p-3">Alice Johnson</td>
                  <td className="p-2 sm:p-3 flex gap-2">
                    <button className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm hover:bg-green-700">
                      Approve
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">2</td>
                  <td className="p-2 sm:p-3">Node.js Masterclass</td>
                  <td className="p-2 sm:p-3">Bob Smith</td>
                  <td className="p-2 sm:p-3 flex gap-2">
                    <button className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm hover:bg-green-700">
                      Approve
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === "all" && (
            <table className="min-w-175 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">ID</th>
                  <th className="text-left p-2 sm:p-3">Title</th>
                  <th className="text-left p-2 sm:p-3">Educator</th>
                  <th className="text-left p-2 sm:p-3">Status</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">3</td>
                  <td className="p-2 sm:p-3">JavaScript Advanced</td>
                  <td className="p-2 sm:p-3">Alice Johnson</td>
                  <td className="p-2 sm:p-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs sm:text-sm">
                      Active
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3">4</td>
                  <td className="p-2 sm:p-3">CSS Animations</td>
                  <td className="p-2 sm:p-3">Bob Smith</td>
                  <td className="p-2 sm:p-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs sm:text-sm">
                      Active
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <button className="text-red-500 hover:text-red-700">
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

export default AdminCourses