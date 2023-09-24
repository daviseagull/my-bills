import { Category } from '@/domain/entities/category.entity'

export interface CategoryRepository {
  create(category: Category): Promise<Category>
  findByUser(userId: string): Promise<Category | null>
  findById(id: string): Promise<Category | null>
}
