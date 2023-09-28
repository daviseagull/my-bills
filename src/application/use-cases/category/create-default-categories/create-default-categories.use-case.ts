import { ICategoryRepository } from '@/application/repositories/category.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDefaultCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public execute(user: string): void {
    logger.info(`Creating categories for user ${user}`)

    const expenses = CategoryUtils.createDefaultExpense()
    const incomes = CategoryUtils.createDefaultIncome()

    const userCategories = Category.create({ user, incomes, expenses })

    this.categoryRepository.create(userCategories)
  }
}
