// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"
// import axios from "axios"
// import { CREATE_ACCOUNT, ACCOUNT_LOGIN } from "../constants/ApiConstant"
// import { handleError } from "@/helpers/ErrorHandler"

// interface User {
//   id?: number
//   firstName: string
//   lastName: string
//   email: string
//   imageUrl?: string
//   langKey?: string
//   mobileNumber?: string
//   dateOfBirth?: string
//   role?: string
//   department?: string
//   token: string | null
// }

// interface AuthContextType {
//   user: User | null
//   isAuthenticated: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   logout: () => void
//   signup: (userDetails: any) => Promise<boolean>
//   loading: boolean
// }


// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null)
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     // Check if user session exists when app loads 
//     checkAuthStatus()
//   }, [])

//   const checkAuthStatus = async () => {
//     try {
//       setLoading(false)
//     } catch (error) {
//       console.error("Auth check failed:", error)
//       setLoading(false)
//     }
//   }


//   //Login functionality
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await axios.post<User>(
//         ACCOUNT_LOGIN,
//         {email: email, password: password,},
//         {headers: { "Content-Type": "application/json" },},
//       )

//       if (response.status === 200) {
//         const userData = response.data

//         // Create user object
//         const user: User = {
//           id: userData.id,
//           firstName: userData.firstName || "Admin",
//           lastName: userData.lastName || "User",
//           email: userData.email,
//           imageUrl: userData.imageUrl,
//           langKey: userData.langKey,
//           mobileNumber: userData.mobileNumber,
//           dateOfBirth: userData.dateOfBirth,
//           role: userData.role || "Admin",
//           department: userData.department,
//           token: userData.token
//         }

//         console.log("user object:", user)

//         setUser(user)
//         setIsAuthenticated(true)
//         return true
//       }
//       return false
//     } catch (error: any) {
//       handleError(error)
//       console.error("Login failed:", error)
//       setUser(null)
//       setIsAuthenticated(false)
//       return false
//     }
//   }


//   //Logout functionality
//   const logout = () => {
//     setUser(null)
//     setIsAuthenticated(false)
//   }


//   //Signup functionality
//   const signup = async (userDetails: any): Promise<boolean> => {
//     try {
//       const response = await axios.post<User>(CREATE_ACCOUNT, userDetails, {
//         headers: { "Content-Type": "application/json" },
//       })

//       if (response.status === 201 || response.status === 200) {
//         const userData = response.data

//         // Create user object
//         const user: User = {
//           id: userData.id,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: userData.email,
//           imageUrl: userData.imageUrl,
//           langKey: userData.langKey,
//           mobileNumber: userData.mobileNumber,
//           dateOfBirth: userData.dateOfBirth,
//           role: userData.role,
//           department: userData.department,
//           token: userData.token
//         }
//         console.log("Processed user object:", user)

//         setUser(user)
//         setIsAuthenticated(true)
//         return true
//       }
//       return false
//     } catch (error: any) {
//       console.error("Signup failed:", error)
//       return false
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
