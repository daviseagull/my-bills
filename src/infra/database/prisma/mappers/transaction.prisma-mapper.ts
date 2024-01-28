import { TransactionUtils } from '@/application/utils/transaction.utils'
import { Transaction } from '@/domain/entities/transaction.entity'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import { Transaction as RawTransaction } from '@prisma/client'

export class TransactionPrismaMapper {
  static toDomain(transaction: RawTransaction): Transaction {
    const account = transaction.account_id
      ? Id.create('Account', transaction.account_id)
      : undefined

    const card = transaction.card_id
      ? Id.create('Card', transaction.card_id)
      : undefined

    return Transaction.create(
      {
        user: Id.create('Cognito', transaction.cognito_id)!,
        account: account,
        card: card,
        type: TransactionUtils.mapTransactionTypeEnum(transaction.type),
        date: transaction.date,
        description: Description.create(transaction.description),
        category: Id.create('Category', transaction.category_id)!,
        payments: transaction.payments!,
        recurrence: transaction.recurrence!,
        value: transaction.value
      },
      Id.create('Transaction', transaction.id),
      transaction.created_at,
      transaction.updated_at
    )
  }

  static toPrisma(transaction: Transaction): RawTransaction {
    const account = transaction.props.account
      ? transaction.props.account.props.value!
      : null

    const card =
      transaction.props.card != undefined
        ? transaction.props.card.props.value!
        : null

    return {
      id: transaction.id!.props.value,
      created_at: transaction.createdAt!,
      updated_at: transaction.updatedAt!,
      cognito_id: transaction.props.user.props.value,
      account_id: account,
      card_id: card,
      type: transaction.props.type,
      date: transaction.props.date,
      description: transaction.props.description.props.value,
      category_id: transaction.props.category.props.value,
      recurrence: transaction.props.recurrence!,
      payments: transaction.props.payments!,
      value: transaction.props.value
    }
  }
}
