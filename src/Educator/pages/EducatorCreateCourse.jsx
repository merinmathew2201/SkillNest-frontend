import React from 'react'
import EducatorHeader from '../components/EducatorHeader'
import { FaCloudUploadAlt } from "react-icons/fa";

function EducatorCreateCourse() {
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
                    <input type="text" placeholder="Enter the Course Tiltle...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea rows="2" placeholder="Brief description of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded px-3 py-2 "/>
                </div>

                {/* Full Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Course Overview</label>
                    <textarea rows="4" placeholder="Detailed course overview...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded px-3 py-2 "/>
                </div>

                {/* What you will learn */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        What you will learn
                    </label>

                    <textarea rows="5" placeholder="Explain what students will gain from this course..." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded-lg px-4 py-3 "/>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input type="text" placeholder="Category of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Level */}
                <div>
                    <label className="block text-sm font-medium mb-1">Level</label>
                    <select className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-3 py-2 ">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <input type="text" placeholder="Duration of the course...." className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-3 py-2 "/>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium mb-3">Course Thumbnail</label>
                    <label htmlFor="thumbnail" className="border border-dashed border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition">
                        <FaCloudUploadAlt className="text-3xl text-cyan-500 mb-2" />
                        <p className="text-sm text-slate-600">
                        Click to upload course image
                        </p>
                    </label>
                    <input id='thumbnail' type="file"  hidden/>
                </div>

                {/* Course Price */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Course Price ($)
                    </label>

                    <input type="number" placeholder="Enter course price" className="w-full border border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-400  rounded-lg px-4 py-2 "/>
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button className="w-full bg-cyan-500 text-white py-2 rounded-lg font-medium hover:bg-cyan-600 transition">
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
    </>
  )
}

export default EducatorCreateCourse