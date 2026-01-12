import React, { useEffect, useState } from 'react'
import { FaLock, FaTimes, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { updatePasswordInfoAPI, updateStudentInfoAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function EditProfile({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo,setUserInfo] = useState({
    username:"",bio:"",id:""
  })

  const [passwordInfo,setPasswordInfo] = useState({
    newPassword:"",confirmPassword:""
  })

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserInfo({username:user?.username,bio:user?.bio,id:user?._id})
    }
  },[])


  const updateProfileInfo = async ()=>{
    const {username,bio,id} = userInfo
    if(!username || !bio){
      toast.info("Please fill the form completely...")
    }else{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization" : `Bearer ${token}`
        }
        try {
          const result = await updateStudentInfoAPI(id,{username,bio},reqHeader)
          if(result.status == 200){
            sessionStorage.setItem("user", JSON.stringify(result.data))
            toast.success("Student Profile Info Updated Successfully...")
            setTimeout(() => {
              onClose()
            }, 2000);
          }else{
            console.log(result);
            toast.error("Something went wrong!!!")
          }
        } catch (error) {
          console.log(error);
        }

      }
    }
  }

  const updatePassword = async ()=>{
    const {newPassword,confirmPassword} = passwordInfo
    if(!newPassword || !confirmPassword){
      toast.info("Please fill the form completely...")
    }else if(newPassword == confirmPassword){
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization" : `Bearer ${token}`
        }
        const user = JSON.parse(sessionStorage.getItem("user"))
        try {
          const result = await updatePasswordInfoAPI(user?._id,{password:newPassword},reqHeader)
          if(result.status == 200){
            toast.success("Password Updated Successfully..")
            setTimeout(() => {
              sessionStorage.clear()
              navigate('/login')
            }, 2000);
          }else{
            console.log(result);
            toast.error("Something went wrong!!!")
          }
        } catch (error) {
          console.log(error);
        }

      }
      
    }else{
      toast.warning("Operation failed!!! Password Mismatch")
    } 
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium
              ${activeTab === "profile"
                ? "border-b-2 border-cyan-500 text-cyan-600"
                : "text-slate-500"}
            `}
          >
            <FaUser /> Profile Info
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium
              ${activeTab === "password"
                ? "border-b-2 border-cyan-500 text-cyan-600"
                : "text-slate-500"}
            `}
          >
            <FaLock /> Password
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div>
                <input type="text" value={userInfo.username} onChange={e=>setUserInfo({...userInfo,username:e.target.value})} placeholder="Full Name" className="w-full mt-1 px-3 py-2 border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded-lg "/>
              </div>

              <div>
                <textarea value={userInfo.bio} onChange={e=>setUserInfo({...userInfo,bio:e.target.value})} rows="3" placeholder="Tell something about yourself" className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"/>
              </div>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Password</label>
                <input type="password" value={passwordInfo.newPassword} onChange={e=>setPasswordInfo({...passwordInfo,newPassword:e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input value={passwordInfo.confirmPassword} onChange={e=>setPasswordInfo({...passwordInfo,confirmPassword:e.target.value})} type="password" className="w-full mt-1 px-3 py-2 border rounded-lg border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
              </div>
              {passwordInfo.newPassword != passwordInfo.confirmPassword && <div className=" mb-3 w-full px-5 text-xs text-red-700 font-bold">Confirm Password must be match with new Password </div>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>
          <button onClick={activeTab=="profile"?updateProfileInfo:updatePassword} className="px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm hover:bg-cyan-600">
            Save Changes
          </button>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </div>
  )
}

export default EditProfile