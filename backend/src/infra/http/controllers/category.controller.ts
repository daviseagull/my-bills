import { GetCategoriesUseCase } from '@/application/use-cases/category/get-categories/get-categories.use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const useCase = container.resolve(GetCategoriesUseCase)
    
    const result = await useCase.execute(req.user!, req.params.type!)

    return res.status(200).json(result)
  }
}
