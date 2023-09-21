import { UserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { PrismaClient } from '@prisma/client'
import { UserMapper } from './prisma/mappers/user.mapper'
import { AppError } from '@/core/domain/error/app-error'

export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        username: user.props.username,
        email: user.props.email,
        birthday: new Date(user.props.birthday),
        gender: user.props.gender,
        phone: user.props.phone,
        name: user.props.name,
        confirmed: user.props.confirmed,
        cognitoId: user.props.cognitoId
      }
    })
    return UserMapper.toDomain(createdUser)
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

    return UserMapper.toDomain(user!)
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user!)
  }
}
