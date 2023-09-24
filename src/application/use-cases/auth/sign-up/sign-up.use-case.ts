import { AuthenticationService } from '@/application/authentication/authentication.service'
import logger from '@/infra/logger/logger'
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

export class SignUpUseCase {
  constructor(
    private authService: AuthenticationService,
    private createUserUseCase: CreateUserUseCase
  ) {}

  public async execute(request: SignUpRequest): Promise<string> {
    logger.info(`Tying to sign up user with email ${request.email}`)
    
    const cognitoId = await this.authService.signUp(request)
    
    const user = await this.createUserUseCase.execute(request, cognitoId)
    return user.id!
  }
}
