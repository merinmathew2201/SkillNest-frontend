import React, { useEffect, useState } from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { FaCloudUploadAlt, FaFilePdf, FaPlus, FaTrash } from 'react-icons/fa'
import {  useNavigate, useParams } from 'react-router-dom'
import { createLectureAPI, createResourceAPI, createSectionAPI, deleteLectureAPI, getAllResourcesAPI, getAllSectionsAPI, getCourseStudentsAPI, getLecturesAPI, getSingleCourseAPI, publishCourseAPI, removeResourceAPI, removeSectionAPI } from '../../services/allAPI'
import { toast, ToastContainer } from 'react-toastify'

function EducatorManageCourse() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("curriculum")
    const [showSectionModal, setShowSectionModal] = useState(false)
    const [showLectureModal, setShowLectureModal] = useState(false)
    const [showResourceModal, setShowResourceModal] = useState(false)
    const {courseId} = useParams()

    const [sections, setSections] = useState([])
    const [sectionTitle, setSectionTitle] = useState("")
    const [course,setCourse] = useState({})

    const [lectureData, setLectureData] = useState({
        title: "",
        videoURL: null,
        isPreview: false
    })
    const [lectures,setLectures] = useState([])
    const [selectedSectionId, setSelectedSectionId] = useState("")
    const [currentSectionId, setCurrentSectionId] = useState("")


    const [resources, setResources] = useState([])
    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceFile, setResourceFile] = useState(null);

    const [students, setStudents] = useState([])
    
    
    useEffect(()=>{
        if(courseId){
            fetchSingleCourse()
            fetchAllSections()
            fetchAllResources()
            fetchStudents()
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

    const fetchAllLectures = async(sectionId) =>{
        setSelectedSectionId(sectionId)
        const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Authorization" : `Bearer ${token}`
                }
                const result = await getLecturesAPI(sectionId, reqHeader)
                if (result.status === 200){
                    setLectures(result.data)
                }else{
                    console.log(result);
                } 
            } 
    }

    const handleAddLecture = async () => {
        if (!lectureData.title || !lectureData.videoURL) {
            toast.info("Please fill all fields")
        }else{
            const token = sessionStorage.getItem("token")
            if (token){
                const reqHeader = {
                    Authorization: `Bearer ${token}`
                }
                const reqBody = new FormData()
                reqBody.append("title", lectureData.title)
                reqBody.append("videoURL", lectureData.videoURL)
                reqBody.append("isPreview", lectureData.isPreview)
                reqBody.append("sectionId", currentSectionId)
                reqBody.append("courseId", courseId)

                const result = await createLectureAPI(reqBody, reqHeader)
                if (result.status == 201) {
                    toast.success("Lecture added Successfully!!! ")
                    

                    setLectureData({
                        title: "",
                        videoURL: null,
                        isPreview: false
                    })
                    setShowLectureModal(false)

                    fetchAllLectures(currentSectionId)
                } else {
                    toast.error("Failed to add lecture")
                }
            }
        } 
    }

    const handleDeleteLecture = async (lectureId) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }
            const result = await deleteLectureAPI(lectureId, reqHeader)
            if (result.status === 200) {
                toast.success("Lecture deleted")
                fetchAllLectures() 
            } else {
                toast.error("Failed to delete lecture")
                console.log(result);
            }
            }
        }

    const fetchAllResources = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization" : `Bearer ${token}`
            }
            const result = await getAllResourcesAPI(courseId, reqHeader)
            if (result.status === 200){
                setResources(result.data)
            }else{
                console.log(result);
            } 
        }
    }

    const handleAddResource = async () => {
        if (!resourceTitle || !resourceFile){
            toast.info("Please fill title and select file");
        }else{
            const token = sessionStorage.getItem("token");            
            if(token){
                const reqHeader = {
                    "Authorization" : `Bearer ${token}`
                } 
                const reqBody = new FormData()
                reqBody.append("courseId", courseId)
                reqBody.append("title", resourceTitle)
                reqBody.append("fileURL", resourceFile)
                const result = await createResourceAPI(reqBody, reqHeader)
                if (result.status === 201) {
                    toast.success("Resource added");
                    setResourceTitle("");
                    setResourceFile(null);
                    setShowResourceModal(false);
                    fetchAllResources();
                } else {
                    toast.error("Failed to add resource");
                    console.log(result);
                    
                }
            }

            
        }
        
    };

    const removeResource = async(resourceId)=>{
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };

            const result = await removeResourceAPI(resourceId, reqHeader);
            if (result.status === 200) {
                toast.success("Resource deleted");
                fetchAllResources();
            } else {
                toast.error("Failed to delete resource");
                console.log(result);
                
            }
    }
    }

    const fetchStudents = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
        const reqHeader = {
        "Authorization": `Bearer ${token}`
        }

        const result = await getCourseStudentsAPI(courseId, reqHeader)
        if (result.status === 200) {
        setStudents(result.data)
        } else {
        console.log(result)
        }
    }
    }

    const handlePublishCourse = async () => {

        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            }

            const result = await publishCourseAPI(courseId, reqHeader)

            if (result.status === 200) {
                toast.success("Course published successfully")
                setTimeout(() => {
                        navigate('/educator/dashboard')
                }, 2000);
                
            } else {
                toast.error("Failed to publish course")
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
            <button onClick={handlePublishCourse} disabled={!course?.courseApproved || course?.isPublished} className={`px-4 py-2 rounded-lg text-white ${course?.isPublished
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}>
                {course?.isPublished ? "Published" : "Publish Course"}
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
                                <h3 onClick={() => fetchAllLectures(section._id)} className="font-semibold cursor-pointer mb-3">{section?.title}</h3>
                                <button onClick={()=>handleRemoveSection(section?._id)}><FaTrash className="text-red-500 cursor-pointer" /></button>
                            </div>

                            {/* Lecture */}
                            {selectedSectionId == section._id && (
                                <>
                                    {lectures?.length > 0 ? (
                                    lectures?.map(lecture => (
                                        <div key={lecture?._id} className="flex justify-between items-center bg-slate-50 p-2 rounded mb-2" >
                                        <span>* {lecture?.title} {lecture?.isPreview && (
                                            <span className="ml-2 text-xs text-green-600">
                                                (Preview)
                                            </span>
                                            )}
                                        </span>

                                        <button onClick={()=>handleDeleteLecture(lecture?._id)}><FaTrash className="text-red-500 cursor-pointer" /></button>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-sm text-slate-400">
                                        No lectures yet
                                    </p>
                                    )}
                                </>
)}


                            <button onClick={() => {
                                setCurrentSectionId(section._id)
                                setShowLectureModal(true)
                            }
                                } className="my-4 flex items-center gap-2 text-sm cursor-pointer hover:bg-cyan-800 text-white rounded p-2 bg-cyan-500">
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

            <input value={lectureData.title} onChange={e=>setLectureData({...lectureData,title:e.target.value})} type="text" placeholder="Lecture Title" className="w-full border border-cyan-400 rounded px-3 py-2 mb-5"/>

            <label htmlFor="videoLecture" className="border border-dashed border-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer mb-5 hover:bg-sky-50 transition">
                <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                <p className="text-sm text-slate-600">
                Click to upload video
                </p>
            </label>
            <input id='videoLecture' type="file" onChange={(e) =>setLectureData({ ...lectureData, videoURL: e.target.files[0] })} className="w-full border border-cyan-400 rounded px-3 py-2 " hidden/>

            {lectureData.videoURL && (
                <div className="bg-slate-100 p-3 rounded mb-4 flex justify-between items-center">
                    <p className="text-sm text-slate-700">
                    🎥 {lectureData.videoURL.name}
                    </p>

                    <button
                    className="text-red-500 text-sm font-semibold"
                    onClick={() =>
                        setLectureData({
                        ...lectureData,
                        videoURL: null
                        })
                    }
                    >
                    Remove
                    </button>
                </div>
            )}

            {/* Preview Checkbox */}
            <div className="flex items-center gap-2 mb-5">
                <input type="checkbox" id="preview" checked={lectureData.isPreview} onChange={(e) =>setLectureData({ ...lectureData, isPreview: e.target.checked })} />
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
                <button onClick={handleAddLecture} className="px-4 py-2 bg-cyan-500 cursor-pointer text-white rounded hover:bg-cyan-600">
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

            {resources?.length>0?
            resources?.map(resource=>(
                <div key={resource?._id} className="flex justify-between items-center border border-cyan-500 rounded p-3 mb-3">
                    <span className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    {resource?.title}
                    </span>
                    <button onClick={()=>removeResource(resource?._id)}><FaTrash className="text-red-500 cursor-pointer" /></button>
                </div>
            ))
            :
            <p className='px-10 font-bold text-cyan-950 my-5'>You have not added any resources yet....</p>
            }

            <button onClick={() => setShowResourceModal(true)} className="bg-cyan-500 text-white px-4 py-2 rounded-lg">
            + Add Resource
            </button>
            </div>
        )}

        {/* add resources modal */}
        {showResourceModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Resource</h3>

            <input type="text" placeholder="Resource Title" value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} className="w-full border border-cyan-400 rounded px-3 py-2 mb-3"/>

            <label htmlFor="notes" className="border border-dashed border-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer mb-5 hover:bg-sky-50 transition">
                <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                <p className="text-sm text-slate-600">
                Click to upload notes
                </p>
            </label>
            <input id='notes' accept=".pdf" type="file"  onChange={(e) => setResourceFile(e.target.files[0])} className="w-full border border-cyan-400 rounded px-3 py-2 " hidden/>

            {resourceFile && (
                <div className="bg-slate-100 p-3 rounded mb-4 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{resourceFile.name}.{resourceFile.type}</p>
                    </div>
                    <button className="text-red-500 font-bold" onClick={() => setResourceFile(null)} > Remove </button>
                </div>
                )}

            <div className="flex justify-end gap-3">
                <button
                onClick={() => setShowResourceModal(false)}
                className="px-4 py-2 border rounded cursor-pointer hover:border hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800"
                >
                Cancel
                </button>
                <button onClick={handleAddResource} className="px-4 py-2 cursor-pointer bg-cyan-500 text-white rounded hover:bg-cyan-800">
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
            {
                students?.length>0?
                students?.map(student=>(
                    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            {/* profile pic */}
                            <div>
                                <h3 className="font-semibold text-slate-800">{student?.studentId?.username}</h3>
                                <p className="text-sm text-slate-500">{student?.studentId?.email}</p>
                            </div>
                        </div>
                    </div>
                ))
                :
                <p className='font-bold px-10 my-5 text-cyan-950 ' >No students have enrolled this course yet...</p>
            }
        </div>
        )}


        </div>
        <ToastContainer position='top-center' autoClose={3000} theme='colored'/>
    </>
  )
}

export default EducatorManageCourse