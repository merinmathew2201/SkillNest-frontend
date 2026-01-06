import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AllCourses() {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-50 px-6 md:px-16 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-800">
          All Courses
        </h1>
        <p className="text-slate-600 mt-2">
          Find the right course and start learning today
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT FILTER PANEL */}
        <aside className="w-full lg:w-1/4 bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-24">

          {/* Header */}
          <div className=" mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Filter Courses
            </h3>
          </div>

          {/* SEARCH */}
          <div className="mb-8">
            <label className="text-sm font-medium text-slate-600">
              Search
            </label>
            <input type="text" placeholder="Search courses..." className="mt-2 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
          </div>

          {/* CATEGORY */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Category
            </h4>

            <div className="space-y-3">

              {/* All Categories */}
              <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                <input type="radio" name="category" defaultChecked />
                All Categories
              </label>

              {/* Dynamic categories later */}
              <label  className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                  <input type="radio" name="category" />
                  category
                </label>
            </div>
          </div>


          {/* LEVEL */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Level
            </h4>

            <div className="space-y-2">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label key={level} className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="accent-cyan-500" />
                  {level}
                </label>
              ))}
            </div>
          </div>

        </aside>


        {/* RIGHT CONTENT */}
        <section className="w-full lg:w-3/4">

          {/* Courses Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

            {/* Duplicate cards */} 
            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2  overflow-hidden">
              <img src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg" alt="course" className="h-44 w-full object-cover"/>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800">
                  Full Stack Web Development
                </h3>

                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  Learn MERN stack with real-world projects and industry practices.
                </p>

                <div className="flex justify-between text-xs text-slate-500 mt-4">
                  <span>Beginner</span>
                  <span>4 Weeks</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-700">
                    By John Doe
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="me-1" /> 4.8
                  </div>
                </div>

                <button className="w-full mt-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition">
                  <Link to={'/courses/:id/view'}>View Course</Link>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2   overflow-hidden">
              <img src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg" alt="course" className="h-44 w-full object-cover"/>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800">
                  Full Stack Web Development
                </h3>

                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  Learn MERN stack with real-world projects and industry practices.
                </p>

                <div className="flex justify-between text-xs text-slate-500 mt-4">
                  <span>Beginner</span>
                  <span>4 Weeks</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-700">
                    By John Doe
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="me-1" /> 4.8
                  </div>
                </div>

                <button className="w-full mt-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition">
                  View Course
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2   overflow-hidden">
              <img src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg" alt="course" className="h-44 w-full object-cover"/>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800">
                  Full Stack Web Development
                </h3>

                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  Learn MERN stack with real-world projects and industry practices.
                </p>

                <div className="flex justify-between text-xs text-slate-500 mt-4">
                  <span>Beginner</span>
                  <span>4 Weeks</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-700">
                    By John Doe
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="me-1" /> 4.8
                  </div>
                </div>

                <button className="w-full mt-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition">
                  View Course
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2   overflow-hidden">
              <img src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg" alt="course" className="h-44 w-full object-cover"/>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-800">
                  Full Stack Web Development
                </h3>

                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  Learn MERN stack with real-world projects and industry practices.
                </p>

                <div className="flex justify-between text-xs text-slate-500 mt-4">
                  <span>Beginner</span>
                  <span>4 Weeks</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-slate-700">
                    By John Doe
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="me-1" /> 4.8
                  </div>
                </div>

                <button className="w-full mt-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition">
                  View Course
                </button>
              </div>
            </div>

            
          </div>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AllCourses