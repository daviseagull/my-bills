import { Entity } from '../abstracts/entity'
import { AccountTypeEnum } from '../enums/account-type.enum'
import { Color } from '../value-objects/color'
import { Description } from '../value-objects/description'
import { Id } from '../value-objects/id'

type AccountProps = {
  type: AccountTypeEnum
  user: Id
  description: Description
  balance: number
  color: Color
}

export class Account extends Entity<AccountProps> {
  private constructor(
    props: AccountProps,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: AccountProps,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new Account(props, id, createdAt, updatedAt)
  }
}
