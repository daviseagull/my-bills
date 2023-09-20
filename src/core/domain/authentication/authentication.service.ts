import { SignUpRequest } from '@/application/use-cases/sign-up/sign-up.use-case'

export interface AuthenticationResult {
  status: string
  type: string
  accessToken: string
}

export interface CognitoUser {
  id: string
}

export interface AuthenticationService {
  signIn(username: string, password: string): Promise<AuthenticationResult>

  signUp(user: SignUpRequest): Promise<CognitoUser>

  confirmUser(username: string, code: string): Promise<void>

  resendConfirmationCode(username: string): Promise<void>
}
