import { Entity } from '@/core/domain/entity'
import { Name } from '../models/name.model'

type UserProps = {
  username: string
  email: string
  name: Name
  birthdate: Date
  gender: string
  phone: string
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
