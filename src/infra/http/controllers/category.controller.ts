import { AddCategoryUseCase } from '@/application/use-cases/category/add-category.use-case'
import { EditCategoryUseCase } from '@/application/use-cases/category/edit-category.use-case'
import { GetUserCategoriesUseCase } from '@/application/use-cases/category/get-user-categories.use-case'
import { CategoryUtils } from '@/application/utils/category.utils'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const useCase = container.resolve(GetUserCategoriesUseCase)

    const result = await useCase.execute(
      req.user!,
      CategoryUtils.mapCategoryTypeEnum(req.params.type!)
    )

    return res.status(200).json(result)
  }

  async addCategory(req: Request, res: Response) {
    const useCase = container.resolve(AddCategoryUseCase)

    const result = await useCase.execute(req.user!, req.body)

    return res.status(200).json(result)
  }

  async editCategory(req: Request, res: Response) {
    const useCase = container.resolve(EditCategoryUseCase)

    const result = await useCase.execute(req.user!, req.body)

    return res.status(200).json(result)
  }
}
