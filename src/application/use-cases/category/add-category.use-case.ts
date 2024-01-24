import { BadRequestError } from '@/application/errors/app-error'
import { ICategoryRepository } from '@/application/repositories/category.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type AddCategoryRequest = {
  description: string
  color: string
  parent?: string
  active: boolean
  type: string
}

export type AddCategoryResponse = {
  id: string
}

@injectable()
export class AddCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
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
        user: Id.create(user, 'User'),
        description: Description.create(request.description),
        color: Color.create(request.color),
        parent: request.parent
          ? Id.create(request.parent!, 'Parent')
          : undefined,
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
