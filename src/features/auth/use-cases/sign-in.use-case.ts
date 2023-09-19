import { LogInDto } from '@/features/auth/dtos/log-in.dto'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/utils/cognito.utils'
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider'

export class SignInUseCase {
  constructor() {}

  public async execute(logInDto: LogInDto): Promise<AuthenticationResultType> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: cognitoClientId(),
      AuthParameters: {
        USERNAME: logInDto.username,
        PASSWORD: logInDto.password,
        SECRET_HASH: hashCognitoSecret(logInDto.username)
      }
    }

    const data = await cognitoServiceProvider().initiateAuth(params)

    return data.AuthenticationResult!
  }
}
