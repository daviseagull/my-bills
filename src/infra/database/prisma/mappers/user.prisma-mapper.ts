import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email'
import { Id } from '@/domain/value-objects/id'
import { Name } from '@/domain/value-objects/name'
import { Phone } from '@/domain/value-objects/phone'
import { User as RawUser } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(raw: RawUser): User {
    return User.create(
      {
        email: Email.create(raw.email),
        birthday: new Date(raw.birthday),
        phone: Phone.create('+1', 444, 12345566),
        name: Name.create(raw.first_name, raw.last_name),
        confirmed: raw.confirmed,
        cognitoId: Id.create('Cognito', raw.cognito_id)!
      },
      Id.create('User', raw.id),
      raw.created_at,
      raw.updated_at
    )
  }

  static toPersistence(user: User): RawUser {
    return {
      id: user.id!.props.value,
      created_at: user.createdAt!,
      updated_at: user.updatedAt!,
      email: user.props.email.props.value,
      birthday: new Date(user.props.birthday),
      phone: {
        area_code: user.props.phone.props.areaCode,
        country: user.props.phone.props.country,
        number: user.props.phone.props.number
      },
      first_name: user.props.name.props.first,
      last_name: user.props.name.props.last,
      confirmed: user.props.confirmed,
      cognito_id: user.props.cognitoId.props.value
    }
  }
}
