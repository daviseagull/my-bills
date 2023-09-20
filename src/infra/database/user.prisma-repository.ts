import { UserRepository } from '@/application/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { Prisma, PrismaClient } from '@prisma/client'
import { UserMapper } from './prisma/mappers/user.mapper'
import logger from '../logger/logger'

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

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return UserMapper.toDomain(user!)
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })
    
    return UserMapper.toDomain(user!)
  }
}
