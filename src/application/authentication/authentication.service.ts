import { SignUpRequest } from '@/application/use-cases/sign-up/sign-up.use-case'

export interface AuthenticationResult {
  status: string
  type: string
  accessToken: string
}

export interface AuthenticationService {
  signIn(email: string, password: string): Promise<AuthenticationResult>

  signUp(user: SignUpRequest): Promise<string>

  confirmUser(email: string, code: string): Promise<void>

  resendConfirmationCode(email: string): Promise<void>

  forgotPassword(email: string): Promise<void>

  confirmResetPassword(
    email: string,
    code: string,
    password: string
  ): Promise<void>

  signOut(token: string): Promise<void>
}
