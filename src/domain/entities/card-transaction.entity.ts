import { Entity } from '../abstracts/entity'
import { TransacationTypeEnum } from '../enums/transaction-type.enum'
import { Description } from '../value-objects/description'
import { Id } from '../value-objects/id'

type CardTransactionProps = {
  card: Id
  date: Date
  description: Description
  type: TransacationTypeEnum
  category: Id
  payments: number
  value: number
}

export class CardTransaction extends Entity<CardTransactionProps> {
  private constructor(
    props: CardTransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: CardTransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new CardTransaction(props, id, createdAt, updatedAt)
  }
}
