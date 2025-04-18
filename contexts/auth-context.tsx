"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/types/database"
import { authenticateUser, hasPermission, isAdmin, isSeller } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
  isAdmin: () => boolean
  isSeller: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("vendorkut_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("vendorkut_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const authenticatedUser = await authenticateUser(email, password)
      if (!authenticatedUser) {
        throw new Error("Invalid email or password")
      }
      setUser(authenticatedUser)
      localStorage.setItem("vendorkut_user", JSON.stringify(authenticatedUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vendorkut_user")
  }

  const checkPermission = (permission: string) => {
    return hasPermission(user, permission)
  }

  const checkIsAdmin = () => {
    return isAdmin(user)
  }

  const checkIsSeller = () => {
    return isSeller(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasPermission: checkPermission,
        isAdmin: checkIsAdmin,
        isSeller: checkIsSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
