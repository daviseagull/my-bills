import { GetUserUseCase } from '@/application/use-cases/user/get-user/get-user.use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UserController {
  async getUser(req: Request, res: Response) {
    const useCase = container.resolve(GetUserUseCase)

    const result = await useCase.execute(req.user!)

    return res.status(200).json(result)
  }
}
