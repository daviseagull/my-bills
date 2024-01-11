import { CognitoIdentityProvider as CognitoIdentityServiceProvider } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify/cognito-verifier'
import crypto from 'crypto'
import process from 'process'

export class CognitoUtils {
  public static cognitoServiceProvider() {
    return new CognitoIdentityServiceProvider({
      region: process.env['AWS_REGION']
    })
  }

  public static cognitoClientId() {
    return process.env['COGNITO_CLIENT_ID']!
  }

  public static cognitoClientSecret() {
    return process.env['COGNITO_CLIENT_SECRET']!
  }

  public static hashCognitoSecret(username: string) {
    return crypto
      .createHmac('SHA256', this.cognitoClientSecret())
      .update(username + this.cognitoClientId())
      .digest('base64')
  }

  public static getVerifier() {
    return CognitoJwtVerifier.create({
      userPoolId: process.env['COGNITO_USER_POOL_ID']!,
      tokenUse: 'access'
    })
  }
}
