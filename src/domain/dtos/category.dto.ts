export type CategoryDto = {
  id: string
  createdAt: string
  updatedAt: string
  user: string
  type: string
  description: string
  color: string
  parent?: string
  active: boolean
}
