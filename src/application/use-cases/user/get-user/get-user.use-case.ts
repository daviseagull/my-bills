import { AppError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import { UserDto } from '@/domain/dtos/user.dto'
import { UserMapper } from '@/domain/mappers/user.mapper'
import { autoInjectable, inject } from 'tsyringe'

@autoInjectable()
export class GetUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  public async execute(id: string): Promise<UserDto> {
    const user = await this.userRepository.findByCognitoId(id)

    if (!user) {
      throw new AppError(`User with cognitoId ${id} not found`, 404, true)
    }

    return UserMapper.toDto(user)
  }
}
