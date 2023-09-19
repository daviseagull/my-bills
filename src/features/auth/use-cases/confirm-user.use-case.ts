import { ConfirmUserDto } from '@/features/auth/dtos/confirm-user.dto'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/utils/cognito.utils'

export class ConfirmUserUseCase {
  public async execute(confirmationDto: ConfirmUserDto): Promise<boolean> {
    const params = {
      ClientId: cognitoClientId(),
      ConfirmationCode: confirmationDto.code,
      Username: confirmationDto.username,
      SecretHash: hashCognitoSecret(confirmationDto.username)
    }

    try {
      const cognitoResp = await cognitoServiceProvider().confirmSignUp(params)
      console.log(cognitoResp)
      return true
    } catch (error) {
      console.log('error', error)
      return false
    }
  }
}
