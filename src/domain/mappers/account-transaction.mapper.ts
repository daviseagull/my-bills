import { AccountTransactionDto } from '../dtos/account-transaction.dto'
import { AccountTransaction } from '../entities/account-transaction.entity'

export class AccountTransactionMapper {
  static toDto(transactions: AccountTransaction[]): AccountTransactionDto[] {
    return transactions.map((transaction: AccountTransaction) => {
      return {
        id: transaction.id!,
        createdAt: transaction.createdAt!.toISOString(),
        updatedAt: transaction.updatedAt!.toISOString(),
        account: transaction.props.account,
        date: transaction.props.date.toISOString(),
        description: transaction.props.description.props.value,
        type: transaction.props.type.toString(),
        category: transaction.props.category,
        value: transaction.props.value
      }
    })
  }
}
