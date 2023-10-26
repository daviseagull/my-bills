import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { UserCategories } from '@/domain/entities/user-categories.entity'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDefaultCategoriesUseCase {
  constructor(
    @inject('UserCategoriesRepository')
    private categoryRepository: IUserCategoriesRepository
  ) {}

  public execute(user: string): void {
    logger.info(`Creating categories for user ${user}`)

    const userCategories = UserCategories.create({
      user,
      incomes: CategoryUtils.createDefaultIncome(),
      expenses: CategoryUtils.createDefaultExpense()
    })

    this.categoryRepository.create(userCategories)
  }
}
