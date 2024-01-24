import {
  CreateCardRequest,
  CreateCardUseCase
} from '@/application/use-cases/card/create-card.use-case'
import { GetCardUseCase } from '@/application/use-cases/card/get-card.use-case'
import { GetCardsUseCase } from '@/application/use-cases/card/get-cards.use-case'
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

  async getCard(req: Request, res: Response) {
    const useCase = container.resolve(GetCardUseCase)

    const result = await useCase.execute(req.user!, req.params.id)

    return res.status(200).json(result)
  }

  async getCards(req: Request, res: Response) {
    const useCase = container.resolve(GetCardsUseCase)

    const result = await useCase.execute(req.user!)

    return res.status(200).json(result)
  }
}
