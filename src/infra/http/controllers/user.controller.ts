import { GetUserUseCase } from '@/application/use-cases/user/get-user/get-user.use-case'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { Request, Response } from 'express'

export class UserController {
  async getUser(req: Request, res: Response) {
    const useCase = new GetUserUseCase(new UserPrismaRepository())

    const result = await useCase.execute(req.user!)

    return res.status(200).json(result)
  }
}
