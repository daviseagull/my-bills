import { Entity } from '@/domain/abstracts/entity'
import { Name } from '../value-objects/name'
import { Email } from '../value-objects/email'
import { FiscalDocument } from '../value-objects/fiscal-document'

type UserProps = {
  email: Email
  name: Name
  birthday: Date
  fiscalDocument: FiscalDocument
  gender: string
  phone: string
  cognitoId?: string
  confirmed: boolean
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id)
  }
}
