import React, { useEffect, useState } from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { FaCloudUploadAlt, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { createSectionAPI, getAllSectionsAPI, getSingleCourseAPI, removeSectionAPI } from '../../services/allAPI'
import { toast, ToastContainer } from 'react-toastify'

function EducatorManageCourse() {
    const [activeTab, setActiveTab] = useState("curriculum")
    const [showSectionModal, setShowSectionModal] = useState(false)
    const [showLectureModal, setShowLectureModal] = useState(false)
    const [showResourceModal, setShowResourceModal] = useState(false)
    const {courseId} = useParams()
    const [sections, setSections] = useState([])
    const [sectionTitle, setSectionTitle] = useState("")
    const [course,setCourse] = useState({})
    console.log(course);
    

    
    useEffect(()=>{
        if(courseId){
            fetchAllSections()
            fetchSingleCourse()
        }
        
    },[courseId])

    const fetchAllSections = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization" : `Bearer ${token}`
            }
            const result = await getAllSectionsAPI(courseId,reqHeader)
            if (result.status === 200) {
                setSections(result.data)
            }else{
                console.log(result);
            }
        }
    }

    const fetchSingleCourse = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization" : `Bearer ${token}`
            }
            const result = await getSingleCourseAPI(courseId,reqHeader)
            if (result.status === 200) {
                setCourse(result.data)
            }else{
                console.log(result);
            }
        }
    }

    const addSection = async()=>{
        if(!sectionTitle){
            toast.info("Please Fill The Title...")
        }else{
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = {
                    courseId,title:sectionTitle
                }
                const result = await createSectionAPI(reqBody,reqHeader)
                if(result.status==201){
                    toast.success("Section added")
                    setSectionTitle("")
                    setShowSectionModal(false)
                    fetchAllSections()
                }else {
                    toast.error("Failed to add section")
                }
            }
        }
    }

    const handleRemoveSection = async(sectionId)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization" : `Bearer ${token}`
            }
            const result = await removeSectionAPI(sectionId,reqHeader)
            if (result.status === 200) {
                toast.success("Section Deleted")
                fetchAllSections()
            }else{
                console.log(result);
            }
        }
    }
  return (
    <>
        <EducatorHeader />

        <div className="min-h-screen bg-slate-100 px-6 py-8">

        {/* Course Header */}
        {course && 
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-2xl font-bold">{course?.title}</h1>
                <p className="text-slate-600 mt-1">
                {course?.category} · {course?.level}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                {course?.courseApproved && "Approved"}
                </span>
            </div>
        }
        <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Publish Course
            </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
            <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-4 py-2 rounded ${
                activeTab === "curriculum"
                ? "bg-cyan-500 text-white"
                : "bg-white"
            }`}
            >
            Curriculum
            </button>

            <button
            onClick={() => setActiveTab("resources")}
            className={`px-4 py-2 rounded ${
                activeTab === "resources"
                ? "bg-cyan-500 text-white"
                : "bg-white"
            }`}
            >
            Resources
            </button>

            <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded ${
                activeTab === "students"
                ? "bg-cyan-500 text-white"
                : "bg-white"
            }`}
            >
            Students
            </button>
        </div>

        {/* TAB CONTENT */}

        {/* Curriculum */}
        {activeTab === "curriculum" && (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Curriculum</h2>

                {/* Section */}
                { sections && 
                    sections?.map(section=>(
                        <div key={section?._id} className="border rounded p-4 mb-4">
                            <div className="flex justify-between items-center bg-slate-200 p-2 rounded">
                                <h3 className="font-semibold mb-3">{section?.title}</h3>
                                <button onClick={()=>handleRemoveSection(section?._id)}><FaTrash className="text-red-500 cursor-pointer" /></button>
                            </div>

                            {/* Lecture */}
                            <div className="flex justify-between items-center bg-slate-50 p-2 rounded mb-2">
                                <span>Welcome to the Course</span>
                                <button ><FaTrash className="text-red-500 cursor-pointer" /></button>
                            </div>

                            <button onClick={() => setShowLectureModal(true)} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-cyan-800 text-white rounded p-2 bg-cyan-500">
                            <FaPlus /> Add Lecture
                            </button>
                        </div>
                    ))
                }

                <button onClick={() => setShowSectionModal(true)} className="flex items-center gap-2 text-sm hover:bg-cyan-800 text-white rounded p-2 bg-cyan-500 cursor-pointer">
                    <FaPlus /> Add Section
                </button>
            </div>
        )}
        {/* add lecture modal */}
        {showLectureModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Lecture</h3>

            <input
                type="text"
                placeholder="Lecture Title"
                className="w-full border border-cyan-400 rounded px-3 py-2 mb-5"
            />

            <label htmlFor="videoLecture" className="border border-dashed border-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer mb-5 hover:bg-sky-50 transition">
                <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                <p className="text-sm text-slate-600">
                Click to upload video
                </p>
            </label>
            <input id='videoLecture' type="file" className="w-full border border-cyan-400 rounded px-3 py-2 " hidden/>

            {/* Preview Checkbox */}
            <div className="flex items-center gap-2 mb-5">
                <input type="checkbox" id="preview" />
                <label htmlFor="preview" className="text-sm text-slate-700">
                Make this lecture as preview (Free)
                </label>
            </div>

            <div className="flex justify-end gap-3">
                <button
                onClick={() => setShowLectureModal(false)}
                className="px-4 py-2 border rounded cursor-pointer hover:border hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800 "
                >
                Cancel
                </button>
                <button className="px-4 py-2 bg-cyan-500 cursor-pointer text-white rounded hover:bg-cyan-600">
                Add
                </button>
            </div>
            </div>
        </div>
)}

        {/*add section modal */}
        {showSectionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">Add Section</h3>

                <input value={sectionTitle} onChange={e=>setSectionTitle(e.target.value)} type="text" placeholder="Section Title" className="w-full border border-cyan-400 rounded px-3 py-2 mb-4"/>

                <div className="flex justify-end gap-3">
                    <button onClick={() => setShowSectionModal(false)} className="px-4 py-2 border rounded cursor-pointer hover:border hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800 ">
                    Cancel
                    </button>
                    <button onClick={addSection} className="px-4 py-2 bg-cyan-500 cursor-pointer text-white rounded hover:bg-cyan-600">
                    Add
                    </button>
                </div>
            </div>
        </div>
        )}


        {/* Resources */}
        {activeTab === "resources" && (
            <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Resources (PDF)</h2>

            <div className="flex justify-between items-center border border-cyan-500 rounded p-3 mb-3">
                <span className="flex items-center gap-2">
                <FaFilePdf className="text-red-500" />
                React Basics Notes
                </span>
                <FaTrash className="text-red-500 cursor-pointer" />
            </div>

            <button
            onClick={() => setShowResourceModal(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
            >
            + Add Resource
            </button>
            </div>
        )}

        {/* add resources modal */}
        {showResourceModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Resource</h3>

            <input
                type="text"
                placeholder="Resource Title"
                className="w-full border border-cyan-400 rounded px-3 py-2 mb-3"
            />

            <label htmlFor="notes" className="border border-dashed border-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer mb-5 hover:bg-sky-50 transition">
                <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                <p className="text-sm text-slate-600">
                Click to upload notes
                </p>
            </label>
            <input id='notes' accept=".pdf" type="file" className="w-full border border-cyan-400 rounded px-3 py-2 " hidden/>

            <div className="flex justify-end gap-3">
                <button
                onClick={() => setShowResourceModal(false)}
                className="px-4 py-2 border rounded cursor-pointer hover:border hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800"
                >
                Cancel
                </button>
                <button className="px-4 py-2 cursor-pointer bg-cyan-500 text-white rounded hover:bg-cyan-800">
                Add
                </button>
            </div>
            </div>
        </div>
        )}


        {/* Students */}
        {activeTab === "students" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Student Card */}
            <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
                {/* profile pic */}
                <div>
                <h3 className="font-semibold text-slate-800">John Doe</h3>
                <p className="text-sm text-slate-500">john@example.com</p>
                </div>
            </div>
            </div>

            {/* Student Card */}
            <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
                {/* profile pic */}
                <div>
                <h3 className="font-semibold text-slate-800">Jane Smith</h3>
                <p className="text-sm text-slate-500">jane@example.com</p>
                </div>
            </div>
            </div>

        </div>
        )}


        </div>
        <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </>
  )
}

export default EducatorManageCourse