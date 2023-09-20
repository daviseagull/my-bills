import { SignInRequest, SignInUseCase } from '@/application/use-cases/sign-in/sign-in.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { Request, Response } from 'express'

export class SignInController {
  async handle(req: Request, res: Response) {
    const user: SignInRequest = req.body

    const useCase = new SignInUseCase(new CognitoService())

    const result = await useCase.execute(user)

    return res.status(200).json(result)
  }
}
