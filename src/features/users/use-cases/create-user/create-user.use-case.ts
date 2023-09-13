import { prisma } from '@/prisma/client'
import { User } from '@prisma/client'
import { AppError } from '@/errors/app-error'
import logger from '@/logger'
import { CreateUserDto } from '@/features/users/dtos/create-user.dto'

export class CreateUserUseCase {
  async execute(userDto: CreateUserDto): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: {
        email: userDto.email
      }
    })

    if (userExists) {
      logger.warn(`Couldn't create user. User already exists ${userDto.email}`)
      throw new AppError('User already exists!')
    }

    const name = {
      first: userDto.firstName,
      last: userDto.lastName,
      fullName: `${userDto.firstName} ${userDto.lastName}`
    }

    return prisma.user.create({
      data: {
        email: userDto.email,
        name
      }
    })
  }
}
