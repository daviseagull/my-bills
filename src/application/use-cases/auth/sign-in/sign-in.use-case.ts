import {
  AuthenticationResult,
  IAuthenticationService
} from '@/application/authentication/authentication.service'
import { NotFoundError } from '@/application/errors/app-error'
import { IUserRepository } from '@/application/repositories/user.repository'
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
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AuthService') private authService: IAuthenticationService
  ) {}

  public async execute(request: SignInRequest): Promise<AuthenticationResult> {
    logger.info(`Trying to log in user ${request.email}`)
    PasswordUtils.validatePassword(request.password)

    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    return this.authService.signIn(request.email, request.password)
  }
}
