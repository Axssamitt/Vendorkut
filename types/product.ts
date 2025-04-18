export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  rating: number
  stock: number
  seller: {
    id: string
    name: string
  }
}
