import { AuthenticationService } from '@/application/authentication/authentication.service'

export class SignOutUseCase {
  constructor(private authService: AuthenticationService) {}

  public async execute(token: string) {
    await this.authService.signOut(token)
  }
}
