import { UnauthorizedError } from '@/application/errors/app-error'
import { CognitoUtils } from '@/infra/authentication/utils/cognito.utils'
import { NextFunction, Request, Response } from 'express'

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization

  if (!token && token?.startsWith('Bearer')) {
    throw new UnauthorizedError('Unauthorized')
  }

  token = token!.replace('Bearer ', '')

  try {
    const payload = await CognitoUtils.getVerifier().verify(token, {
      clientId: process.env['COGNITO_CLIENT_ID']!
    })

    req.user = payload.sub
    req.token = token
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }

  next()
}
