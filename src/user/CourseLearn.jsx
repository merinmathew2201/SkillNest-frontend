import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaCheckCircle, FaFilePdf, FaPlayCircle } from 'react-icons/fa';

function CourseLearn() {
    const [currentLesson, setCurrentLesson] = useState({
  title: "Welcome to the Course",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
});

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-100">

      <div className="grid grid-cols-12 gap-6 p-8">

        {/* Video Section */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-black rounded-lg overflow-hidden">
            <video src={currentLesson.videoUrl} controls className="w-full h-105" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">{currentLesson.title}</h2>
          <p className="text-sm text-slate-500">
            Full Stack Web Development · John Doe
          </p>

          

          {/* Resources */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Resources</h3>

            <div className="flex justify-between items-center rounded shadow bg-white p-3 ">
                <span className="flex items-center gap-2"><FaFilePdf className="text-red-500" />React Basics Notes</span>

                <a href="#" className="text-cyan-600 text-sm">
                    Download
                </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow p-5 max-h-175 overflow-y-auto">
          <h3 className="font-semibold mb-4">Course Content</h3>

          {/* Section 1 */}
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            Introduction
          </h4>

          <button
            onClick={() => {
                setCurrentLesson({
                    title:"Welcome to the Course",
                    videoUrl:"https://www.w3schools.com/html/mov_bbb.mp4"
                })
              
            }}
            className="w-full flex justify-between items-center p-2 rounded text-sm bg-cyan-100 text-cyan-700 mb-2"
          >
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Welcome to the Course
            </span>
          </button>

          <button
            onClick={() => {
                setCurrentLesson({
                    title:"Course Overview",
                    videoUrl:"https://www.w3schools.com/html/movie.mp4"
                })
              
            }}
            className="w-full flex justify-between items-center p-2 rounded text-sm hover:bg-slate-100 mb-4"
          >
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Course Overview
            </span>
          </button>

          {/* Section 2 */}
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            React Basics
          </h4>

          <button
            onClick={() => {
              setCurrentLesson({
                    title:"What is React",
                    videoUrl:"https://www.w3schools.com/html/mov_bbb.mp4"
                })
            }}
            className="w-full flex justify-between items-center p-2 rounded text-sm hover:bg-slate-100 mb-2"
          >
            <span className="flex items-center gap-2">
              <FaPlayCircle className="text-cyan-500" />
              What is React?
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentLesson({
                    title:"JSX & Components",
                    videoUrl:"https://www.w3schools.com/html/movie.mp4"
                })
            }}
            className="w-full flex justify-between items-center p-2 rounded text-sm hover:bg-slate-100"
          >
            <span className="flex items-center gap-2">
              <FaPlayCircle className="text-cyan-500" />
              JSX & Components
            </span>
          </button>
        </aside>
      </div>
    </div>
    <Footer/>
    </>
   
  )
}

export default CourseLearn