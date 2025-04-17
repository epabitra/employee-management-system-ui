import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  first_name: string
  last_name: string
  email: string
  image_url?: string
  lang_key?: string
  timezone_id?: string
  phone?: string
  dob?: string
  role?: string
  department?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (userDetails: any) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      const users = JSON.parse(storedUsers)
      const foundUser = users.find((u: any) => u.email === email && u.password_hash === password)

      if (foundUser) {
        setUser(foundUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(foundUser))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const signup = async (userDetails: any): Promise<boolean> => {
    // In a real app, this would be an API call
    try {
      // Store user in localStorage for demo purposes
      const storedUsers = localStorage.getItem("users")
      const users = storedUsers ? JSON.parse(storedUsers) : []

      // Check if email already exists
      if (users.some((u: any) => u.email === userDetails.email)) {
        return false
      }

      // Ensure the image_url is properly stored
      const userToStore = {
        ...userDetails,
        // Make sure image_url is stored as a string
        image_url: userDetails.image_url || null,
      }

      users.push(userToStore)
      localStorage.setItem("users", JSON.stringify(users))

      // Auto login after signup
      setUser(userToStore)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(userToStore))

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
