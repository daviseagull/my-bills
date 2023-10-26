import { InternalServerError } from '@/application/errors/app-error'
import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import { ICategory } from '@/domain/entities/user-categories.entity'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserCategoriesUseCase {
  constructor(
    @inject('UserCategoriesRepository')
    private categoryRepository: IUserCategoriesRepository
  ) {}

  public async execute(user: string, type: string): Promise<ICategory[]> {
    logger.info(`Getting ${type} categories for user ${user}`)

    const categories = await this.categoryRepository.findByUser(user)

    if (!categories) {
      throw new InternalServerError(
        "Something bad happened... We couldn't found yours categories"
      )
    }

    return type === CategoryTypeEnum.expenses
      ? categories!.props.expenses
      : categories!.props.incomes
  }
}
