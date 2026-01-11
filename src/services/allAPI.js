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