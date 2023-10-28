import { BadRequestError } from '@/application/errors/app-error'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface AddCategoryRequest {
  description: string
  color: string
  parent?: string
  active: boolean
  type: string
}

export interface AddCategoryResponse {
  id: string
}

@injectable()
export class AddCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository
  ) {}

  public async execute(
    user: string,
    request: AddCategoryRequest
  ): Promise<AddCategoryResponse> {
    logger.info(
      `Add ${request.type} category ${request.description} to user ${user}`
    )

    await this.validateCategory(user, request)

    const createdCategory = await this.categoryRepository.create(
      Category.create({
        user,
        description: request.description,
        color: Color.create(request.color),
        parent: request.parent,
        active: request.active,
        type: CategoryUtils.mapCategoryTypeEnum(request.type)
      })
    )

    return { id: createdCategory.id! }
  }

  private async validateCategory(user: string, request: AddCategoryRequest) {
    const category = await this.categoryRepository.findByUserAndDescription(
      user,
      request.description
    )
    logger.info(`${JSON.stringify(request)}`)

    logger.info(`${JSON.stringify(category)}`)
    if (category && category.props.type === request.type) {
      throw new BadRequestError(
        `Couldn't add category '${request.description}' because it already exists`
      )
    }

    if (request.parent) {
      const parentCategory =
        await this.categoryRepository.findByUserAndDescription(
          user,
          request.parent
        )

      if (!parentCategory) {
        throw new BadRequestError(
          `Couldn't add category ${request.description} because ${request.parent} parent doesn't exists`
        )
      }
    }
  }
}
