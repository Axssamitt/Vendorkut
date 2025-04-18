// This is a mock database implementation for demonstration purposes
// In a real application, you would use a proper database like MongoDB, PostgreSQL, etc.

import type { User, Product, CartItem, Order } from "@/types/database"

// In-memory database
class Database {
  private users: User[] = []
  private products: Product[] = []
  private cartItems: Record<string, CartItem[]> = {}
  private orders: Order[] = []

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findUserByDocument(document: string): Promise<User | null> {
    return this.users.find((user) => user.document === document) || null
  }

  async createUser(user: User): Promise<User> {
    // Check if user with email or document already exists
    const existingUserByEmail = await this.findUserByEmail(user.email)
    const existingUserByDocument = await this.findUserByDocument(user.document)

    if (existingUserByEmail) {
      throw new Error("User with this email already exists")
    }

    if (existingUserByDocument) {
      throw new Error("User with this document already exists")
    }

    const newUser = { ...user, id: `user_${this.users.length + 1}` }
    this.users.push(newUser)
    return newUser
  }

  async getAllUsers(): Promise<User[]> {
    return this.users
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...userData }
    return this.users[userIndex]
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return this.products
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) || null
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = { ...product, id: `product_${this.products.length + 1}` }
    this.products.push(newProduct)
    return newProduct
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
    const productIndex = this.products.findIndex((product) => product.id === id)
    if (productIndex === -1) return null

    this.products[productIndex] = { ...this.products[productIndex], ...productData }
    return this.products[productIndex]
  }

  // Cart methods
  async getCartItems(userId: string): Promise<CartItem[]> {
    return this.cartItems[userId] || []
  }

  async addToCart(userId: string, item: CartItem): Promise<CartItem[]> {
    if (!this.cartItems[userId]) {
      this.cartItems[userId] = []
    }

    // Check if product already exists in cart
    const existingItemIndex = this.cartItems[userId].findIndex((cartItem) => cartItem.productId === item.productId)

    if (existingItemIndex !== -1) {
      // Update quantity if product already exists
      this.cartItems[userId][existingItemIndex].quantity += item.quantity
    } else {
      // Add new item to cart
      this.cartItems[userId].push(item)
    }

    return this.cartItems[userId]
  }

  async updateCartItem(userId: string, productId: string, quantity: number): Promise<CartItem[]> {
    if (!this.cartItems[userId]) {
      return []
    }

    const itemIndex = this.cartItems[userId].findIndex((item) => item.productId === productId)
    if (itemIndex === -1) return this.cartItems[userId]

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      this.cartItems[userId] = this.cartItems[userId].filter((item) => item.productId !== productId)
    } else {
      // Update quantity
      this.cartItems[userId][itemIndex].quantity = quantity
    }

    return this.cartItems[userId]
  }

  async clearCart(userId: string): Promise<void> {
    this.cartItems[userId] = []
  }

  // Order methods
  async createOrder(order: Order): Promise<Order> {
    const newOrder = { ...order, id: `order_${this.orders.length + 1}` }
    this.orders.push(newOrder)
    return newOrder
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter((order) => order.userId === userId)
  }

  // Initialize with sample data
  initializeWithSampleData(sampleProducts: Product[], sampleUsers: User[]) {
    this.products = sampleProducts
    this.users = sampleUsers
  }
}

// Create and export database instance
const db = new Database()

// Initialize with sample data from our existing data files
import { allProducts } from "@/data/products"
import { sampleUsers } from "@/data/users"

// Convert our existing product data to match the database schema
const dbProducts: Product[] = allProducts.map((product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image || "/placeholder.svg?height=300&width=300",
  category: product.category,
  stock: product.stock,
  sellerId: product.seller.id,
  status: "approved",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))

db.initializeWithSampleData(dbProducts, sampleUsers)

export default db
