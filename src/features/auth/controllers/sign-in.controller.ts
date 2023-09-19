import { Request, Response } from 'express'
import { CreateUserDto } from '@/features/auth/dtos/create-user.dto'
import { SignInUseCase } from '@/features/auth/use-cases/sign-in.use-case'

export class SignInController {
  async handle(req: Request, res: Response) {
    const user: CreateUserDto = req.body

    const useCase = new SignInUseCase()

    const result = await useCase.execute(user)

    return res.status(200).json(result)
  }
}
