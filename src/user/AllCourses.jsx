import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { searchContext } from '../contextAPI/ShareContext'
import { getAllPublishedCoursesAPI } from '../services/allAPI'
import serverURL from '../services/serverURL'

function AllCourses() {
    const [token,setToken] = useState("")
    const {searchKey,setSearchKey} = useContext(searchContext)
    const [allCourses,setAllCourses] = useState([])
    const [tempAllCourses,setTempAllCourses]= useState([])
    const [categories,setCategories] = useState([])
    console.log(allCourses);
    

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        const userToken = sessionStorage.getItem("token")
        setToken(userToken)
        getAllCourses(userToken)
      }
    },[searchKey])

    const getAllCourses = async (token)=>{
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllPublishedCoursesAPI(reqHeader,searchKey)
      if(result.status == 200){
        setAllCourses(result.data)
        setTempAllCourses(result.data)
        const tempCategory = result.data?.map(item=>item.category)
        setCategories([...new Set(tempCategory)])
        
      }else{
        console.log(result);
        
      }
    }

    const filterCourse = (category)=>{
    if(category!="All Categories"){
      setAllCourses(tempAllCourses?.filter(item=>item.category==category))
    }else{
      setAllCourses(tempAllCourses)
    }
  }


  return (
    <>
    <Header/>
    {token?
    <div className="min-h-screen bg-slate-50 px-6 md:px-16 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-800">
          All Courses
        </h1>
        <p className="text-slate-600 mt-2">
          Find the right course and start learning today
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT FILTER PANEL */}
        <aside className="w-full lg:w-1/4 bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-24">

          {/* Header */}
          <div className=" mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Filter Courses
            </h3>
          </div>

          {/* SEARCH */}
          <div className="mb-8">
            <label className="text-sm font-medium text-slate-600">
              Search
            </label>
            <input value={searchKey} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search courses..." className="mt-2 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
          </div>

          {/* CATEGORY */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Category
            </h4>

            <div className="space-y-3">

              {/* All Categories */}
              <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                <input onClick={()=>filterCourse("All Categories")} type="radio" name='filter' id='nofilter'  />
                All Categories
              </label>

              {/* Dynamic categories later */}
              {
                categories?.map((item,index)=>(
                  <div key={index}>
                    <label htmlFor={item}  className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                        <input onClick={()=>filterCourse(item)} type="radio" name='filter'  id={item} />
                        {item}
                    </label>
                  </div>
                ))
              }
            </div>
          </div>

        </aside>


        {/* RIGHT CONTENT */}
        <section className="w-full lg:w-3/4">

          {/* Courses Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

            {/* Duplicate cards */} 
            {
              allCourses?.length>0 ?
              allCourses?.map(course=>(
                <div key={course?._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2  overflow-hidden">
                  <img src={`${serverURL}/uploads/images/${course?.thumbnail}`} alt="course" className="h-44 w-full object-cover"/>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-slate-800">
                      {course?.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                      {course?.shortDescription}
                    </p>

                    <div className="flex justify-between text-xs text-slate-500 mt-4">
                      <span>{course?.category}</span>
                      <span>{course?.duration}</span>
                    </div>

                    <div className='flex justify-between items-center mt-3'>
                      <span className="text-cyan-600 font-bold ">
                      $ {course?.price}
                      </span>
                      <span className="text-gray-400 text-xs ">
                       {course?.level}
                      </span>
                    </div>

                    <button className="w-full mt-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition">
                      <Link to={`/courses/${course?._id}/view`}>View Course</Link>
                    </button>
                  </div>
                </div>
              ))
              :
              <p className='font bold px-10 my-5'>Loading.....</p>
            }

          </div>
        </section>
      </div>
    </div>
    :
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <img className='w-50' src="https://media.lordicon.com/icons/wired/gradient/94-lock-unlock.gif" alt="lockscreen" />
      <p className="text-lg text-cyan-600 font-bold my-15">Please <Link to={'/login'} className='text-blue-600 underline'>Login</Link> to Explore More Courses ...</p>
    </div>
    }
    <Footer/>
    </>
  )
}

export default AllCourses