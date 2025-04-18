"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "@/types/database"
import { useAuth } from "@/contexts/auth-context"
import db from "@/lib/db-config"

interface CartContextType {
  items: CartItem[]
  addToCart: (product: { id: string; name: string; price: number; image?: string }, quantity: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  // Calculate derived values
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load cart from storage or database
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)
      try {
        if (user) {
          // If user is logged in, load cart from database
          const userCart = await db.getCartItems(user.id)
          setItems(userCart)
        } else {
          // If user is not logged in, load cart from localStorage
          const storedCart = localStorage.getItem("vendorkut_cart")
          if (storedCart) {
            try {
              setItems(JSON.parse(storedCart))
            } catch (error) {
              console.error("Failed to parse stored cart:", error)
              localStorage.removeItem("vendorkut_cart")
            }
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [user])

  // Save cart to storage or database whenever it changes
  useEffect(() => {
    if (isLoading) return

    if (user) {
      // We don't need to save to database here as our methods already do that
      // This is just for demonstration
    } else {
      // If user is not logged in, save cart to localStorage
      localStorage.setItem("vendorkut_cart", JSON.stringify(items))
    }
  }, [items, user, isLoading])

  const addToCart = async (product: { id: string; name: string; price: number; image?: string }, quantity: number) => {
    if (quantity <= 0) return

    const newItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    }

    if (user) {
      // If user is logged in, save to database
      const updatedCart = await db.addToCart(user.id, newItem)
      setItems(updatedCart)
    } else {
      // If user is not logged in, update local state
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.productId === product.id)

        if (existingItemIndex !== -1) {
          // Update quantity if product already exists
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += quantity
          return updatedItems
        } else {
          // Add new item to cart
          return [...prevItems, newItem]
        }
      })
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (user) {
      // If user is logged in, update in database
      const updatedCart = await db.updateCartItem(user.id, productId, quantity)
      setItems(updatedCart)
    } else {
      // If user is not logged in, update local state
      setItems((prevItems) => {
        if (quantity <= 0) {
          return prevItems.filter((item) => item.productId !== productId)
        }

        return prevItems.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      })
    }
  }

  const removeItem = async (productId: string) => {
    await updateQuantity(productId, 0)
  }

  const clearCart = async () => {
    if (user) {
      // If user is logged in, clear in database
      await db.clearCart(user.id)
    }
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
