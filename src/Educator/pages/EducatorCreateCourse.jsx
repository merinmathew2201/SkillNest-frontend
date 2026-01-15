import React, { useState } from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { createCourseAPI } from '../../services/allAPI';

function EducatorCreateCourse() {
    const [courseData,setCourseData] = useState({
        title: "",shortDescription: "",overview: "",learnings: "",category: "",level: "",duration: "",thumbnail:"",price: ""
    })
    const [preview,setPreview] = useState("")

    const handleThumbnail = (e)=>{
        const file = e.target.files[0]
        setCourseData({...courseData,thumbnail:file})
        setPreview(URL.createObjectURL(file))
    }

    const handleResetForm = ()=>{
        setCourseData({title: "",shortDescription: "",overview: "",learnings: "",category: "",level: "",duration: "",thumbnail:"",price: ""})
        setPreview("")
    }

    const handleCreateCourse = async()=>{
        const {title,shortDescription,overview,learnings,category,level,duration,thumbnail,price} = courseData
        if(!title || !shortDescription || !overview || !learnings || !category  || !level || !duration|| !thumbnail || !price){
            toast.info("Please fill the form Completely...")
        }else{
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader = {
                    "Authorization" : `Bearer ${token}`
                }
                const reqBody = new FormData()
                for(let key in courseData){
                    reqBody.append(key,courseData[key])
                }
                const result = await createCourseAPI(reqBody,reqHeader)
                if(result.status == 201){
                    toast.success("Course Created successfully....")
                    
                }else if(result.status == 409){
                    toast.warning(result.response.data)
                }else{
                    toast.error("Something went wrong")
                    console.log(result);
                }
                handleResetForm()
            }
        }
    }

  return (
    <>
        <EducatorHeader />
    
        <div className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

                {/* Page Title */}
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                Create New Course
                </h1>
                <p className="text-slate-600 mb-6">
                Fill in the details below to submit your course for admin approval.
                </p>

                {/* Form */}
                <div className="space-y-5">

                {/* Course Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Course Title</label>
                    <input value={courseData.title} onChange={e=>setCourseData({...courseData,title:e.target.value})} type="text" placeholder="Enter the Course Tiltle...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea value={courseData.shortDescription} onChange={e=>setCourseData({...courseData,shortDescription:e.target.value})} rows="2" placeholder="Brief description of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded px-3 py-2 "/>
                </div>

                {/* Full Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Course Overview</label>
                    <textarea value={courseData.overview} onChange={e=>setCourseData({...courseData,overview:e.target.value})} rows="4" placeholder="Detailed course overview...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded px-3 py-2 "/>
                </div>

                {/* What you will learn */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        What you will learn
                    </label>

                    <textarea rows="5" value={courseData.learnings} onChange={e=>setCourseData({...courseData,learnings:e.target.value})} placeholder="Explain what students will gain from this course..." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded-lg px-4 py-3 "/>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input value={courseData.category} onChange={e=>setCourseData({...courseData,category:e.target.value})} type="text" placeholder="Category of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Level */}
                <div>
                    <label className="block text-sm font-medium mb-1">Level</label>
                    <select value={courseData.level} onChange={e=>setCourseData({...courseData,level:e.target.value})} className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-3 py-2 ">
                        <option value="" disabled>Select course level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <input value={courseData.duration} onChange={e=>setCourseData({...courseData,duration:e.target.value})} type="text" placeholder="Duration of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Thumbnail */}
                
                <div>
                    <label className="block text-sm font-medium mb-3">Course Thumbnail</label>
                    {preview!=""?(
                    <img src={preview} width={'300px'} alt="Thumbnail Preview" className="mt-4   object-cover rounded-lg "/>
                    ):
                    <>
                        <label htmlFor="thumbnail" className="border border-dashed border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition">
                            <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                            <p className="text-sm text-slate-600">
                            Click to upload course image
                            </p>
                        </label>
                        <input id='thumbnail' type="file" onChange={e=>handleThumbnail(e)} hidden/>
                    </>}
                </div>
                
                

                {/* Course Price */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Course Price ($)
                    </label>

                    <input value={courseData.price} onChange={e=>setCourseData({...courseData,price:e.target.value})} type="number" placeholder="Enter course price" className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded-lg px-4 py-2 "/>
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button onClick={handleCreateCourse} className="w-full bg-cyan-500 text-white py-2 rounded-lg font-medium hover:bg-cyan-600 transition">
                    Submit for Approval
                    </button>
                    {/* redirect to my courses page */}
                    <p className="text-xs text-slate-500 mt-2 text-center">
                    Once approved by admin, you can add lectures and resources.
                    </p>
                </div>

                </div>
            </div>
        </div>
        <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </>
  )
}

export default EducatorCreateCourse