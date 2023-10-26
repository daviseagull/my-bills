import { ICategory } from '../entities/user-categories.entity'

export interface CategoryDto {
  description: string
  color: string
  parent?: string
}

export interface UserCategoriesDto {
  id: string
  user: string
  incomes: CategoryDto[]
  expenses: CategoryDto[]
}
