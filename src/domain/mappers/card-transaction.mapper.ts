import { CardTransactionDto } from '../dtos/card-transaction.dto'
import { CardTransaction } from '../entities/card-transaction.entity'

export class CardTransactionMapper {
  static toDto(transactions: CardTransaction[]): CardTransactionDto[] {
    return transactions.map((transaction: CardTransaction) => {
      return {
        id: transaction.id!,
        createdAt: transaction.createdAt!.toISOString(),
        updatedAt: transaction.updatedAt!.toISOString(),
        user: transaction.props.user,
        card: transaction.props.card,
        date: transaction.props.date.toISOString(),
        description: transaction.props.description.props.value,
        type: transaction.props.type.toString(),
        category: transaction.props.category,
        recurrence: transaction.props.recurrence,
        payments: transaction.props.payments,
        value: transaction.props.value
      }
    })
  }
}
