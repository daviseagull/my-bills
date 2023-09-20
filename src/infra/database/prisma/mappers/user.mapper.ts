import { User } from '@/domain/entities/user.entity'
import logger from '@/infra/logger/logger'
import { Prisma, User as RawUser } from '@prisma/client'

export class UserMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create(
      {
        username: raw.username,
        email: raw.email,
        birthday: new Date(raw.birthday),
        gender: raw.gender,
        phone: raw.phone,
        name: raw.name,
        confirmed: false,
        cognitoId: raw.cognitoId
      },
      raw.id
    )

    return user
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      username: user.props.username,
      email: user.props.email,
      birthday: new Date(user.props.birthday),
      gender: user.props.gender,
      phone: user.props.phone,
      name: user.props.name,
      confirmed: user.props.confirmed,
      cognitoId: user.props.cognitoId
    }
  }
}
