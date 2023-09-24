import { CategoryRepository } from '@/application/repositories/category.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import logger from '@/infra/logger/logger'

export class CreateDefaultCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  public execute(user: string): void {
    logger.info(`Creating categories for user ${user}`)

    const expenses = CategoryUtils.createDefaultExpense()
    const incomes = CategoryUtils.createDefaultIncome()

    const userCategories = Category.create({ user, incomes, expenses })

    this.categoryRepository.create(userCategories)
  }
}
