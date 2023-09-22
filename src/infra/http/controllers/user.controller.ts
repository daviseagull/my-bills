import { GetUserUseCase } from '@/application/use-cases/user/get-user/get-user.use-case'
import { SignOutUseCase } from '@/application/use-cases/user/sign-out/sign-out.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { Request, Response } from 'express'

export class UserController {
  async signOut(req: Request, res: Response) {
    const useCase = new SignOutUseCase(new CognitoService())

    const result = await useCase.execute(req.token!)

    return res.status(204).json(result)
  }

  async getUser(req: Request, res: Response) {
    const useCase = new GetUserUseCase(new UserPrismaRepository())

    const result = await useCase.execute(req.params.email)

    return res.status(200).json(result)
  }
}
