import React from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { Link } from 'react-router-dom'

function EducatorCourses() {
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
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg"
              alt="course"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Full Stack Web Development
              </h2>
              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-sm mb-4">
                Approved
              </span>
              
              <button className="w-full py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition">
                <Link to={'/educator/courses/:id/manage'}>Manage Course</Link>
              </button>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg"
              alt="course"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                React Basics
              </h2>
              <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm mb-4">
                Pending
              </span>
              
              <button className="w-full py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition">
                Manage Course
              </button>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default EducatorCourses