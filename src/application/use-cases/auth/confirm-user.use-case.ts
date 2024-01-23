import { NotFoundError } from 'application/errors/app-error'
import { IUserRepository } from 'application/repositories/user.repository'
import { IAuthenticationService } from 'application/services/authentication.service'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type ConfirmUserRequest = {
  email: string
  code: string
}

@injectable()
export class ConfirmUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AuthService') private authService: IAuthenticationService
  ) {}

  public async execute(request: ConfirmUserRequest): Promise<void> {
    logger.info(`Confirming user ${request.email} sign up`)
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    await this.authService.confirmUser(request.email, request.code)

    this.userRepository.confirmUser(user.id!)
  }
}
