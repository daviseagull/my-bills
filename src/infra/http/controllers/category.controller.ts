import { GetUserCategoriesUseCase } from '@/application/use-cases/category/get-user-categories.use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const useCase = container.resolve(GetUserCategoriesUseCase)

    const result = await useCase.execute(req.user!, req.params.type!)

    return res.status(200).json(result)
  }
}
