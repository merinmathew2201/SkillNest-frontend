import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { approveCourseAPI, getAllCoursesAPI, getAllPendingCoursesAPI, removeCourseAPI } from '../../services/allAPI';
import serverURL from '../../services/serverURL';
import { toast, ToastContainer } from 'react-toastify';

function AdminCourses() {
    const [activeTab, setActiveTab] = useState("pending");
    const [allCourses,setAllCourses] = useState([])
    const [pendingCourses,setPendingCourses] = useState([])
    console.log(pendingCourses);
    

    useEffect(()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        if(activeTab=="all"){
          getAllCourses(token)
        }else{
          getAllPendingCourses(token)
        }
      }
    },[activeTab])

    const getAllCourses = async (token)=>{
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllCoursesAPI(reqHeader)
      if(result.status == 200){
        setAllCourses(result.data)
      }else{
        console.log(result);
      }
    }

    const getAllPendingCourses = async (token)=>{
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllPendingCoursesAPI(reqHeader)
      if(result.status == 200){
        setPendingCourses(result.data)
      }else{
        console.log(result);
      }
    }

    const updateCourseStatus = async (id)=>{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await approveCourseAPI(id,reqHeader)
      if(result.status == 200){
        toast.success("Course approved successfully!!!!")
        getAllPendingCourses(token)
      }
      }
    }

    const removeCourse = async(id)=>{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
        "Authorization" : `Bearer ${token}`
      } 
      const result = await removeCourseAPI(id,reqHeader)
      if(result.status==200){
        if(activeTab=="all"){
          getAllCourses(token)
        }else{
          getAllPendingCourses(token)
        }
      }
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Courses</h1>
      <p className="text-gray-700 mb-6">Manage all courses on the platform.</p>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-4">
        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Courses
        </button>

        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("all")}
        >
          All Courses
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-b-lg p-3 sm:p-4">

        <div className="overflow-x-auto">

          {activeTab === "pending" && (
            <table className="min-w-105 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">#</th>
                  <th className="text-left p-2 sm:p-3">Title</th>
                  <th className="text-left p-2 sm:p-3">Category</th>
                  <th className="text-left p-2 sm:p-3">Price</th>
                  <th className="text-left p-2 sm:p-3">Educator Email</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingCourses?.length>0?
                pendingCourses?.map((course,index)=>(
                  <tr key={course?._id} className="border-b hover:bg-gray-50">
                    <td className="p-2 sm:p-3">{index+1}</td>
                    <td className="p-1 sm:p-3 flex items-center"><img width={'40px'} className='me-2 rounded' src={`${serverURL}/uploads/images/${course?.thumbnail}`} alt="course image" />{course?.title}</td>
                    <td className="p-2 sm:p-3">{course?.category}</td>
                    <td className="p-2 sm:p-3">$ {course?.price}</td>
                    <td className="p-2 sm:p-3">{course?.educatorMail}</td>
                    <td className="pb-1 flex gap-2">
                      <button onClick={()=>updateCourseStatus(course?._id)} className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm hover:bg-green-700">
                        Approve
                      </button>
                      <button onClick={()=>removeCourse(course?._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
                :
                <p className='px-8 font-bold my-3'>No pending course requests....</p>
                }
                
              </tbody>
            </table>
          )}

          {activeTab === "all" && (
            <table className="min-w-175 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">ID</th>
                  <th className="text-left p-2 sm:p-3">Title</th>
                  <th className="text-left p-2 sm:p-3">Educator Email</th>
                  <th className="text-left p-2 sm:p-3">Status</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCourses?.length>0?
                  allCourses?.map((course)=>(
                    <tr key={course?._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">{course?._id}</td>
                      <td className="p-1 sm:p-3 flex items-center"><img width={'40px'} className='me-2 rounded' src={`${serverURL}/uploads/images/${course?.thumbnail}`} alt="course image" />{course?.title}</td>
                      <td className="p-2 sm:p-3">{course?.educatorMail}</td>
                      <td className="p-2 sm:p-3">
                        {course?.courseApproved?<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs sm:text-sm">
                          Approved
                        </span>:<span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs sm:text-sm">
                          Pending
                        </span>}
                        
                      </td>
                      <td className="pb-1 sm:p-3">
                        <button onClick={()=>removeCourse(course?._id)}  className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                :
                <p className='px-8 font-bold my-3'>Loading....</p>}
                

                
              </tbody>
            </table>
          )}

        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </div>
  )
}

export default AdminCourses