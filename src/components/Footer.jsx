import React from 'react'
import { FaEnvelope, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='h-[600] md:h-[270] md:grid grid-cols-4 bg-sky-200 p-10'>
        <div>
          <div className='flex items-center  '>
            <img width={'40px'} src="https://icon-library.com/images/courses-icon/courses-icon-27.jpg" alt="logo" />
            <h1 className='text-xl md:text-2xl font-bold ms-2 text-cyan-500'><span className='text-cyan-900'>Skill</span>Nest</h1>
          </div>
          <p className='mt-3 md:mt-6 text-cyan-800'>Learn skills that shape your future</p>
        </div>
        <div className='mt-5 md:mt-0'>
          <h1 className='text-cyan-900 font-bold'>Explore</h1>
          <div className='flex flex-col mt-2 md:mt-4 text-cyan-800 '>
            <Link to={'/'} className='mb-2 hover:text-cyan-950'>Home</Link>
            <Link to={'/courses'} className='mb-2 hover:text-cyan-950'>Courses</Link>
            <Link  className='hover:text-cyan-950'>Categories</Link>
          </div>
        </div>
        <div className='mt-7 md:mt-0'>
          <h1 className='text-cyan-900 font-bold'>Support</h1>
          <div className='flex flex-col mt-2 md:mt-4 text-cyan-800 '>
            <p  className='mb-2 hover:text-cyan-950 cursor-pointer'>Contact Us</p>
            <p  className='mb-2 hover:text-cyan-950 cursor-pointer'>Help / FAQ</p>
            <p  className='hover:text-cyan-950 cursor-pointer'>Privacy Policy</p>
          </div>
        </div>
        <div className='mt-7 md:mt-0'>
          <h1 className='text-cyan-900 font-bold'>Connect with us</h1>
          <div className='flex text-cyan-700 mt-2 md:mt-4 text-2xl'>
            <FaLinkedin className='me-3 hover:text-cyan-950 cursor-pointer'/>
            <FaXTwitter className='me-3 hover:text-cyan-950 cursor-pointer'/>
            <FaYoutube className='me-3 hover:text-cyan-950 cursor-pointer'/>
            <FaEnvelope className='hover:text-cyan-950 cursor-pointer'/>
          </div>
        </div>
        
      </div>
      <div className='text-center py-2 bg-cyan-500 text-white'>Copyright &copy; 2025 SkillNest. All rights reserved</div>
    </>
  )
}

export default Footer
