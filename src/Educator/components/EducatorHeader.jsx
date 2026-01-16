import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EducatorProfileEdit from './EducatorProfileEdit'
import { routeGuardContext } from '../../contextAPI/AuthContext'

function EducatorHeader() {
  const {role,authorisedUser,setAuthorisedUser} = useContext(routeGuardContext)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const logout = ()=>{
    sessionStorage.clear()
    setAuthorisedUser(false)
    navigate('/')
  }
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
        <button onClick={() => setShowModal(true)} className='hover:text-cyan-600 cursor-pointer'>Edit Profile</button>
      </nav>

      {showModal&&
      <EducatorProfileEdit isOpen={showModal} onClose={() => setShowModal(false)}/>}

      {/* Right */}
      <div className="flex items-center gap-4 text-sm">
        

        <button onClick={logout} className="text-red-500 hover:underline">
          Logout
        </button>
      </div>

    </header>
  )
}

export default EducatorHeader