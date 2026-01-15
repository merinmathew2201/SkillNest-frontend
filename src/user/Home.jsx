import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { easeOut, motion, useAnimation } from "framer-motion";
import { FaChalkboardTeacher, FaChartLine, FaCode, FaGraduationCap, FaLock, FaPaintBrush, FaPlayCircle, FaSearch, FaStar, FaUserGraduate } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { getLatestCoursesAPI } from '../services/allAPI';
import serverURL from '../services/serverURL';


function Home() {
  const cards = [
    {
      icon: <FaGraduationCap className='text-cyan-500 text-4xl mb-3' />,
      title: 'Learn Skill-Based Courses',
      text: 'Explore industry-relevant courses with free previews and master skills that employers value.',
    },
    {
      icon: <FaChalkboardTeacher className='text-cyan-500 text-4xl mb-3' />,
      title: 'Become an Educator',
      text: 'Create, manage, and share high-quality courses with an easy-to-use dashboard.',
    },
    {
      icon: <FaChartLine className='text-cyan-500 text-4xl mb-3' />,
      title: 'Track Your Progress',
      text: 'Monitor your learning journey, complete courses, and achieve your career goals.',
    },
    {
      icon: <FaLock className='text-cyan-500 text-4xl mb-3' />,
      title: 'Secure Learning Environment',
      text: 'Role-based access ensures only enrolled students can view premium course content.',
    },
  ]

  const testimonials = [
  { name: "Aarav Sharma", text: "This platform transformed my career!", img: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
  { name: "Meera Iyer", text: "Amazing courses and instructors. Learned so much!", img: "https://randomuser.me/api/portraits/women/44.jpg", rating: 4.8 },
  { name: "Rohit Kumar", text: "Hands-on projects really helped me land a job.", img: "https://randomuser.me/api/portraits/men/56.jpg", rating: 5 },
  { name: "Sneha Patel", text: "Easy to follow, interactive, and practical.", img: "https://randomuser.me/api/portraits/women/65.jpg", rating: 4.9 },
  { name: "Ankit Verma", text: "A complete learning experience from basics to advanced.", img: "https://randomuser.me/api/portraits/men/78.jpg", rating: 5 },
];

  const [latestCourses, setLatestCourses] = useState([])

  useEffect(() => {
    fetchLatestCourses()
  }, [])

  const fetchLatestCourses = async () => {
    const result = await getLatestCoursesAPI()
    if (result.status === 200) {
      setLatestCourses(result.data)
    }else{
      console.log(result);
    }
  }


 


  return (
    <>
      <Header />
      {/* hero section */}
      <div className=" md:grid grid-cols-2 bg-linear-to-r from-sky-50 to-sky-200 my-10  md:mx-30 mx-10  shadow-2xl rounded-2xl md:p-20 p-10 ">
        <div >
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: easeOut }} className='  font-bold md:text-5xl text-3xl my-5 bg-linear-to-r from-sky-300 to-cyan-800 bg-clip-text text-transparent '>Upgrade Your Skills. Transform Your Career</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: easeOut }} className=' text-lg text-sky-800'>Learn from industry experts and gain skills companies actually need</motion.p>
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }} className='px-3 py-2 mt-5 bg-cyan-500  rounded-2xl text-white hover:bg-cyan-700' ><Link to={'/courses'}  >Explore Courses</Link></motion.button>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: easeOut }} className='md:ms-10 mt-10 md:mt-0 '>
          <img className='w-full rounded-2xl shadow-2xl' src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f5aad7225196099.681928c1ce82c.jpg" alt="home image" />
        </motion.div>
      </div>

      {/* about part */}
      <div className='py-20 px-5 md:px-20 bg-white'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-cyan-800 mb-8'>What is SkillNest?</h2>
        <div className='grid md:grid-cols-4 gap-8'>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className='bg-white border border-cyan-100 rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform'
            >
              {card.icon}
              <h3 className='font-semibold text-xl mt-3 text-cyan-900'>{card.title}</h3>
              <p className='text-gray-700 mt-2 text-sm'>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* latest courses */}
      <div className="my-20 px-10 md:px-30">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-800 text-center mb-12">
          Popular Courses
        </h2>

        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true, type: 'bullets' }} spaceBetween={5}
          slidesPerView="auto" className="py-10 ">

          {
            latestCourses?.length>0 ?
          latestCourses?.map(course => (
            <SwiperSlide key={course?._id} className="w-90! pb-10 pt-5 px-7">
              <div style={{height:'360px'}} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src={`${serverURL}/uploads/images/${course?.thumbnail}`}
                  alt={course?.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-slate-800">
                    {course?.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {course?.shortDescription}
                  </p>

                  <div className="flex justify-between text-xs text-slate-500 mt-3">
                    <span>{course?.category}</span>
                    <span>{course?.duration}</span>
                  </div>

                  <span className="text-cyan-600 font-bold">
                    $ {course?.price}
                  </span>

                  <button className="w-full mt-4">
                    <Link
                      className="p-2 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition"
                      to={'/courses'}
                    >
                      View All Courses
                    </Link>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))
        :
        <p className='font-bold my-5 px-10 '>Loading..... </p>}
        </Swiper>

      </div>

      {/* categories */}
      <div className="my-24 px-6 md:px-30">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">
            Explore Top Categories
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Choose from industry-relevant skill paths
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Card */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-white text-2xl shadow-lg mb-6 group-hover:scale-110 transition">
              <FaCode />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              Web Development
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Master frontend, backend, and full-stack development using modern tools.
            </p>

            <span className="text-cyan-600 font-medium text-sm group-hover:underline cursor-pointer">
              <Link to={'/courses'}>Browse Courses →</Link>
            </span>
          </div>

          {/* Duplicate Card */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-2xl shadow-lg mb-6 group-hover:scale-110 transition">
              <FaChartLine />
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              Data Science
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Learn data analysis, visualization, and machine learning fundamentals.
            </p>

            <span className="text-cyan-600 font-medium text-sm group-hover:underline cursor-pointer">
              <Link to={'/courses'}>Browse Courses →</Link>
            </span>
          </div>

          {/* Duplicate Card */}
          <div className="group bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl shadow-lg mb-6 group-hover:scale-110 transition">
              <FaPaintBrush />
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              UI / UX Design
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Design intuitive, user-centered interfaces with real-world projects.
            </p>

            <span className="text-cyan-600 font-medium text-sm group-hover:underline cursor-pointer">
              <Link to={'/courses'}>Browse Courses →</Link>
            </span>
          </div>

        </div>
      </div>
      {/* Explore More */}
      <div className=" flex justify-center">
        <button className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-cyan-500 text-cyan-600 font-medium transition-all duration-300 hover:bg-cyan-500 hover:text-white">
          <Link to={'/courses'}>Explore More Categories</Link>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>


      {/* working */}
      <div className="my-20 px-10 md:px-30">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-800 text-center mb-4">
          How SkillNest Works
        </h2>

        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          A simple and effective learning process designed for students and educators.
        </p>

        <div className="grid gap-8 md:grid-cols-4">

          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
            <FaSearch className="text-4xl text-cyan-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-slate-800">
              Browse Courses
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Explore courses across multiple categories and skill levels.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
            <FaUserGraduate className="text-4xl text-cyan-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-slate-800">
              Enroll & Learn
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Enroll in courses and start learning at your own pace.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
            <FaPlayCircle className="text-4xl text-cyan-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-slate-800">
              Watch & Practice
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Learn through videos, resources, and hands-on practice.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
            <FaChartLine className="text-4xl text-cyan-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-slate-800">
              Track Progress
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Monitor your learning progress and improve continuously.
            </p>
          </div>

        </div>
      </div>

      {/* testimonials */}
      <div className="relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          A simple and effective learning process designed for students and educators.
        </p>
        <div className="infinite-scroll gap-8 mb-10">

          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="w-80 bg-white border border-gray-200 rounded-3xl p-7 shadow-md shrink-0"
            >
              <p className="text-slate-600 text-sm mb-6">
                “{t.text}”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-slate-800">{t.name}</h4>
                  <p className="text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(t.rating))}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>





      <Footer />
    </>
  )
}

export default Home