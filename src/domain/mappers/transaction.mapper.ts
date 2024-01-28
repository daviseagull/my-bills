import { TransactionDto } from '../dtos/transaction.dto'
import { Transaction } from '../entities/transaction.entity'

export class TransactionMapper {
  static toDto(transaction: Transaction): TransactionDto {
    const account = transaction.props.account
      ? transaction.props.account.props.value
      : undefined

    const card = transaction.props.card
      ? transaction.props.card.props.value
      : undefined
    return {
      id: transaction.id!.props.value,
      createdAt: transaction.createdAt!.toISOString(),
      updatedAt: transaction.updatedAt!.toISOString(),
      user: transaction.props.user.props.value,
      account: account,
      card: card,
      date: transaction.props.date.toISOString(),
      description: transaction.props.description.props.value,
      type: transaction.props.type.toString(),
      category: transaction.props.category.props.value,
      value: transaction.props.value
    }
  }

  static toDtos(transactions: Transaction[]): TransactionDto[] {
    return transactions.map((transaction: Transaction) => {
      return this.toDto(transaction)
    })
  }
}
