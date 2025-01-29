import React, { createContext, useContext, useState, useEffect, Children } from "react";

const userContext = createContext({});

export const UserProvider = ({children}) =>{
  const [user,setUser] = useState({});
   return <userContext.Provider value={{user,setUser}}>
    {children}
   </userContext.Provider>
}

export const userHook = () =>{
  return useContext(userContext);
}

export default userContext;
