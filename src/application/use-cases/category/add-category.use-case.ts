import { BadRequestError } from '@/application/errors/app-error'
import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import {
  ICategory,
  UserCategories
} from '@/domain/entities/user-categories.entity'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import { Color } from '@/domain/value-objects/color'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface AddCategoryRequest {
  description: string
  color: string
  parent?: string
}

@injectable()
export class AddCategoryUseCase {
  constructor(
    @inject('UserCategoriesRepository')
    private categoryRepository: IUserCategoriesRepository
  ) {}

  public async execute(
    user: string,
    type: string,
    request: AddCategoryRequest
  ): Promise<void> {
    logger.info(`Add ${type} category ${request.description} to user ${user}`)

    const userCategories = await this.categoryRepository.findByUser(user)

    if (!userCategories) {
      throw new BadRequestError(`Couldn't found categories for user ${user}`)
    }

    if (type === CategoryTypeEnum.incomes) {
      await this.addIncome(userCategories!, request)
    } else if (type === CategoryTypeEnum.expenses) {
      await this.addExpense(userCategories!, request)
    } else {
      throw new BadRequestError('Invalid type')
    }
  }

  private async addExpense(
    userCategories: UserCategories,
    request: AddCategoryRequest
  ) {
    this.validateCategory(userCategories.props.expenses, request)

    userCategories.props.expenses.push({
      description: request.description,
      color: Color.create(request.color),
      parent: request.parent
    })

    this.categoryRepository.save(userCategories)
  }

  private addIncome(
    userCategories: UserCategories,
    request: AddCategoryRequest
  ): void {
    this.validateCategory(userCategories.props.incomes, request)

    userCategories.props.incomes.push({
      description: request.description,
      color: Color.create(request.color),
      parent: request.parent
    })

    this.categoryRepository.save(userCategories)
  }

  private validateCategory(
    categories: ICategory[],
    request: AddCategoryRequest
  ) {
    const parentCategory = categories.find(
      (category) => category.description === request.parent
    )

    if (!parentCategory) {
      throw new BadRequestError(
        `Couldn't add category ${request.description} because ${request.parent} parent doesn't exists`
      )
    }

    const category = categories.find(
      (category) =>
        category.description === request.description ||
        category.color.props.value === request.color
    )

    if (category) {
      throw new BadRequestError(
        `Couldn't add category ${request.description} because it already exists`
      )
    }
  }
}
