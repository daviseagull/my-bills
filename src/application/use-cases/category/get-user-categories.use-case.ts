import { InternalServerError } from '@/application/errors/app-error'
import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import { CategoryDto } from '@/domain/dtos/user-categories.dto'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import { CategoryMapper } from '@/domain/mappers/category.mapper'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserCategoriesUseCase {
  constructor(
    @inject('UserCategoriesRepository')
    private categoryRepository: IUserCategoriesRepository
  ) {}

  public async execute(user: string, type: string): Promise<CategoryDto[]> {
    logger.info(`Getting ${type} categories for user ${user}`)

    const categories = await this.categoryRepository.findByUser(user)

    if (!categories) {
      throw new InternalServerError(
        "Something bad happened... We couldn't found yours categories"
      )
    }

    return type === CategoryTypeEnum.expenses
      ? CategoryMapper.toCategoryDto(
          categories!.props.expenses.filter(
            (expense) => expense.active === true
          )
        )
      : CategoryMapper.toCategoryDto(
          categories!.props.incomes.filter((income) => income.active === true)
        )
  }
}
