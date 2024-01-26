import { ITransactionRepository } from '@/application/repositories/transaction.repository'
import { TransactionMapper } from '@/domain/mappers/transaction.mapper'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type GetTransactionsRequest = {
  user: string
  card?: string
  account?: string
}

@injectable()
export class GetTransactionsUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ) {}

  public async execute(request: GetTransactionsRequest) {
    logger.info(
      `Getting transactions for user ${request.user} with filters card '${request.card}' and account '${request.account}'`
    )

    const transactions =
      await this.transactionRepository.findAllByUserAndAccountOrCard(
        request.user,
        request.account,
        request.card
      )

    return TransactionMapper.toDtos(transactions)
  }
}
