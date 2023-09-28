import { IAuthenticationService } from '@/application/authentication/authentication.service'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class SignOutUseCase {
  constructor(
    @inject('AuthService') private authService: IAuthenticationService
  ) {}

  public async execute(token: string, user: string) {
    logger.info(`Signing out user ${user}`)
    await this.authService.signOut(token)
  }
}
