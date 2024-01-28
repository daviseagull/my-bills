import { ITransactionRepository } from '@/application/repositories/transaction.repository'
import { TransactionMapper } from '@/domain/mappers/transaction.mapper'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ) {}

  public async execute(cognitoId: string, transactionId: string) {
    logger.info(
      `Getting transaction with id ${transactionId} for user ${cognitoId}`
    )

    const transaction = await this.transactionRepository.findByUserAndId(
      cognitoId,
      transactionId
    )

    if (!transaction) {
      return null
    }

    return TransactionMapper.toDto(transaction!)
  }
}
