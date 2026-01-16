import React, { useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import { routeGuardContext } from '../contextAPI/AuthContext'

function Pnf() {
  const {role,authorisedUser,setAuthorisedUser} = useContext(routeGuardContext)
  const navigate = useNavigate()

  const backHome = ()=>{
    if(role == "student"){
      navigate('/')
    }else if(role == "educator"){
      navigate('/educator/dashboard')
    }else{
      navigate('/admin/dashboard')
    }
  }
  return (
    <div className='flex justify-center items-center flex-col my-10'>
      <img width={'350px'} src="https://cdn.dribbble.com/userupload/22526017/file/original-66bed19281474c1d825b5504209a036a.gif" alt="page not found" />
      <p className='md:text-xl'>Sorry..</p>
      <p className='md:text-2xl'>The page you are looking for is not available</p>
      <button onClick={backHome} className='p-3 bg-cyan-600 rounded text-white mt-5'>BACK HOME</button>
    </div>
  )
}

export default Pnf