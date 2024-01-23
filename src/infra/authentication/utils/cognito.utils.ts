import { CognitoIdentityProvider as CognitoIdentityServiceProvider } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify/cognito-verifier'
import crypto from 'crypto'
import { env } from 'env'

export class CognitoUtils {
  public static cognitoServiceProvider() {
    return new CognitoIdentityServiceProvider({
      region: env.REGION
    })
  }

  public static cognitoClientId() {
    return env.COGNITO_CLIENT_ID
  }

  public static cognitoClientSecret() {
    return env.COGNITO_CLIENT_SECRET
  }

  public static hashCognitoSecret(username: string) {
    return crypto
      .createHmac('SHA256', this.cognitoClientSecret())
      .update(username + this.cognitoClientId())
      .digest('base64')
  }

  public static getVerifier() {
    return CognitoJwtVerifier.create({
      userPoolId: env.COGNITO_USER_POOL_ID,
      tokenUse: 'access'
    })
  }
}
