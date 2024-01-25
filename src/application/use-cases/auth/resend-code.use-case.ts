import { BadRequestError, NotFoundError } from '@/application/errors/app-error'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type ResendCodeRequest = {
  email: string
}

@injectable()
export class ResendCodeUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('AuthService') private authService: IAuthenticationService
  ) {}

  public async execute(request: ResendCodeRequest): Promise<void> {
    logger.info(`Resend confirmation code for user ${request.email}`)
    const user = await this.userRepository.findByEmail(request.email)

    if (!user) {
      throw new NotFoundError(
        `Couldn't find user in the database ${request.email}`
      )
    }

    if (user.props.confirmed) {
      throw new BadRequestError('User already confirmed')
    }

    await this.authService.resendConfirmationCode(request.email)
  }
}
