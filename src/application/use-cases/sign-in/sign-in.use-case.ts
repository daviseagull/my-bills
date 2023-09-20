import { UserRepository } from '@/application/repositories/user.repository'
import {
  AuthenticationResult,
  AuthenticationService
} from '@/core/domain/authentication/authentication.service'

export interface SignInRequest {
  username: string
  password: string
}

export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(
    signInRequest: SignInRequest
  ): Promise<AuthenticationResult> {
    const user = this.userRepository.findByUsername(signInRequest.username)

    if (!user) {
      throw new Error('')
    }

    return await this.authService.signIn(
      signInRequest.username,
      signInRequest.password
    )
  }
}
