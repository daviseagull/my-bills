import { Id } from 'domain/value-objects/id'
import { Entity } from '../abstracts/entity'
import { TransacationTypeEnum } from '../enums/transaction-type.enum'
import { Description } from '../value-objects/description'

type AccountTransactionProps = {
  account: Id
  date: Date
  description: Description
  type: TransacationTypeEnum
  category: Id
  value: number
}

export class AccountTransaction extends Entity<AccountTransactionProps> {
  private constructor(
    props: AccountTransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: AccountTransactionProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new AccountTransaction(props, id, createdAt, updatedAt)
  }
}
