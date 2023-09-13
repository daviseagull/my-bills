import { Request, Response } from 'express'
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user/create-user.use-case'
import { CreateUserDto } from '@/modules/users/dtos/create-user.dto'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const user: CreateUserDto = req.body

    const useCase = new CreateUserUseCase()

    const result = await useCase.execute(user)

    return res.status(201).json(result)
  }
}
