import { Request, Response } from 'express'
import {
  ConfirmUserRequest,
  ConfirmUserUseCase
} from '@/application/use-cases/confirm-user/confirm-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'

export class ConfirmUserController {
  async handle(req: Request, res: Response) {
    const confirmationDto: ConfirmUserRequest = req.body

    const useCase = new ConfirmUserUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(confirmationDto)

    return res.status(204).json(result)
  }
}
