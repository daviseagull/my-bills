import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email'
import { Name } from '@/domain/value-objects/name'
import { Phone } from '@/domain/value-objects/phone'
import { User as RawUser } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create(
      {
        email: Email.create(raw.email),
        birthday: new Date(raw.birthday),
        phone: Phone.create('+1', 444, 12345566),
        name: Name.create(raw.firstName, raw.lastName),
        confirmed: raw.confirmed,
        cognitoId: raw.cognitoId
      },
      raw.id,
      raw.createdAt,
      raw.updatedAt
    )

    return user
  }

  static toPersistence(user: User): RawUser {
    return {
      id: user.id!,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
      email: user.props.email.props.value,
      birthday: new Date(user.props.birthday),
      phoneId: '',
      firstName: user.props.name.props.first,
      lastName: user.props.name.props.last,
      confirmed: user.props.confirmed,
      cognitoId: user.props.cognitoId!
    }
  }
}
