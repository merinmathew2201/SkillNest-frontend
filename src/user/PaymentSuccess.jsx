import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { enrollCourseAPI } from '../services/allAPI'

function PaymentSuccess() {

    const [params] = useSearchParams()
    const courseId = params.get("courseId")
    const navigate = useNavigate()

    useEffect(()=>{
      enroll()
    },[])

    const enroll = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            }
            const result = await enrollCourseAPI({courseId},reqHeader)
            if (result.status === 200 || result.status === 201) {
                setTimeout(() => {
                  navigate(`/courses/${courseId}/learn`)
                }, 3000);
            } else {
                navigate("/payment-error")
                console.log(result);
            }
        }
        
    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-green-800">
        Thank you for your purchase. You now have access to your course.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800"
        
      >
        <Link to={'/learner/profile'}>Go to My Profile</Link>
      </button>
    </div>
  )
}

export default PaymentSuccess