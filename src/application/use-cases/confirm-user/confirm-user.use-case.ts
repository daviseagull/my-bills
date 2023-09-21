import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'
import { AppError } from '@/core/domain/error/app-error'

export interface ConfirmUserRequest {
  username: string
  code: string
}

export class ConfirmUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmUserRequest): Promise<void> {
    const user = await this.userRepository.findByUsername(request.username)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.username}`,
        404,
        false
      )
    }
    
    await this.authService.confirmUser(request.username, request.code)
  }
}
