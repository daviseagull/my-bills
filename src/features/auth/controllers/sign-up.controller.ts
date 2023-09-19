import { Request, Response } from 'express'
import { CreateUserDto } from '@/features/auth/dtos/create-user.dto'
import { SignUpUseCase } from '@/features/auth/use-cases/sign-up.use-case'

export class SignUpController {
  async handle(req: Request, res: Response) {
    const user: CreateUserDto = req.body

    const useCase = new SignUpUseCase()

    const result = await useCase.execute(user)

    return res.status(201).json(result)
  }
}
