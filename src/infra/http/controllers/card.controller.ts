import {
  CreateCardRequest,
  CreateCardUseCase
} from 'application/use-cases/card/create-card.use-case'
import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'

@injectable()
export class CardController {
  async create(req: Request, res: Response) {
    const request: CreateCardRequest = req.body

    const useCase = container.resolve(CreateCardUseCase)

    const result = await useCase.execute(request, req.user!)

    return res.status(201).json({ id: result })
  }

  async edit(req: Request, res: Response) {}

  async disable(req: Request, res: Response) {}

  async getAccount(req: Request, res: Response) {}

  async getAccounts(req: Request, res: Response) {}
}
