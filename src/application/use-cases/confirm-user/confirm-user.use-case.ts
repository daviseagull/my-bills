import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/infra/authentication/utils/cognito.utils'

export interface ConfirmUserRequest {
  username: string
  code: string
}

export class ConfirmUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmUserRequest): Promise<void> {
    // const user = await this.userRepository.findByUsername(request.username)

    // if (!user) {
    //   throw new Error('')
    // }

    await this.authService.confirmUser(request.username, request.code)
  }
}
