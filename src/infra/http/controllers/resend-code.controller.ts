import { Request, Response } from 'express'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import {
  ResendCodeRequest,
  ResendCodeUseCase
} from '@/application/use-cases/resend-code/resend-code.use-case'

export class ResendCodeController {
  async handle(req: Request, res: Response) {
    const body: ResendCodeRequest = req.body

    const useCase = new ResendCodeUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(body)

    return res.status(200).json(result)
  }
}
