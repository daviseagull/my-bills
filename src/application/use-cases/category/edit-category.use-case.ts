import { BadRequestError } from '@/application/errors/app-error'
import { ICategoryRepository } from '@/application/repositories/category.repository'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type EditCategoryRequest = {
  id: string
  user: string
  type: string
  description: string
  color: string
  parent?: string
  active: boolean
}

export type EditCategoryResponse = {
  id: string
}

@injectable()
export class EditCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute(
    user: string,
    request: EditCategoryRequest
  ): Promise<EditCategoryResponse> {
    if (!request.id) {
      throw new BadRequestError('Category id must be provided.')
    }

    logger.info(`Edit ${request.id} category to user ${user}`)

    const category = Category.create(
      {
        type: CategoryUtils.mapCategoryTypeEnum(request.type),
        user: request.user,
        description: request.description,
        parent: request.parent,
        active: request.active,
        color: Color.create(request.color)
      },
      request.id
    )

    await this.categoryRepository.update(category)

    return { id: category.id! }
  }
}
