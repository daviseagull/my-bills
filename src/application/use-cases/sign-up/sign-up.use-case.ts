import { Name } from '@/domain/models/name.model'
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider/dist-types/models/models_0'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/infra/authentication/utils/cognito.utils'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'

export interface SignUpRequest {
  username: string
  password: string
  email: string
  name: Name
  birthdate: Date
  gender: string
  phone: string
}

export class SignUpUseCase {
  constructor(private authService: AuthenticationService) {}

  public async execute(user: SignUpRequest) {
    await this.authService.signUp(user)
  }
}
