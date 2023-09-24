import { ICategory } from '../entities/category.entity'

export interface CategoryDto {
  id: string
  user: string
  incomes: ICategory[]
  expenses: ICategory[]
}
