import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userDetails,setUserDetails] = useState({})
    
    useEffect(()=>{
      if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
        setUserDetails(JSON.parse(sessionStorage.getItem("user")))
      }
    },[userDetails])
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-100">

      

      <div className="max-w-6xl mx-auto p-8">

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 md:flex items-center  gap-6">
          <img
            src={userDetails?.picture==""?"https://cdn-icons-png.flaticon.com/512/8847/8847419.png":userDetails?.picture}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{userDetails?.username}</h2>
            <p className="text-slate-600">{userDetails?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs bg-cyan-100 text-cyan-700 rounded-full">
              {userDetails?.role}
            </span>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 mt-3 md:mt-0 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700">
            Edit Profile
          </button>
          <EditProfile isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}/>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-5 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-cyan-600">5</h3>
            <p className="text-slate-600 text-sm">Enrolled Courses</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-green-600">2</h3>
            <p className="text-slate-600 text-sm">Completed Courses</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-purple-600">42 hrs</h3>
            <p className="text-slate-600 text-sm">Learning Hours</p>
          </div>
        </div>

        {/* My Courses */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">My Courses</h3>

          {/* Course Card */}
          <div className="bg-white p-5 rounded-lg shadow mb-4">
            <h4 className="font-semibold text-lg">
              Full Stack Web Development
            </h4>
            <p className="text-sm text-slate-600">
              Instructor: John Doe
            </p>

            {/* Progress */}
            <div className="mt-3">
              <div className="w-full bg-slate-200 h-2 rounded-full">
                <div className="bg-cyan-500 h-2 rounded-full w-[50%]" />
              </div>
              <p className="text-xs text-slate-500 mt-1">50% completed</p>
            </div>

            <button className="mt-4 px-4 py-2 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700">
              <Link to={'/courses/:id/learn'}>Continue Learning</Link>
            </button>
          </div>

          {/* Course Card */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h4 className="font-semibold text-lg">
              React for Beginners
            </h4>
            <p className="text-sm text-slate-600">
              Instructor: Jane Smith
            </p>

            <div className="mt-3">
              <div className="w-full bg-slate-200 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-full" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Completed</p>
            </div>

            <button className="mt-4 px-4 py-2 text-sm bg-slate-400 text-white rounded cursor-not-allowed">
              Completed
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Account Information</h3>
          
          <p className="text-sm text-slate-600 mt-1">
            Account Type: <span className="font-medium">{userDetails?.role}</span>
          </p>
        </div>

      </div>
    </div>
    <Footer/>
    </>
   
  )
}

export default Profile