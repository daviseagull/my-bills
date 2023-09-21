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
import { cpf } from 'cpf-cnpj-validator'
import { SignUpRequest } from '@/application/use-cases/auth/sign-up/sign-up.use-case'

class UserAttribute implements AttributeType {
  private constructor(name: string, value: string) {
    this.Name = name
    this.Value = value
  }

  public static create(name: string, value: string) {
    return new UserAttribute(name, value)
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
    userAttr.push(UserAttribute.create('email', user.email))
    userAttr.push(UserAttribute.create('gender', user.gender))
    userAttr.push(UserAttribute.create('birthdate', user.birthday.toString()))
    userAttr.push(
      UserAttribute.create('name', `${user.name.first} ${user.name.last}`)
    )
    userAttr.push(UserAttribute.create('given_name', user.name.first))
    userAttr.push(UserAttribute.create('family_name', user.name.last))
    userAttr.push(UserAttribute.create('phone_number', user.phone))
    userAttr.push(
      UserAttribute.create(
        'custom:fiscal_document',
        cpf.strip(user.fiscalDocument)
      )
    )

    return userAttr
  }

  async confirmUser(email: string, code: string): Promise<void> {
    const params = {
      ClientId: cognitoClientId(),
      ConfirmationCode: code,
      Username: email,
      SecretHash: hashCognitoSecret(email)
    }

    await cognitoServiceProvider().confirmSignUp(params)
  }

  async resendConfirmationCode(email: string) {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(email),
      Username: email
    }

    await cognitoServiceProvider().resendConfirmationCode(params)
  }

  async forgotPassword(email: string) {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(email),
      Username: email
    }

    await cognitoServiceProvider().forgotPassword(params)
  }

  async confirmResetPassword(
    email: string,
    code: string,
    password: string
  ): Promise<void> {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(email),
      Username: email,
      ConfirmationCode: code,
      Password: password
    }

    await cognitoServiceProvider().confirmForgotPassword(params)
  }

  async signOut(token: string): Promise<void> {
    const params = {
      AccessToken: token
    }

    await cognitoServiceProvider().globalSignOut(params)
  }
}
