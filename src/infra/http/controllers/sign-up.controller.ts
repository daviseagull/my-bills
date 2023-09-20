import {
  SignUpRequest,
  SignUpUseCase
} from '@/application/use-cases/sign-up/sign-up.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { Request, Response } from 'express'

export class SignUpController {
  async handle(req: Request, res: Response) {
    const user: SignUpRequest = req.body

    const useCase = new SignUpUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(user)

    return res.status(201).json(result)
  }
}
