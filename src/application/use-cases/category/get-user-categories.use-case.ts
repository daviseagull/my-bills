import { InternalServerError } from 'application/errors/app-error'
import { ICategoryRepository } from 'application/repositories/category.repository'
import { CategoryDto } from 'domain/dtos/category.dto'
import { CategoryTypeEnum } from 'domain/enums/category-type.enum'
import { CategoryMapper } from 'domain/mappers/category.mapper'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(
    user: string,
    type: CategoryTypeEnum
  ): Promise<CategoryDto[]> {
    logger.info(`Getting ${type} categories for user ${user}`)

    const categories = await this.categoryRepository.findByUserAndType(
      user,
      type
    )

    if (!categories) {
      throw new InternalServerError(
        "Something bad happened... We couldn't found yours categories"
      )
    }

    const filteredCategories = categories.filter(
      (income) => income.props.active === true
    )

    return CategoryMapper.toCategoriesDto(filteredCategories)
  }
}
