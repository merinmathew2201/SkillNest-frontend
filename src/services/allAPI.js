import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


// register api-called by auth component,when register btn clicked
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

// login api-called by auth component,when login btn clicked
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

// google login : called by auth component , when google login btn clicked
export const googleLoginAPI = async (reqBody)=>{
    return await commonAPI ("POST",`${serverURL}/google-login`,reqBody)
} 

// /users/all -called by adminUsers when page loads
export const getAllUsersAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/users/all`,{},reqHeader)
}

// /users/pending -called by adminUsers when page loads
export const getAllPendingUsersAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/users/pending`,{},reqHeader)
}

// /educator/:id/approve - called by admin users when clicked on approve button
export const approveEducatorAPI = async (id,reqHeader)=>{
    return await commonAPI ("PUT",`${serverURL}/educator/${id}/approve`,{},reqHeader)
}

// /users/:id/remove - called by admin users when clicked on delete button
export const removeUserAPI = async (id,reqHeader)=>{
    return await commonAPI ("DELETE",`${serverURL}/users/${id}/remove`,{},reqHeader)
}

// /student/:id/edit-info - for user info updation called by edit when user click on save changes 
export const updateStudentInfoAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI ("PUT",`${serverURL}/student/${id}/edit-info`,reqBody,reqHeader)
}

// /student/:id/password - for user info updation called by edit when user click on save changes 
export const updatePasswordInfoAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI ("PUT",`${serverURL}/student/${id}/password`,reqBody,reqHeader)
}

// /educator/course/create- create course called by educatorcreatecourse when clicked on submit button
export const createCourseAPI = async (reqBody,reqHeader)=>{
    return await commonAPI ("POST",`${serverURL}/educator/course/create`,reqBody,reqHeader)
}

// /courses/all -called by adminCourses when page loads
export const getAllCoursesAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/courses/all`,{},reqHeader)
}

// /courses/pending -called by adminCourses when page loads
export const getAllPendingCoursesAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/courses/pending`,{},reqHeader)
}

// /course/:id/approve-called by adminCourses when clicked on approve button
export const approveCourseAPI = async (id,reqHeader)=>{
    return await commonAPI ("PUT",`${serverURL}/course/${id}/approve`,{},reqHeader)
}

// /course/:id/remove - called by admin users when clicked on delete button
export const removeCourseAPI = async (id,reqHeader)=>{
    return await commonAPI ("DELETE",`${serverURL}/course/${id}/remove`,{},reqHeader)
}

// /dashboard-stats- called by adminDashboard when page loads
export const getStatsAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/dashboard-stats`,{},reqHeader)
}

// /educator/courses- called by educatorCourses when page loads
export const getEducatorCoursesAPI = async (reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/educator/courses`,{},reqHeader)
}

// /course/add-section - called by educatormanagecourse when clicked on add section
export const createSectionAPI = async (reqBody,reqHeader)=>{
    return await commonAPI ("POST",`${serverURL}/course/add-section`,reqBody,reqHeader)
}

// /courses/:courseId/sections - get sections in a single course 
export const getAllSectionsAPI = async (courseId,reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/courses/${courseId}/sections`,{},reqHeader)
}

// /section/:sectionId/remove - remove section when clicked on delete btn
export const removeSectionAPI = async (sectionId,reqHeader)=>{
    return await commonAPI ("DELETE",`${serverURL}/section/${sectionId}/remove`,{},reqHeader)
}

// /educator/courses/:courseId - single course when mangecouse page loads
export const getSingleCourseAPI = async (courseId,reqHeader)=>{
    return await commonAPI ("GET",`${serverURL}/educator/courses/${courseId}`,{},reqHeader)
}