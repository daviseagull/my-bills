import { ITransactionRepository } from '@/application/repositories/transaction.repository'
import { TransactionUtils } from '@/application/utils/transaction.utils'
import { Transaction } from '@/domain/entities/transaction.entity'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type CreateTransactionRequest = {
  card?: string
  account?: string
  type: string
  date: Date
  description: string
  category: string
  recurrence?: boolean
  payments?: number
  value: number
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ) {}

  public async execute(
    request: CreateTransactionRequest,
    cognitoId: string
  ): Promise<string> {
    logger.info(`Creating transaction with description ${request.description}`)

    const newTransaction = Transaction.create({
      user: Id.create('Cognito', cognitoId)!,
      account: Id.create('Account', request.account),
      card: Id.create('Card', request.card),
      type: TransactionUtils.mapTransactionTypeEnum(request.type),
      date: request.date,
      description: Description.create(request.description),
      category: Id.create('Category', request.category)!,
      payments: request.payments,
      recurrence: request.recurrence,
      value: request.value
    })

    return await this.transactionRepository.create(newTransaction)
  }
}
