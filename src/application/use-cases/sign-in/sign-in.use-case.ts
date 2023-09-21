import { UserRepository } from '@/application/repositories/user.repository'
import {
  AuthenticationResult,
  AuthenticationService
} from '@/core/domain/authentication/authentication.service'
import { AppError } from '@/core/domain/error/app-error'

export interface SignInRequest {
  username: string
  password: string
}

export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: SignInRequest): Promise<AuthenticationResult> {
    const user = this.userRepository.findByUsername(request.username)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.username}`,
        404,
        false
      )
    }

    return await this.authService.signIn(request.username, request.password)
  }
}
