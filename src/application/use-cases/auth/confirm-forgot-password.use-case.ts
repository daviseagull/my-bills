import { NotFoundError } from '@/application/errors/app-error'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import { PasswordUtils } from '@/application/utils/password.utils'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type ConfirmForgotPasswordRequest = {
  email: string
  code: string
  password: string
}

@injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AuthService') private authService: IAuthenticationService
  ) {}

  public async execute(request: ConfirmForgotPasswordRequest): Promise<void> {
    logger.info(`Confirming password reset for user ${request.email}`)
    PasswordUtils.validatePassword(request.password)

    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    await this.authService.confirmResetPassword(
      request.email,
      request.code,
      request.password
    )
  }
}
