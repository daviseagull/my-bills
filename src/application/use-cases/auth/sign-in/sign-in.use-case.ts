import { UserRepository } from '@/application/repositories/user.repository'
import {
  AuthenticationResult,
  AuthenticationService
} from '@/application/authentication/authentication.service'
import { AppError } from '@/application/errors/app-error'
import { PasswordUtils } from '@/application/utils/password.utils'

export interface SignInRequest {
  email: string
  password: string
}

export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: SignInRequest): Promise<AuthenticationResult> {
    PasswordUtils.validatePassword(request.password)

    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.email}`,
        404,
        false
      )
    }

    return await this.authService.signIn(request.email, request.password)
  }
}