import { Category } from 'domain/entities/category.entity'
import { CategoryTypeEnum } from 'domain/enums/category-type.enum'

export interface ICategoryRepository {
  create(category: Category): Promise<Category>
  createMany(categories: Category[]): Promise<void>
  findByUser(user: string): Promise<Category[] | null>
  findById(id: string): Promise<Category | null>
  findByUserAndDescription(
    user: string,
    description: string
  ): Promise<Category | null>
  findByUserAndType(user: string, type: CategoryTypeEnum): Promise<Category[]>
  findByUserAndId(user: string, id: string): Promise<Category | null>
  update(category: Category): Promise<Category>
}
