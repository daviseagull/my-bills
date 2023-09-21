import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { PasswordUtils } from '@/application/utils/password.utils'

export interface ConfirmForgotPasswordRequest {
  email: string
  code: string
  password: string
}

export class ConfirmForgotPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmForgotPasswordRequest): Promise<void> {
    PasswordUtils.validatePassword(request.password)
    
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.email}`,
        404,
        false
      )
    }

    await this.authService.confirmResetPassword(
      request.email,
      request.code,
      request.password
    )
  }
}
