import { SignOutUseCase } from '@/application/use-cases/user/sign-out/sign-out.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { Request, Response } from 'express'

export class UserController {
  async signOut(req: Request, res: Response) {
    const useCase = new SignOutUseCase(new CognitoService())

    const result = await useCase.execute(req.token!)

    return res.status(204).json(result)
  }
}
