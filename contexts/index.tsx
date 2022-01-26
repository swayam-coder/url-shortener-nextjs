import React, { useContext, useState } from "react"
import { IUserContext } from "../interfaces_and_types" 

const UserContext = React.createContext<IUserContext | null>(null)

export function useUserContext() {
  return useContext(UserContext)
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>()
  
  const value = {
    userId,
    setUserId
  }

  return (
    <UserContext.Provider value={value}>
      { children } 
    </UserContext.Provider>
  )
}
