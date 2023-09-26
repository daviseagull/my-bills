import { AuthenticationService } from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import { PasswordUtils } from '@/application/utils/password.utils'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface ConfirmForgotPasswordRequest {
  email: string
  code: string
  password: string
}

@injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("AuthService") private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmForgotPasswordRequest): Promise<void> {
    logger.info(`Confirming password reset for user ${request.email}`)
    PasswordUtils.validatePassword(request.password)

    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.email}`,
        404,
        false
      )
    }

    this.authService.confirmResetPassword(
      request.email,
      request.code,
      request.password
    )
  }
}