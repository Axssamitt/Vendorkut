import type { User } from "@/types/database"
import db from "@/lib/db-config"

// In a real application, you would use a proper authentication library
// and implement secure password hashing and JWT tokens

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await db.findUserByEmail(email)

  if (!user) {
    return null
  }

  // In a real app, you would compare hashed passwords
  if (user.password !== password) {
    return null
  }

  // Check if user is approved
  if (user.status !== "approved") {
    throw new Error("Your account is pending approval or has been rejected")
  }

  return user
}

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false
  return user.permissions.includes(permission)
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false
  return user.role === "admin"
}

export function isSeller(user: User | null): boolean {
  if (!user) return false
  return user.role === "seller" || user.role === "admin"
}
