import {
  CreateTransactionRequest,
  CreateTransactionUseCase
} from '@/application/use-cases/transaction/create-transaction.use-case'
import { GetTransactionUseCase } from '@/application/use-cases/transaction/get-transaction.use-case'
import {
  GetTransactionsRequest,
  GetTransactionsUseCase
} from '@/application/use-cases/transaction/get-transactions.use-case'
import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'

@injectable()
export class TransactionController {
  async create(req: Request, res: Response) {
    const request: CreateTransactionRequest = req.body

    const useCase = container.resolve(CreateTransactionUseCase)

    const result = await useCase.execute(request, req.user!)

    return res.status(201).json({ id: result })
  }

  async edit(req: Request, res: Response) {}

  async disable(req: Request, res: Response) {}

  async getTransaction(req: Request, res: Response) {
    const useCase = container.resolve(GetTransactionUseCase)

    const result = await useCase.execute(req.user!, req.params.id)

    return res.status(200).json(result)
  }

  async getTransactions(req: Request, res: Response) {
    const request: GetTransactionsRequest = {
      user: req.user!,
      card: req.query.card as string,
      account: req.query.account as string
    }

    const useCase = container.resolve(GetTransactionsUseCase)

    const result = await useCase.execute(request)

    return res.status(200).json(result)
  }
}
