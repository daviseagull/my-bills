import {
  AuthenticationResult,
  AuthenticationService
} from '@/application/authentication/authentication.service'
import {
  BadRequestError,
  InternalServerError
} from '@/application/errors/app-error'
import { SignUpRequest } from '@/application/use-cases/auth/sign-up/sign-up.use-case'
import {
  AttributeType,
  CodeMismatchException,
  ExpiredCodeException,
  InvalidPasswordException,
  NotAuthorizedException,
  UserNotConfirmedException,
  UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider'
import { cpf } from 'cpf-cnpj-validator'
import {
  cognitoClientId,
  cognitoServiceProvider,
  hashCognitoSecret
} from '../utils/cognito.utils'

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
    try {
      const data = await cognitoServiceProvider().initiateAuth(params)
      return {
        status: 'OK',
        accessToken: data.AuthenticationResult!.AccessToken!,
        type: 'Bearer'
      }
    } catch (err) {
      if (err instanceof UserNotConfirmedException) {
        throw new BadRequestError(`User ${username} not confirmed`)
      }
      if (err instanceof NotAuthorizedException) {
        throw new BadRequestError('Invalid username or password')
      }

      throw new InternalServerError(
        'Unknown error while trying to authenticate'
      )
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

    try {
      const cognitoUser = await cognitoServiceProvider().signUp(params)
      return cognitoUser.UserSub!
    } catch (err) {
      if (err instanceof UsernameExistsException) {
        throw new BadRequestError(
          `User with email ${user.email} already exists`
        )
      }

      if (err instanceof InvalidPasswordException) {
        throw new BadRequestError(err.message)
      }
      throw new InternalServerError(
        `Unknown error while trying to create user in IAM`
      )
    }
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
    try {
      await cognitoServiceProvider().confirmSignUp(params)
    } catch (err) {
      if (err instanceof ExpiredCodeException) {
        throw new BadRequestError('Code has expired')
      }
      if (err instanceof CodeMismatchException) {
        throw new BadRequestError(
          "Code doesn't match with what server was expecting"
        )
      }
      throw new BadRequestError('Unknown error while trying to confirm user')
    }
  }

  async resendConfirmationCode(email: string) {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(email),
      Username: email
    }
    try {
      await cognitoServiceProvider().resendConfirmationCode(params)
    } catch (err) {
      throw new InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  }

  async forgotPassword(email: string) {
    const params = {
      ClientId: cognitoClientId(),
      SecretHash: hashCognitoSecret(email),
      Username: email
    }

    try {
      await cognitoServiceProvider().forgotPassword(params)
    } catch (err) {
      throw new InternalServerError(
        'Unknown error while trying to forgot password'
      )
    }
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

    try {
      await cognitoServiceProvider().confirmForgotPassword(params)
    } catch (err) {
      throw new InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  }

  async signOut(token: string): Promise<void> {
    const params = {
      AccessToken: token
    }

    try {
      await cognitoServiceProvider().globalSignOut(params)
    } catch (err) {
      throw new InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  }
}
