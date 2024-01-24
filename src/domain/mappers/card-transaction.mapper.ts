import { CardTransactionDto } from '../dtos/card-transaction.dto'
import { CardTransaction } from '../entities/card-transaction.entity'

export class CardTransactionMapper {
  static toDto(transactions: CardTransaction[]): CardTransactionDto[] {
    return transactions.map((transaction: CardTransaction) => {
      return {
        id: transaction.id!,
        createdAt: transaction.createdAt!.toISOString(),
        updatedAt: transaction.updatedAt!.toISOString(),
        card: transaction.props.card.props.value,
        date: transaction.props.date.toISOString(),
        description: transaction.props.description.props.value,
        type: transaction.props.type.toString(),
        category: transaction.props.category.props.value,
        payments: transaction.props.payments,
        value: transaction.props.value
      }
    })
  }
}
