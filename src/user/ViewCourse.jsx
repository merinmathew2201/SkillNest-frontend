import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function ViewCourse() {
  return (
    <>
    <Header/>
    <div className="bg-sky-50 py-14 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Full Stack Web Development
        </h1>

        <p className="mt-4 text-slate-600 max-w-3xl">
          Learn MERN stack from scratch with hands-on projects and real-world
          development practices.
        </p>

        <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-600">
          <span className="bg-white px-3 py-1 rounded-full shadow">
            Beginner
          </span>
          <span className="bg-white px-3 py-1 rounded-full shadow">
            4 Weeks
          </span>
          <span className="bg-white px-3 py-1 rounded-full shadow">
            Web Development
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
              This course will guide you through frontend and backend
              development using modern technologies like React, Node.js,
              Express, and MongoDB.
            </p>
          </section>

          {/* What You'll Learn */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              What You'll Learn
            </h2>
            <p className="text-slate-600 leading-relaxed">
              This course will help you understand the core concepts of web development,
              build real-world projects, and gain confidence to apply for jobs.
            </p>
          </section>

          {/* Free Preview Video */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Free Preview
            </h2>

            <div className="rounded-xl overflow-hidden shadow">
              <video controls className="w-full">
                <source src="/sample-video.mp4" type="video/mp4" />
              </video>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Preview lesson available for everyone
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="sticky top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            
            <img
              src="https://www.creativeinsightacademy.com/static/media/fullStackDevelopment.885c32d4b5d6f021462f.jpg"
              alt="course"
              className="rounded-xl mb-4"
            />

            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Level:</strong> Beginner</p>
              <p><strong>Duration:</strong> 4 Weeks</p>
              <p><strong>Category:</strong> Web Development</p>
            </div>
            {/* Price */}
            <div className="mt-4 border-t border-gray-400 pt-4">
              <p className="text-sm text-slate-500">Course Price</p>
              <p className="text-2xl font-bold text-slate-800">$49</p>
            </div>
            <button className="w-full mt-6 py-2 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
              <Link to={'/courses/:id/learn'}>Enroll Now</Link>
            </button>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default ViewCourse