import { UserCategories } from '@/domain/entities/user-categories.entity'

export interface IUserCategoriesRepository {
  create(category: UserCategories): Promise<UserCategories>
  findByUser(userId: string): Promise<UserCategories | null>
  findById(id: string): Promise<UserCategories | null>
}
