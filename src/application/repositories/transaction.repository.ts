import { Transaction } from '@/domain/entities/transaction.entity'

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<string>
  delete(id: string): Promise<void>
  update(transaction: Transaction): Promise<string>
  findByUserAndId(cognitoId: string, id: string): Promise<Transaction | null>
  findAllByUserAndAccountOrCard(
    cognitoId: string,
    account?: string,
    card?: string
  ): Promise<Transaction[]>
}
