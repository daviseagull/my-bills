import { Request, Response } from 'express'
import {
  ConfirmUserRequest,
  ConfirmUserUseCase
} from '@/application/use-cases/confirm-user/confirm-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import {
  ResendCodeRequest,
  ResendCodeUseCase
} from '@/application/use-cases/resend-code/resend-code.use-case'
import {
  SignInRequest,
  SignInUseCase
} from '@/application/use-cases/sign-in/sign-in.use-case'
import {
  SignUpRequest,
  SignUpUseCase
} from '@/application/use-cases/sign-up/sign-up.use-case'

export class AuthController {
  async confirmUser(req: Request, res: Response) {
    const confirmationDto: ConfirmUserRequest = req.body

    const useCase = new ConfirmUserUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(confirmationDto)

    return res.status(204).json(result)
  }

  async resendCode(req: Request, res: Response) {
    const body: ResendCodeRequest = req.body

    const useCase = new ResendCodeUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(body)

    return res.status(200).json(result)
  }

  async signIn(req: Request, res: Response) {
    const user: SignInRequest = req.body

    const useCase = new SignInUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(user)

    return res.status(200).json(result)
  }

  async signUp(req: Request, res: Response) {
    const user: SignUpRequest = req.body

    const useCase = new SignUpUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(user)

    return res.status(201).json(result)
  }
}
