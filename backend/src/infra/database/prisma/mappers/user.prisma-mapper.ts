import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email'
import { FiscalDocument } from '@/domain/value-objects/fiscal-document'
import { Name } from '@/domain/value-objects/name'
import { Prisma, User as RawUser } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create(
      {
        email: Email.create(raw.email),
        fiscalDocument: FiscalDocument.create(raw.fiscalDocument),
        birthday: new Date(raw.birthday),
        gender: raw.gender,
        phone: raw.phone,
        name: Name.create(raw.name.first, raw.name.last),
        confirmed: false,
        cognitoId: raw.cognitoId
      },
      raw.id
    )

    return user
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      email: user.props.email.props.value,
      fiscalDocument: user.props.fiscalDocument.props.value,
      birthday: new Date(user.props.birthday),
      gender: user.props.gender,
      phone: user.props.phone,
      name: user.props.name.props,
      confirmed: user.props.confirmed,
      cognitoId: user.props.cognitoId!
    }
  }
}
