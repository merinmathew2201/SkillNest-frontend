import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { routeGuardContext } from '../../contextAPI/AuthContext'

function AdminHeader() {
  const navigate = useNavigate()
  const {role,authorisedUser,setAuthorisedUser} = useContext(routeGuardContext)

  const logout = ()=>{
    sessionStorage.clear()
    setAuthorisedUser(false)
    navigate('/')
  }

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  )
}

export default AdminHeader