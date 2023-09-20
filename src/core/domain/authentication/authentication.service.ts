import { SignUpRequest } from '@/application/use-cases/sign-up/sign-up.use-case'

export interface AuthenticationResult {
  status: string
  type: string
  accessToken: string
}

export interface AuthenticationService {
  signIn(username: string, password: string): Promise<AuthenticationResult>

  signUp(user: SignUpRequest): Promise<void>

  confirmUser(username: string, code: string): Promise<void>
}
