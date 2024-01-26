import { Entity } from '../abstracts/entity'
import { TransactionTypeEnum } from '../enums/transaction-type.enum'
import { Description } from '../value-objects/description'
import { Id } from '../value-objects/id'

type TransactionProps = {
  user: Id
  account?: Id
  card?: Id
  date: Date
  description: Description
  type: TransactionTypeEnum
  category: Id
  recurrence?: boolean
  payments?: number
  value: number
}

export class Transaction extends Entity<TransactionProps> {
  private constructor(
    props: TransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: TransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    props.payments = props.payments ?? 1
    props.recurrence = props.recurrence ?? false

    return new Transaction(props, id, createdAt, updatedAt)
  }
}
