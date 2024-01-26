import { InternalServerError } from '@/application/errors/app-error'
import { ITransactionRepository } from '@/application/repositories/transaction.repository'
import { Transaction } from '@/domain/entities/transaction.entity'
import logger from '@/infra/logger/logger'
import { TransactionPrismaMapper } from '../mappers/transaction.prisma-mapper'
import { prisma } from '../prisma-client'

export default class TransactionPrismaRepository
  implements ITransactionRepository
{
  update(transaction: Transaction): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async findByUserAndId(
    cognitoId: string,
    id: string
  ): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        cognito_id: cognitoId,
        id: id
      }
    })

    logger.info(JSON.stringify(transaction))

    return transaction ? TransactionPrismaMapper.toDomain(transaction!) : null
  }

  async findAllByUserAndAccountOrCard(
    cognitoId: string,
    account?: string,
    card?: string
  ): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        cognito_id: cognitoId,
        AND: [
          {
            OR: [{ account_id: account }, { card_id: card }]
          },
          {}
        ]
      }
    })

    return transactions.map((transaction) =>
      TransactionPrismaMapper.toDomain(transaction)
    )
  }

  async create(transaction: Transaction): Promise<string> {
    const prismaTransaction = TransactionPrismaMapper.toPrisma(transaction)

    try {
      const createdTransaction = await prisma.transaction.create({
        data: prismaTransaction
      })

      if (!createdTransaction) {
        throw new InternalServerError(
          `Couldn't create transaction ${transaction.props.description}`
        )
      }

      return createdTransaction.id
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(
          `Unknown error while trying to create a transaction`,
          err.name,
          err.stack
        )
      }

      throw new InternalServerError(
        `Unknown error while trying to create a transaction`
      )
    }
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
