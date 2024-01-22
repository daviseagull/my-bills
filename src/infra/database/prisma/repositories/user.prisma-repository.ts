import { IUserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { PrismaClient } from '@prisma/client'
import { UserPrismaMapper } from '../mappers/user.prisma-mapper'

export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async confirmUser(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        confirmed: true
      }
    })
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.props.email.props.value,
        birthday: new Date(user.props.birthday),
        firstName: user.props.name.props.first,
        lastName: user.props.name.props.last,
        confirmed: user.props.confirmed,
        cognitoId: user.props.cognitoId!,
        phone: {
          create: {
            country: user.props.phone.props.country,
            areaCode: user.props.phone.props.areaCode,
            number: user.props.phone.props.number
          }
        }
      }
    })

    return UserPrismaMapper.toDomain(createdUser)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
      where: {
        cognitoId: id
      }
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user!)
  }
}
