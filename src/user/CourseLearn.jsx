import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaCheckCircle, FaFilePdf, FaPlayCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getAllResourcesAPI, getAllSectionsAPI, getLecturesAPI, getSingleCourseAPI } from '../services/allAPI';
import serverURL from '../services/serverURL';

function CourseLearn() {
    const {courseId} = useParams()
    const [currentLesson, setCurrentLesson] = useState({})
    const [course, setCourse] = useState({});
    const [sections, setSections] = useState([]);
    const [selectedSectionId, setSelectedSectionId] = useState("")
    const [lectures, setLectures] = useState([]); 
    const [resources, setResources] = useState([])

    useEffect(()=>{
      if(courseId){
        fetchSingleCourse()
        fetchAllSections()
        fetchAllResources()
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
    

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-100">

      <div className="grid grid-cols-12 gap-6 p-8">

        {/* Video Section */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-black rounded-lg overflow-hidden">
            {currentLesson?.videoURL ? (
            <video
              src={`${serverURL}/uploads/videos/${currentLesson?.videoURL}`}
              controls
              className="w-full h-105"
            />
          ) : (
            <div className="h-105 flex items-center justify-center text-white">
              Select a lecture to start learning
            </div>
          )}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{currentLesson?.title}</h2>
          <p className="text-sm text-slate-500">
            {course?.title} 
          </p>

          

          {/* Resources */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Resources</h3>

            {resources?.length > 0 ? (
              resources?.map((res) => (
                <div
                  key={res?._id}
                  className="flex justify-between items-center rounded shadow bg-white p-3 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    {res?.title}
                  </span>

                  <a
                    href={`${serverURL}/uploads/notes/${res?.fileURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 text-sm"
                  >
                    Download
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No resources available</p>
            )}
          </div>

        </div>

        <aside className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow p-5 max-h-175 overflow-y-auto">
  <h3 className="font-semibold mb-4">Course Content</h3>

  {sections.map((section) => (
    <div key={section._id} className="mb-4">
      <h4
        className="text-sm font-semibold text-slate-700 bg-cyan-100 p-2 rounded mb-2 cursor-pointer"
        onClick={() => fetchAllLectures(section._id)}
      >
        {section.title}
      </h4>

      {selectedSectionId === section._id &&
        lectures.map((lecture) => (
          <button
            key={lecture._id}
            onClick={() => setCurrentLesson(lecture)}
            className="w-full flex justify-between items-center p-2 rounded text-sm hover:bg-slate-100 mb-2"
          >
            <span className="flex items-center gap-2">
              <FaPlayCircle className="text-cyan-500" />
              {lecture.title}
            </span>
          </button>
        ))}
    </div>
  ))}
</aside>

      </div>
    </div>
    <Footer/>
    </>
   
  )
}

export default CourseLearn