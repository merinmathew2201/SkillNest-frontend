import React, { useEffect, useState } from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { Link } from 'react-router-dom'
import { getEducatorStatsAPI } from '../../services/allAPI'

function EducatorDashboard() {
  const [stats,setStats] = useState({
      totalCourses:"",approvedCourses:"",pendingCourses:"",totalStudents:""
    })

  useEffect(()=>{
    getDashboardStats()
  },[])

  const getDashboardStats = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getEducatorStatsAPI(reqHeader)
      if (result.status == 200){
        setStats(result.data)
      }else{
        console.log(result);
      }
    }
  }
  return (
    <>
        <EducatorHeader/>
        <div className="bg-slate-100 min-h-screen p-6 md:p-10">
    
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back 
            </h1>
            <p className="text-slate-600 mt-4 text-sm md:text-base">
              Create and manage your courses, upload lectures and resources, and monitor enrolled students. 
              Share your knowledge and help learners grow their skills with engaging content.
            </p>
          </div>
    
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500 text-sm">Total Courses</p>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">{stats?.totalCourses}</h2>
            </div>
    
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500 text-sm">Approved Courses</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">{stats?.approvedCourses}</h2>
            </div>
    
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500 text-sm">Pending Approval</p>
              <h2 className="text-3xl font-bold text-yellow-500 mt-2">{stats?.pendingCourses}</h2>
            </div>
    
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500 text-sm">Total Students</p>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">{stats?.totalStudents}</h2>
            </div>
    
          </div>
    
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
    
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
                <Link to="/educator/create-course">
                    Create Course
                </Link>
              </button>
    
              <button className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                <Link to="/educator/courses" className="hover:text-cyan-600">
                    View My Courses
                </Link>
              </button>
            </div>
          </div>
    
        </div>
    </>
  )
}

export default EducatorDashboard