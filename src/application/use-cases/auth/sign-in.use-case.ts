import { NotFoundError } from 'application/errors/app-error'
import { IUserRepository } from 'application/repositories/user.repository'
import {
  AuthenticationResult,
  IAuthenticationService
} from 'application/services/authentication.service'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type SignInRequest = {
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

    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    return await this.authService.signIn(request.email, request.password)
  }
}
