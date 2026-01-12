import React, { useEffect, useState } from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { Link } from 'react-router-dom'
import { getEducatorCoursesAPI } from '../../services/allAPI'
import serverURL from '../../services/serverURL'

function EducatorCourses() {
  const [courses,setCourses] = useState([])

  useEffect(()=>{
    getEducatorCourses()
  },[courses])


  const getEducatorCourses = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getEducatorCoursesAPI(reqHeader)
      if(result.status == 200){
        setCourses(result.data)
      }else{
        console.log(result);
        
      }
    }
  }
  return (
    <>
    <EducatorHeader/>
    <div className="bg-slate-100 min-h-screen p-6 md:p-10">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">My Courses</h1>
          <p className="text-slate-600 mt-1">
            View and manage all the courses you have created.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* duplicated Course Cards */}
          {courses?.length>0?
            courses?.map(course=>(
              <div key={course?._id} className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={`${serverURL}/uploads/images/${course?.thumbnail}`}
                  alt="course"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">
                   {course?.title}
                  </h2>
                  {course?.courseApproved?<span className=" inline-block bg-green-100 text-green-700 px-2 mb-4 py-1 rounded text-xs sm:text-sm">
                    Approved
                  </span>:<span className="inline-block bg-red-100 text-red-700 px-2 py-1 mb-4 rounded text-xs sm:text-sm">
                    Pending
                  </span>}
                  
                  {course?.courseApproved ? (
                    <Link to={`/educator/courses/${course?._id}/manage`} className="block text-center w-full py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition">Manage Course</Link>
                  ) : (
                    <button disabled className="w-full py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
                      Waiting for Approval
                    </button>
                  )}
                </div>
              </div>
            ))
          :
          <p className='my-5 font bold px-8'>No Courses Created...</p>}

          


        </div>
      </div>
    </>
  )
}

export default EducatorCourses