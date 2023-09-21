import { AppError } from '@/application/error/app-error'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { NextFunction, Request, Response } from 'express'

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization

  if (!token) {
    throw new Error('Unauthorized')
  }

  token = token!.replace('Bearer ', '')

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env['COGNITO_USER_POOL_ID']!,
    tokenUse: 'access'
  })

  let payload
  try {
    payload = await verifier.verify(token, {
      clientId: process.env['COGNITO_CLIENT_ID']!
    })
  } catch {
    throw new AppError('Unauthorized', 401)
  }

  req.user = payload.sub

  next()
}
