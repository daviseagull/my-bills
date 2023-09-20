import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'

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
      throw new Error('')
    }

    await this.authService.resendConfirmationCode(request.username)
  }
}
