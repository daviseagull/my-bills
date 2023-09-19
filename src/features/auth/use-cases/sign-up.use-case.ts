import { CreateUserDto } from '@/features/auth/dtos/create-user.dto'
import { UserAttribute } from '@/features/auth/models/user-attribute'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '@/utils/cognito.utils'

export class SignUpUseCase {
  public async execute(user: CreateUserDto) {
    const params = {
      ClientId: cognitoClientId(),
      Password: user.password,
      Username: user.username,
      SecretHash: hashCognitoSecret(user.username),
      UserAttributes: this.getUserAttributes(user)
    }
    await cognitoServiceProvider().signUp(params)
  }

  private getUserAttributes(user: CreateUserDto): UserAttribute[] {
    const userAttr: UserAttribute[] = []
    userAttr.push(new UserAttribute('email', user.email))
    userAttr.push(new UserAttribute('gender', user.gender))
    userAttr.push(new UserAttribute('birthdate', user.birthdate.toString()))
    userAttr.push(
      new UserAttribute('name', `${user.name.first} ${user.name.last}`)
    )
    userAttr.push(new UserAttribute('given_name', user.name.first))
    userAttr.push(new UserAttribute('family_name', user.name.last))
    userAttr.push(new UserAttribute('phone_number', user.phone))
    return userAttr
  }
}
