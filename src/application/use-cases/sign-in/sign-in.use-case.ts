import {
  AuthenticationResult,
  AuthenticationService
} from '@/core/domain/authentication/authentication.service'

export interface SignInRequest {
  username: string
  password: string
}

export class SignInUseCase {
  constructor(private authService: AuthenticationService) {}

  public async execute(
    signInRequest: SignInRequest
  ): Promise<AuthenticationResult> {
    return await this.authService.signIn(
      signInRequest.username,
      signInRequest.password
    )
  }
}
