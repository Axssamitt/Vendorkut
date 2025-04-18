export interface Community {
  id: string
  name: string
  description: string
  image?: string
  category: string
  memberCount: number
  owner: {
    id: string
    name: string
  }
  isPrivate: boolean
}
