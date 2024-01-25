import { Entity } from '../abstracts/entity'
import { Email } from '../value-objects/email'
import { Id } from '../value-objects/id'
import { Name } from '../value-objects/name'
import { Phone } from '../value-objects/phone'

type UserProps = {
  email: Email
  name: Name
  birthday: Date
  phone: Phone
  cognitoId: Id
  confirmed: boolean
}

export class User extends Entity<UserProps> {
  private constructor(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new User(props, id, createdAt, updatedAt)
  }
}
