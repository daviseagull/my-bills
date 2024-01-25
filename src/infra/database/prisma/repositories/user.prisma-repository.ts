import { IUserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { UserPrismaMapper } from '../mappers/user.prisma-mapper'
import prisma from '../prisma-client'

export class UserPrismaRepository implements IUserRepository {
  constructor() {}

  async confirmUser(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        confirmed: true
      }
    })
  }

  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        email: user.props.email.props.value,
        birthday: new Date(user.props.birthday),
        first_name: user.props.name.props.first,
        last_name: user.props.name.props.last,
        confirmed: user.props.confirmed,
        cognito_id: user.props.cognitoId!,
        phone: {
          create: {
            country: user.props.phone.props.country,
            area_code: user.props.phone.props.areaCode,
            number: user.props.phone.props.number
          }
        }
      }
    })

    return UserPrismaMapper.toDomain(createdUser)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user!)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user!)
  }

  async findByCognitoId(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        cognito_id: id
      }
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user!)
  }
}
