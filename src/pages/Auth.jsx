import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

function Auth({registerURL}) {
  const [showPassword, setShowPassword] = useState(false)

  // validation rules
  const validationSchema = Yup.object({
    username:registerURL?Yup.string().required("*Username is required"):Yup.string(),
    email:Yup.string().email("Invalid Email").required("*Email is required"),
    password:Yup.string().min(6,"Minimun 6 Characters").required("*Password is required"),
    role:Yup.string().required("*Select a Role")
  })
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-sky-800 mb-2">
            {registerURL ? "Create an Account" : "Welcome Back"}
          </h2>

          <p className="text-center text-slate-500 mb-6">
            {registerURL? "Join SkillNest and start learning today": "Login to continue your learning journey"}
          </p>
          <Formik initialValues={{username:"",email:"",password:"",role:""}} validationSchema={validationSchema} onSubmit={(values,{resetForm})=>{
            console.log(values);
            resetForm()
          }}>
            <Form>
              {/* Username (only register) */}
              {registerURL &&
                <div className='mt-5'>
                  <Field name="username" placeholder="Username" className="w-full px-4 py-2 border border-cyan-500  rounded-xl"/>
                  <ErrorMessage name="username" component="p" className="text-red-500 text-sm"/>
                </div>
              }

              {/* email */}
              <div className='mt-5'>
                <Field type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-cyan-500 rounded-xl"/>
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm"/>
              </div>

              {/* password */}
              <div className='relative mt-5'>
                <Field type={showPassword?"text":"password"} name="password" placeholder="Password" className="w-full px-4 py-2 border border-cyan-500 rounded-xl"/>
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 cursor-pointer text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm"/>
              </div>

              {/* Role */}
              {registerURL && 
              <>
                <div className="flex gap-6 mt-5">
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="role" value="student" />
                    Student
                  </label>
  
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="role" value="educator" />
                    Educator
                  </label>
                </div>
                <ErrorMessage name="role" component="p" className="text-red-500 text-sm"/>
              </>}

              {registerURL?
              <p className='text-gray-600 text-sm my-5'>Already have an account?<Link to={'/login'} className='text-cyan-600'>Login</Link></p>:
              <p className='text-gray-600 text-sm my-5'>Don’t have an account yet?<Link to={'/register'} className='text-cyan-600'>Register</Link></p>
              }
              
              {/* Submit */}
              <button type='submit' className="w-full bg-cyan-500 text-white py-2 rounded-xl hover:bg-cyan-600">
                {registerURL ? "Register" : "Login"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
   
  )
}

export default Auth