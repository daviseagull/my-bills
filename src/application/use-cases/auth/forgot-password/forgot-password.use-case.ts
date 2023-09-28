import { AuthenticationService } from '@/application/authentication/authentication.service'
import { NotFoundError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface ForgotPasswordRequest {
  email: string
}

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('AuthService') private authService: AuthenticationService
  ) {}

  public async execute(request: ForgotPasswordRequest): Promise<void> {
    logger.info(`Resetting password for user ${request.email}`)
    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    this.authService.forgotPassword(request.email)
  }
}
