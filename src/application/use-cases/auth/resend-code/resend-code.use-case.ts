import { AuthenticationService } from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface ResendCodeRequest {
  email: string
}

@injectable()
export class ResendCodeUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('AuthService') private authService: AuthenticationService
  ) {}

  public async execute(request: ResendCodeRequest): Promise<void> {
    logger.info(`Resend confirmation code for user ${request.email}`)
    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.email}`,
        404,
        false
      )
    }

    await this.authService.resendConfirmationCode(request.email)
  }
}
