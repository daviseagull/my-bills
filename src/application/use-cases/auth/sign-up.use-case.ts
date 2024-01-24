import { IAuthenticationService } from '@/application/services/authentication.service'
import { PasswordUtils } from '@/application/utils/password.utils'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'
import { CreateUserUseCase } from '../user/create-user.use-case'

export type NameRequest = {
  first: string
  last: string
}

export type PhoneRequest = {
  country: string
  areaCode: number
  number: number
}

export type SignUpRequest = {
  password: string
  email: string
  name: NameRequest
  birthday: Date
  phone: PhoneRequest
}

export type SignUpResponse = {
  id: string
}

@injectable()
export class SignUpUseCase {
  constructor(
    @inject('AuthService') private authService: IAuthenticationService,
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase
  ) {}

  public async execute(request: SignUpRequest): Promise<SignUpResponse> {
    logger.info(`Signing up user with email ${request.email}`)

    PasswordUtils.validatePassword(request.password)

    const cognitoId = await this.authService.signUp(request)
    logger.info(`User ${request.email} created in IAM with id ${cognitoId}`)

    const user = await this.createUserUseCase.execute(request, cognitoId)

    logger.info(`User ${request.email} created in database with id ${user.id}`)
    return {
      id: user.id!
    }
  }
}
