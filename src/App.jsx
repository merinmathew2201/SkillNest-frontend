
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './user/Home'
import Auth from './pages/Auth'
import Contact from './user/Contact'
import AllCourses from './user/AllCourses'
import ViewCourse from './user/ViewCourse'
import CourseLearn from './user/CourseLearn'
import Profile from './user/Profile'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminLayout from './admin/AdminLayout'
import AdminUsers from './admin/pages/AdminUsers'
import AdminCourses from './admin/pages/AdminCourses'
import EducatorDashboard from './Educator/pages/EducatorDashboard'
import EducatorCourses from './Educator/pages/EducatorCourses'
import EducatorCreateCourse from './Educator/pages/EducatorCreateCourse'
import EducatorManageCourse from './Educator/pages/EducatorManageCourse'
import Pnf from './pages/Pnf'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth registerURL = {true}/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/learner/profile' element={<Profile/>}/>
      <Route path='/courses' element={<AllCourses/>}/>
      <Route path='/courses/:id/view' element={<ViewCourse/>}/>
      <Route path='/courses/:id/learn' element={<CourseLearn/>}/>

      <Route path='/educator/dashboard' element={<EducatorDashboard/>}/>
      <Route path='/educator/create-course' element={<EducatorCreateCourse/>}/>
      <Route path='/educator/courses' element={<EducatorCourses/>}/>
      <Route path='/educator/courses/:id/manage' element={<EducatorManageCourse/>}/>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses" element={<AdminCourses />} />
      </Route>

      <Route path='/*' element={<Pnf/>}/>
    </Routes>
    </>
  )
}

export default App
