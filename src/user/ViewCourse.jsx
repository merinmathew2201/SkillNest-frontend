import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import {  coursePaymentAPI, getEnrolledCoursesAPI, getPreviewLecturesAPI, getSinglePublishedCourseAPI } from '../services/allAPI'
import serverURL from '../services/serverURL'
import { loadStripe } from '@stripe/stripe-js'

function ViewCourse() {
  const { courseId } = useParams()
  const [course, setCourse] = useState({})
  const [previewLectures, setPreviewLectures] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  
  

  useEffect(()=>{
    
    if(courseId){
      fetchCourse()
      fetchPreviewLectures()
      checkEnrollment()
    }
  },[courseId])

  const fetchCourse = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    if(token){
      const result = await getSinglePublishedCourseAPI(courseId,reqHeader)
      if (result.status === 200) {
        setCourse(result.data)
      }else{
      console.log(result);
      }
    }
  
  }

  const fetchPreviewLectures = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    if(token){
      const result = await getPreviewLecturesAPI(courseId,reqHeader)
      if (result.status === 200) {
        setPreviewLectures(result.data)
      }else{
      console.log(result);
      }
    }
    
  }

  const makePayment = async ()=>{
    const stripe = await loadStripe('pk_test_51Sjz07Abob52Fu02qWgA9zlE79RM8cCDAARYXYl5QYUPGRJfz4KZrdwopbxtuxjr5Fsf6ftHwUdkPHTyBpxU9mPq00txnuPQeM');
    console.log(stripe);
    // api call
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await coursePaymentAPI(courseId,reqHeader)
      console.log(result.data);
      const {checkOutURL} = result.data
      window.location.href = checkOutURL
    
    } 
  }

  const checkEnrollment = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getEnrolledCoursesAPI(reqHeader); // Call your controller
    if (result.status === 200) {
      // result.data is an array of enrolled courses
      const enrolledCourse = result.data
      const enrolledCourseIds = enrolledCourse.map(course => course._id);
      setIsEnrolled(enrolledCourseIds.includes(courseId));
      
    }else{
      console.log(result);
      
    }
  }
}
  
  return (
    <>
    <Header/>
    <div className="bg-sky-50 py-14 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          {course?.title}
        </h1>

        <p className="mt-4 text-slate-600 max-w-3xl">
          {course?.shortDescription}
        </p>

        <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-600">
          <span className="bg-white px-3 py-1 rounded-full shadow">
            {course?.level}
          </span>
          <span className="bg-white px-3 py-1 rounded-full shadow">
            {course?.duration}
          </span>
          <span className="bg-white px-3 py-1 rounded-full shadow">
            {course?.category}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20 my-16">
        
        {/* Left Content */}
        <div className="md:col-span-2">
          
          {/* Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Course Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {course?.overview}
            </p>
          </section>

          {/* What You'll Learn */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              What You'll Learn
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {course?.learnings}
            </p>
          </section>

          {/* Free Preview Video */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Free Preview
            </h2>

            {previewLectures.length > 0 ? (
              <div className="rounded-xl overflow-hidden shadow">
                <video controls className="w-full">
                  <source
                    src={`${serverURL}/uploads/videos/${previewLectures[0].videoURL}`}
                    type="video/mp4"
                  />
                </video>
                <p className="text-sm text-slate-600 mt-2 px-2">
                  {previewLectures[0].title}
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No preview available for this course
              </p>
            )}

            <p className="text-sm text-slate-500 mt-2">
              Preview lesson available for everyone
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="sticky top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            
            <img src={`${serverURL}/uploads/images/${course?.thumbnail}`} alt="course" className="rounded-xl mb-4" />

            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Level:</strong> {course?.level}</p>
              <p><strong>Duration:</strong> {course?.duration}</p>
              <p><strong>Category:</strong> {course?.category}</p>
            </div>
            {/* Price */}
            <div className="mt-4 border-t border-gray-400 pt-4">
              <p className="text-sm text-slate-500">Course Price</p>
              <p className="text-2xl font-bold text-slate-800">$ {course?.price}</p>
            </div>
            
            
              {isEnrolled ? (
                <button disabled className="bg-green-600 text-white px-4 py-2 rounded mt-4">
                  Enrolled ✅
                </button>
              ) : (
                <button onClick={makePayment} className="bg-cyan-600 text-white px-4 py-2 rounded mt-4">
                  Enroll Now
                </button>
              )}
           
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default ViewCourse