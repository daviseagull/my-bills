import { UserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { PrismaClient } from '@prisma/client'
import { UserMapper } from './prisma/mappers/user.mapper'
import { AppError } from '@/application/error/app-error'

export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}
  findByUsername(username: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.props.email.props.value,
        birthday: new Date(user.props.birthday),
        gender: user.props.gender,
        phone: user.props.phone,
        name: user.props.name.props,
        confirmed: user.props.confirmed,
        cognitoId: user.props.cognitoId!
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user!)
  }
}
