import {
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordUseCase
} from '@/application/use-cases/auth/confirm-forgot-password/confirm-forgot-password.use-case'
import {
  ConfirmUserRequest,
  ConfirmUserUseCase
} from '@/application/use-cases/auth/confirm-user/confirm-user.use-case'
import {
  ForgotPasswordRequest,
  ForgotPasswordUseCase
} from '@/application/use-cases/auth/forgot-password/forgot-password.use-case'
import {
  ResendCodeRequest,
  ResendCodeUseCase
} from '@/application/use-cases/auth/resend-code/resend-code.use-case'
import {
  SignInRequest,
  SignInUseCase
} from '@/application/use-cases/auth/sign-in/sign-in.use-case'
import { SignOutUseCase } from '@/application/use-cases/auth/sign-out/sign-out.use-case'
import {
  SignUpRequest,
  SignUpUseCase
} from '@/application/use-cases/auth/sign-up/sign-up.use-case'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class AuthController {
  async confirmUser(req: Request, res: Response) {
    const confirmationDto: ConfirmUserRequest = req.body

    const useCase = container.resolve(ConfirmUserUseCase)

    const result = await useCase.execute(confirmationDto)

    return res.status(204).json(result)
  }

  async resendCode(req: Request, res: Response) {
    const body: ResendCodeRequest = req.body

    const useCase = container.resolve(ResendCodeUseCase)

    const result = await useCase.execute(body)

    return res.status(200).json(result)
  }

  async signIn(req: Request, res: Response) {
    const user: SignInRequest = req.body

    const useCase = container.resolve(SignInUseCase)

    const result = await useCase.execute(user)

    return res.status(200).json(result)
  }

  async signUp(req: Request, res: Response) {
    const user: SignUpRequest = req.body

    const useCase = container.resolve(SignUpUseCase)

    const result = await useCase.execute(user)

    return res.status(201).json(result)
  }

  async signOut(req: Request, res: Response) {
    const useCase = container.resolve(SignOutUseCase)

    const result = await useCase.execute(req.token!, req.user!)

    return res.status(204).json(result)
  }

  async forgotPassword(req: Request, res: Response) {
    const user: ForgotPasswordRequest = req.body

    const useCase = container.resolve(ForgotPasswordUseCase)
    const result = await useCase.execute(user)

    return res.status(204).json(result)
  }

  async confirmForgotPassword(req: Request, res: Response) {
    const user: ConfirmForgotPasswordRequest = req.body

    const useCase = container.resolve(ConfirmForgotPasswordUseCase)

    const result = await useCase.execute(user)

    return res.status(204).json(result)
  }
}
