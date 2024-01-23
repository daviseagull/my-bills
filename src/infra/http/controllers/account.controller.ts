import {
  CreateAccountRequest,
  CreateAccountUseCase
} from 'application/use-cases/account/create-account.use-case'
import { GetAccountUseCase } from 'application/use-cases/account/get-account.use-case'
import { GetAccountsUseCase } from 'application/use-cases/account/get-accounts.use-case'
import { Request, Response } from 'express'
import { container, injectable } from 'tsyringe'

@injectable()
export class AccountController {
  async create(req: Request, res: Response) {
    const request: CreateAccountRequest = req.body

    const useCase = container.resolve(CreateAccountUseCase)

    const result = await useCase.execute(request, req.user!)

    return res.status(201).json({ id: result })
  }

  async edit(req: Request, res: Response) {}

  async disable(req: Request, res: Response) {}

  async getAccount(req: Request, res: Response) {
    const useCase = container.resolve(GetAccountUseCase)

    const result = await useCase.execute(req.user!, req.params.id)

    return res.status(200).json(result)
  }

  async getAccounts(req: Request, res: Response) {
    const useCase = container.resolve(GetAccountsUseCase)

    const result = await useCase.execute(req.user!)

    return res.status(200).json(result)
  }
}
