import { AuthenticationService } from '@/application/authentication/authentication.service'
import { NotFoundError } from '@/application/errors/app-error'
import { UserRepository } from '@/application/repositories/user.repository'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export interface ConfirmUserRequest {
  email: string
  code: string
}

@injectable()
export class ConfirmUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('AuthService') private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmUserRequest): Promise<void> {
    logger.info(`Confirming user ${request.email} sign up`)
    const user = this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    this.authService.confirmUser(request.email, request.code)
  }
}
