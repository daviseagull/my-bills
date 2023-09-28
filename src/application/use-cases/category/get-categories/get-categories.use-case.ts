import { InternalServerError } from '@/application/errors/app-error'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { ICategory } from '@/domain/entities/category.entity'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCategoriesUseCase {
  constructor(
    @inject('CategoryRepository') private categoryRepository: CategoryRepository
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
