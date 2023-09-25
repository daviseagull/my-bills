import {
  AuthenticationResult,
  AuthenticationService
} from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import { PasswordUtils } from '@/application/utils/password.utils'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface SignInRequest {
  email: string
  password: string
}

@injectable()
export class SignInUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('AuthService') private authService: AuthenticationService
  ) {}

  public async execute(request: SignInRequest): Promise<AuthenticationResult> {
    logger.info(`Trying to log in user ${request.email}`)
    PasswordUtils.validatePassword(request.password)

    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.email}`,
        404,
        false
      )
    }

    return this.authService.signIn(request.email, request.password)
  }
}
