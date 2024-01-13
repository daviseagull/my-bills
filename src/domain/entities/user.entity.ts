import { Entity } from '@/domain/abstracts/entity'
import { Email } from '../value-objects/email'
import { FiscalDocument } from '../value-objects/fiscal-document'
import { Name } from '../value-objects/name'
import { Phone } from '../value-objects/phone'

type UserProps = {
  email: Email
  name: Name
  birthday: Date
  fiscalDocument: FiscalDocument
  gender: string
  phone: Phone
  cognitoId?: string
  confirmed: boolean
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id)
  }
}
