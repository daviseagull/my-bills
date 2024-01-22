import { Entity } from '../abstracts/entity'
import { AccountTypeEnum } from '../enums/account-type.enum'
import { Color } from '../value-objects/color'
import { Description } from '../value-objects/description'

type AccountProps = {
  type: AccountTypeEnum
  user: string
  description: Description
  balance: number
  color: Color
}

export class Account extends Entity<AccountProps> {
  private constructor(
    props: AccountProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  static create(
    props: AccountProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new Account(props, id, createdAt, updatedAt)
  }
}
