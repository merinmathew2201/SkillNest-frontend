import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import EditProfile from './EditProfile'
import { getEnrolledCoursesAPI } from '../services/allAPI'

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userDetails,setUserDetails] = useState({})

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    
    useEffect(()=>{
      if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
        setUserDetails(JSON.parse(sessionStorage.getItem("user")))
      }
      fetchEnrolledCourses()
    },[])

    const fetchEnrolledCourses = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        }
        const res = await getEnrolledCoursesAPI(reqHeader);
        if (res.status == 200) {
          setCourses(res.data);
        } else {
          console.log(res);
        }
      }

    
  }
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

        

        {/* My Courses */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">My Enrolled Courses</h3>

          {/* Course Card */}
          {
            courses?.length>0?
            courses?.map(course=>(
              <div key={course._id} className="bg-white p-5 rounded-lg shadow mb-4">
                <h4 className="font-semibold text-lg">
                  {course?.title}
                </h4>
                <p className="text-sm text-slate-600">
                  Instructor : {course?.educatorMail}
                </p>

            <button className="mt-4 px-4 py-2 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700">
              <Link to={`/courses/${course._id}/learn`}>Continue Learning</Link>
            </button>
          </div>
            ))
            :
            <p className='my-5 font-bold text-cyan-900'>You have not enrolled any course yet...</p>
          }
          

          
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