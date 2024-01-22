import { NotFoundError } from 'application/errors/app-error'
import { IUserRepository } from 'application/repositories/user.repository'
import { UserDto } from 'domain/dtos/user.dto'
import { UserMapper } from 'domain/mappers/user.mapper'
import { autoInjectable, inject } from 'tsyringe'

@autoInjectable()
export class GetUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute(id: string): Promise<UserDto> {
    const user = await this.userRepository.findByCognitoId(id)

    if (!user) {
      throw new NotFoundError(`User with cognitoId ${id} not found`)
    }

    return UserMapper.toDto(user)
  }
}
