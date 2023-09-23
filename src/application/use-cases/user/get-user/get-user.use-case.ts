import { AuthenticationService } from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import { UserMapper } from '@/domain/mappers/user.mapper'
import e from 'express'

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string) {
    const user = await this.userRepository.findByCognitoId(id)

    if (!user) {
      throw new AppError(`User with cognitoId ${id} not found`, 404, true)
    }

    return UserMapper.toDto(user)
  }
}
