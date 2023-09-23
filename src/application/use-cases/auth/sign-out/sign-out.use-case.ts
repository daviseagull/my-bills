import { AuthenticationService } from '@/application/authentication/authentication.service'
import logger from '@/infra/logger/logger'

export class SignOutUseCase {
  constructor(private authService: AuthenticationService) {}

  public async execute(token: string, user: string) {
    logger.info(`Signing out user ${user}`)
    await this.authService.signOut(token)
  }
}
