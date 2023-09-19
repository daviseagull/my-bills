import { LogInDto } from '@/features/auth/dtos/log-in.dto'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/utils/cognito.utils'

export class SignInUseCase {
  constructor() {}

  public async execute(logInDto: LogInDto): Promise<boolean> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: cognitoClientId(),
      AuthParameters: {
        USERNAME: logInDto.username,
        PASSWORD: logInDto.password,
        SECRET_HASH: hashCognitoSecret(logInDto.username)
      }
    }

    try {
      const data = await cognitoServiceProvider().initiateAuth(params)
      console.log(data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
