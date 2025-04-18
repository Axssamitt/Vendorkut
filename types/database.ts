export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // In a real app, this would be hashed
  document: string
  documentType: "cpf" | "cnpj"
  role: "user" | "seller" | "moderator" | "admin"
  permissions: string[]
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  stock: number
  sellerId: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  image?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}
