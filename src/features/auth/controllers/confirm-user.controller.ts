import { Request, Response } from 'express'
import { ConfirmUserDto } from '@/features/auth/dtos/confirm-user.dto'
import { ConfirmUserUseCase } from '@/features/auth/use-cases/confirm-user.use-case'

export class ConfirmUserController {
  async handle(req: Request, res: Response) {
    const confirmationDto: ConfirmUserDto = req.body

    const useCase = new ConfirmUserUseCase()

    const result = await useCase.execute(confirmationDto)

    return res.status(204).json(result)
  }
}
