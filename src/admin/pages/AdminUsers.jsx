import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { approveEducatorAPI, getAllPendingUsersAPI, getAllUsersAPI, removeUserAPI } from '../../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';

function AdminUsers() {
    const [activeTab, setActiveTab] = useState("pending");
    const [allUsers,setAllUsers] = useState([])
    const [pendingUsers,setPendingUsers] = useState([])
    console.log(allUsers);
    

    useEffect(()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        if(activeTab=="all"){
          getAllUsers(token)
        }else{
          getAllPendingUsers(token)
        }
      }
    },[activeTab])

    const getAllUsers = async (token)=>{
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllUsersAPI(reqHeader)
      if(result.status == 200){
        setAllUsers(result.data)
      }else{
        console.log(result);
      }
    }

    const getAllPendingUsers = async (token)=>{
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllPendingUsersAPI(reqHeader)
      if(result.status == 200){
        setPendingUsers(result.data)
      }else{
        console.log(result);
      }
    }

    const updateEducatorStatus = async (id)=>{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await approveEducatorAPI(id,reqHeader)
      if(result.status == 200){
        toast.success("Educator approved successfully!!!!")
        getAllPendingUsers(token)
      }
      }
    }

    const removeUser = async(id)=>{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
        "Authorization" : `Bearer ${token}`
      } 
      const result = await removeUserAPI(id,reqHeader)
      if(result.status==200){
        if(activeTab=="all"){
          getAllUsers(token)
        }else{
          getAllPendingUsers(token)
        }
      }
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-gray-700 mb-6">Manage platform users here.</p>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-4">
        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Requests
        </button>

        <button
          className={`px-3 py-2 sm:px-4 rounded-t-lg text-sm sm:text-base
            ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("all")}
        >
          All Users
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-b-lg p-3 sm:p-4">
        <div className="overflow-x-auto">

          {/* Pending Users */}
          {activeTab === "pending" && (
            <table className="min-w-105 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">#</th>
                  <th className="text-left p-2 sm:p-3">Name</th>
                  <th className="text-left p-2 sm:p-3">Email</th>
                  <th className="text-left p-2 sm:p-3">Role</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  pendingUsers?.length>0?
                  pendingUsers?.map((pendingUser,index)=>(
                    <tr key={pendingUser?._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">{index+1}</td>
                      <td className="p-2 sm:p-3">{pendingUser?.username}</td>
                      <td className="p-2 sm:p-3">{pendingUser?.email}</td>
                      <td className="p-2 sm:p-3">{pendingUser?.role}</td>
                      <td className="p-2 sm:p-3 flex gap-2">
                        <button onClick={()=>updateEducatorStatus(pendingUser?._id)} className="bg-green-500 px-2 py-1 sm:px-3 sm:py-2 text-white rounded text-xs sm:text-sm">
                          Approve
                        </button>
                        <button onClick={()=>removeUser(pendingUser?._id)} className="text-red-500">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                
                  ))
                  :
                  <p className='px-8 font-bold my-3'>No pending Requests...</p>
                }

                
              </tbody>
            </table>
          )}

          {/* All Users */}
          {activeTab === "all" && (
            <table className="min-w-175 w-full text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 sm:p-3">#</th>
                  <th className="text-left p-2 sm:p-3">Name</th>
                  <th className="text-left p-2 sm:p-3">Email</th>
                  <th className="text-left p-2 sm:p-3">Role</th>
                  <th className="text-left p-2 sm:p-3">Status</th>
                  <th className="text-left p-2 sm:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.length>0?
                  allUsers?.map((user,index)=>(
                    <tr key={user?._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">{index+1}</td>
                      <td className="p-2 sm:p-3">{user?.username}</td>
                      <td className="p-2 sm:p-3">{user?.email}</td>
                      <td className="p-2 sm:p-3">{user?.role}</td>
                      <td className="p-2 sm:p-3">{user?.approvalStatus?"Approved":"Pending"}</td>
                      <td className="p-2 sm:p-3">
                        <button onClick={()=>removeUser(user?._id)} className="text-red-500">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                :
                <p className='px-8 font-bold'>Loading.....</p>
                }
              </tbody>
            </table>
          )}

        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </div>
    
  )
}

export default AdminUsers