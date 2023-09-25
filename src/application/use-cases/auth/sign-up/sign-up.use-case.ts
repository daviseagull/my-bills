import { AuthenticationService } from '@/application/authentication/authentication.service'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'
import { CreateUserUseCase } from '../../user/create-user/create-user.use-case'

export interface NameRequest {
  first: string
  last: string
}

export interface SignUpRequest {
  password: string
  email: string
  fiscalDocument: string
  name: NameRequest
  birthday: Date
  gender: string
  phone: string
}

@injectable()
export class SignUpUseCase {
  constructor(
    @inject('AuthService') private authService: AuthenticationService,
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase
  ) {}

  public async execute(request: SignUpRequest): Promise<string> {
    logger.info(`Signing up user with email ${request.email}`)

    const cognitoId = await this.authService.signUp(request)
    logger.info(`User ${request.email} created in IAM with id ${cognitoId}`)

    const user = await this.createUserUseCase.execute(request, cognitoId)

    logger.info(`User ${request.email} created in database with id ${user.id}`)
    return user.id!
  }
}
