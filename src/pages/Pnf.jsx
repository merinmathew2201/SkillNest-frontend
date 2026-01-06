import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className='flex justify-center items-center flex-col my-10'>
      <img width={'350px'} src="https://cdn.dribbble.com/userupload/22526017/file/original-66bed19281474c1d825b5504209a036a.gif" alt="page not found" />
      <p className='md:text-xl'>Sorry..</p>
      <p className='md:text-2xl'>The page you are looking for is not available</p>
      <Link to={'/'} className='p-3 bg-cyan-600 rounded text-white mt-5'>BACK HOME</Link>
    </div>
  )
}

export default Pnf