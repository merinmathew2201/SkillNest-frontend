import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBars, FaPowerOff, FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify'


function Header() {
  const location = useLocation()
  const [searchKey,setSearchKey] = useState("")
  const navigate = useNavigate()

  const [toggle, setToggle] = useState(false)
  const [token,setToken] = useState("")
  const [dp,setDp] = useState("")
  const [dropdown,setDropdown] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user.picture)
    }
  },[token])

  const handleSearch = ()=>{
    if(!searchKey){
      toast.warning("Plase input any course here!!!")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please Login!!!")
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }else if (sessionStorage.getItem("token") && searchKey){
      navigate('/courses')
    }else{
      toast.error("Something went wrong")
    }

  }

  const logout = ()=>{
    sessionStorage.clear()
    setToken("")
    setDp("")
    setDropdown(false)
    navigate('/')
  }

  return (
    <>
      <div className={location.pathname == '/'?"grid grid-cols-3 p-3  bg-sky-50":"grid grid-cols-2 p-3  bg-sky-50"} >
        {/* logo and title*/}
        <div className='md:flex items-center hidden '>
          <img width={'40px'} src="https://icon-library.com/images/courses-icon/courses-icon-27.jpg" alt="logo" />
          <Link to={'/'}><h1 className='text-xl md:text-2xl font-bold ms-2 text-cyan-500'><span className='text-cyan-900'>Skill</span>Nest</h1></Link>
        </div>
        {/* search */}
        {
          location.pathname == '/' &&
          <div className='md:flex text-sm  items-center hidden'>
            <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="bg-white p-3 rounded-3xl w-full text-black placeholder-grey-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" placeholder='What skill do you want to learn today?' /><div className=' bg-cyan-500 h-8 w-8 rounded-4xl' style={{ marginLeft: '-40px' }} ><FaSearch onClick={handleSearch} className='text-white rounded-4xl cursor-pointer' style={{ marginTop: '10px', marginLeft: '8px' }} /></div>
          </div>
        }

        {/* login */}
        <div className='md:flex justify-end pe-5 hidden'>
          <div className=' hidden  md:flex justify-end items-center text-cyan-800 '>
            <p className='text-sm hover:bg-cyan-500 hover:p-2 hover:rounded-2xl hover:text-white'><Link to={'/'}>HOME</Link></p>
            <p className='md:mx-4 text-sm hover:bg-cyan-500 hover:p-2 hover:rounded-2xl hover:text-white'><Link to={'/courses'}>COURSES</Link></p>
            <p className='text-sm hover:bg-cyan-500 hover:p-2 hover:rounded-2xl hover:text-white'><Link to={'/contact'}>CONTACT</Link></p>
          </div>
          {!token?
          <Link to={'/login'} className='bg-cyan-500 text-white rounded-2xl px-2 ms-3 flex items-center hover:bg-cyan-800 hover:text-white'><FaCircleUser className='me-2 text-xl' />Login</Link>
        :
        <div>
            <button onClick={()=>setDropdown(!dropdown)} className="shadow-sm rounded ms-5 p-2 hover:bg-gray-100">
              <img width={'30px'} height={'30px'} style={{borderRadius:'50%'}} src={dp?dp:"https://cdn-icons-png.flaticon.com/512/8847/8847419.png"} alt="profile" />
            </button> 
          {/* dropdown menu */}
          {
            dropdown && 
             <div className="absolute right-1 z-10 mt-2 w-40 shadow rounded bg-white ring-1 ring-cyan-100 p-2 focus:outline-hidden">
              {/* profile link */}
              <Link to={'/learner/profile'} className='flex items-center text-gray-700 text-sm px-3 py-2'><FaAddressCard className='me-2'/>Profile</Link>
              {/* logout btn */}
              <button onClick={logout} className="flex items-center text-gray-700 text-sm px-3 py-2"><FaPowerOff className='me-2'/>Logout</button>
            </div>
           }
          </div>
        }

          
        </div>

      </div>
      {/* responsive screen */}
      <nav className='w-full px-3 pb-3 bg-sky-50  md:hidden'>

        {/* menu icon and login */}
        <div className="flex justify-between items-center text-2xl md:hidden">
          <button className='p-2 bg-cyan-500 rounded text-base' onClick={() => setToggle(!toggle)}><FaBars className='text-white ' /> </button>
          <Link to={'/'}><h1 className='text-xl md:text-2xl font-bold ms-2 text-cyan-500'><span className='text-cyan-900'>Skill</span>Nest</h1></Link>

          {/* search */}
          {
            location.pathname == '/' &&
            <div className='flex items-center text-sm mx-5 '><input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="bg-white p-2 rounded-3xl w-50 text-black placeholder-grey-500" placeholder='search a course..' /><div className=' bg-cyan-500 h-5 w-5 rounded-4xl' style={{ marginLeft: '-30px' }} ><FaSearch onClick={handleSearch} className='text-white rounded-4xl cursor-pointer' style={{ marginTop: '5px', marginLeft: '4px' }} /></div></div>
          }

          {!token?
          <Link to={'/login'} className='bg-cyan-500 text-white rounded px-3 py-1 ms-3 flex items-center  hover:bg-cyan-800 hover:text-white text-base'>< FaCircleUser className='me-1' /> Login</Link>
            :
          <div>
            <button onClick={()=>setDropdown(!dropdown)} className="shadow-sm rounded ms-5 p-2 hover:bg-gray-100">
              <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp?dp:"https://cdn-icons-png.flaticon.com/512/8847/8847419.png"} alt="profile" />
            </button> 
          {/* dropdown menu */}
          {
            dropdown && 
             <div className="absolute right-1 z-10 mt-2 w-40 shadow rounded bg-white ring-1 ring-cyan-100 p-2 focus:outline-hidden">
              {/* profile link */}
              <Link to={'/learner/profile'} className='flex items-center text-gray-700 text-sm px-3 py-2'><FaAddressCard className='me-2'/>Profile</Link>
              {/* logout btn */}
              <button onClick={logout} className="flex items-center text-gray-700 text-sm px-3 py-2"><FaPowerOff className='me-2'/>Logout</button>
            </div>
           }
          </div>}

        </div>

        {toggle &&
          <ul className='flex flex-col text-cyan-800 '>
            <li className='md:mx-4 mt-3 md:mt-0 text-sm md:hidden'><Link to={'/'}>HOME</Link></li>
            <li className='md:mx-4 mt-3 md:mt-0 text-sm md:hidden'><Link to={'/courses'}>COURSES</Link></li>
            <li className='md:mx-4 mt-3 md:mt-0 text-sm md:hidden'><Link to={'/contact'}>CONTACT</Link></li>
          </ul>}
      </nav>
      <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </>

  )
}

export default Header