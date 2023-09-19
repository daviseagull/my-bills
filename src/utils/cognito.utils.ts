import { CognitoIdentityProvider as CognitoIdentityServiceProvider } from '@aws-sdk/client-cognito-identity-provider'
import crypto from 'crypto'
import process from 'process'

export const cognitoServiceProvider = () => {
  return new CognitoIdentityServiceProvider({
    region: 'us-east-1'
  })
}

export const cognitoClientId = () => {
  return process.env['COGNITO_CLIENT_ID']!
}

export const cognitoClientSecret = () => {
  return process.env['COGNITO_CLIENT_SECRET']!
}

export const hashCognitoSecret = (username: string) => {
  return crypto
    .createHmac('SHA256', cognitoClientSecret())
    .update(username + cognitoClientId())
    .digest('base64')
}
