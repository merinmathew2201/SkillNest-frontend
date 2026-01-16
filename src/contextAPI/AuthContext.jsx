import React, { createContext, useEffect, useState } from 'react'

export const routeGuardContext = createContext('')

function AuthContext({children}) {
    const [role,setRole] = useState('')
    const [authorisedUser,setAuthorisedUser] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))
            setRole(user.role)
            setAuthorisedUser(true)
        }
    },[role,authorisedUser])
  return (
    <>
        <routeGuardContext.Provider value={{role,authorisedUser,setAuthorisedUser}}>
            {children}
        </routeGuardContext.Provider>
    </>
)
}

export default AuthContext