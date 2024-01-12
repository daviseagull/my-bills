import { NotFoundError } from '@/application/errors/app-error'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type ForgotPasswordRequest = {
  email: string
}

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AuthService') private authService: IAuthenticationService
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
