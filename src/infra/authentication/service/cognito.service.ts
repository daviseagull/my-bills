import {
  AuthenticationResult,
  AuthenticationService
} from '@/application/authentication/authentication.service'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '../utils/cognito.utils'
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider'
import { SignUpRequest } from '@/application/use-cases/sign-up/sign-up.use-case'

class UserAttribute implements AttributeType {
  constructor(name: string, value: string) {
    this.Name = name
    this.Value = value
  }

  Name: string | undefined
  Value: string
}

export class CognitoService implements AuthenticationService {
  async signIn(
    username: string,
    password: string
  ): Promise<AuthenticationResult> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: cognitoClientId(),
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: hashCognitoSecret(username)
      }
    }

    const data = await cognitoServiceProvider().initiateAuth(params)

    return {
      status: 'OK',
      accessToken: data.AuthenticationResult!.AccessToken!,
      type: 'Bearer'
    }
  }

  async signUp(user: SignUpRequest): Promise<string> {
    const params = {
      ClientId: cognitoClientId(),
      Password: user.password,
      Username: user.email,
      SecretHash: hashCognitoSecret(user.email),
      UserAttributes: this.getUserAttributes(user)
    }

    const cognitoUser = await cognitoServiceProvider().signUp(params)

    return cognitoUser.UserSub!
  }

  private getUserAttributes(user: SignUpRequest): UserAttribute[] {
    const userAttr: UserAttribute[] = []
    userAttr.push(new UserAttribute('email', user.email))
    userAttr.push(new UserAttribute('gender', user.gender))
    userAttr.push(new UserAttribute('birthdate', user.birthday.toString()))
    userAttr.push(
      new UserAttribute('name', `${user.name.first} ${user.name.last}`)
    )
    userAttr.push(new UserAttribute('given_name', user.name.first))
    userAttr.push(new UserAttribute('family_name', user.name.last))
    userAttr.push(new UserAttribute('phone_number', user.phone))
    return userAttr
  }

  async confirmUser(username: string, code: string): Promise<void> {
    const params = {
      ClientId: cognitoClientId(),
      ConfirmationCode: code,
      Username: username,
      SecretHash: hashCognitoSecret(username)
    }

    await cognitoServiceProvider().confirmSignUp(params)
  }

  async resendConfirmationCode(username: string) {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(username),
      Username: username
    }

    await cognitoServiceProvider().resendConfirmationCode(params)
  }
}
