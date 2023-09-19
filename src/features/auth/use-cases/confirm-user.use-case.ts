import { ConfirmUserDto } from '@/features/auth/dtos/confirm-user.dto'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/utils/cognito.utils'

export class ConfirmUserUseCase {
  public async execute(confirmationDto: ConfirmUserDto): Promise<void> {
    const params = {
      ClientId: cognitoClientId(),
      ConfirmationCode: confirmationDto.code,
      Username: confirmationDto.username,
      SecretHash: hashCognitoSecret(confirmationDto.username)
    }
    await cognitoServiceProvider().confirmSignUp(params)
  }
}
