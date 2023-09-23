import { Request, Response } from 'express'

import {
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordUseCase
} from '@/application/use-cases/auth/confirm-forgot-password/confirm-forgot-password.use-case'
import {
  ConfirmUserRequest,
  ConfirmUserUseCase
} from '@/application/use-cases/auth/confirm-user/confirm-user.use-case'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import {
  ResendCodeRequest,
  ResendCodeUseCase
} from '@/application/use-cases/auth/resend-code/resend-code.use-case'
import {
  SignInRequest,
  SignInUseCase
} from '@/application/use-cases/auth/sign-in/sign-in.use-case'
import {
  SignUpRequest,
  SignUpUseCase
} from '@/application/use-cases/auth/sign-up/sign-up.use-case'
import {
  ForgotPasswordRequest,
  ForgotPasswordUseCase
} from '@/application/use-cases/auth/forgot-password/forgot-password.use-case'
import { SignOutUseCase } from '@/application/use-cases/auth/sign-out/sign-out.use-case'

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

  async signOut(req: Request, res: Response) {
    const useCase = new SignOutUseCase(new CognitoService())

    const result = await useCase.execute(req.token!, req.user!)

    return res.status(204).json(result)
  }

  async forgotPassword(req: Request, res: Response) {
    const user: ForgotPasswordRequest = req.body

    const useCase = new ForgotPasswordUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(user)

    return res.status(204).json(result)
  }

  async confirmForgotPassword(req: Request, res: Response) {
    const user: ConfirmForgotPasswordRequest = req.body

    const useCase = new ConfirmForgotPasswordUseCase(
      new UserPrismaRepository(),
      new CognitoService()
    )

    const result = await useCase.execute(user)

    return res.status(204).json(result)
  }
}
