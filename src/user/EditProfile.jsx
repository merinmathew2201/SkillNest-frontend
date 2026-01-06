import React, { useState } from 'react'
import { FaLock, FaTimes, FaUser } from 'react-icons/fa';

function EditProfile({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("profile");
    if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium
              ${activeTab === "profile"
                ? "border-b-2 border-cyan-500 text-cyan-600"
                : "text-slate-500"}
            `}
          >
            <FaUser /> Profile Info
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium
              ${activeTab === "password"
                ? "border-b-2 border-cyan-500 text-cyan-600"
                : "text-slate-500"}
            `}
          >
            <FaLock /> Password
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full mt-1 px-3 py-2 border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded-lg "
                />
              </div>

              <div>
                <textarea
                  rows="3"
                  placeholder="Tell something about yourself"
                  className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="space-y-4">
              

              <div>
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm hover:bg-cyan-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile