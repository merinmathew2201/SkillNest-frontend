import React from 'react'
import { Link } from 'react-router-dom'

function EducatorHeader() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-cyan-600"><Link to={'/'}>SkillNest</Link></h1>
        <span className="text-sm bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
          Educator
        </span>
      </div>

      {/* Center */}
      <nav className="hidden md:flex gap-6 text-slate-700 font-medium">
        <Link to="/educator/dashboard" className="hover:text-cyan-600">
          Dashboard
        </Link>
        <Link to="/educator/courses" className="hover:text-cyan-600">
          My Courses
        </Link>
        <Link to="/educator/create-course" className="hover:text-cyan-600">
          Create Course
        </Link>
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="text-slate-600 hover:text-cyan-600">
          Home
        </Link>

        <button className="text-red-500 hover:underline">
          Logout
        </button>
      </div>

    </header>
  )
}

export default EducatorHeader