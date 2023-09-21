import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'
import { AppError } from '@/core/domain/error/app-error'

export interface ResendCodeRequest {
  username: string
}

export class ResendCodeUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: ResendCodeRequest): Promise<void> {
    const user = await this.userRepository.findByUsername(request.username)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.username}`,
        404,
        false
      )
    }

    await this.authService.resendConfirmationCode(request.username)
  }
}
