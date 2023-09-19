import { NextFunction, Request, Response } from 'express'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import * as process from 'process'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  function setUnauthorized() {
    res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const authHeader = req.headers.authorization || ''

  if (!authHeader) {
    setUnauthorized()
  }

  const token = authHeader.replace('Bearer ', '')

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    tokenUse: 'access',
    clientId: process.env.COGNITO_CLIENT_ID!
  })

  try {
    const payload = await verifier.verify(token)

    req.user = {
      id: payload.sub,
      username: payload.username,
      scope: payload.scope
    }
  } catch {
    setUnauthorized()
  }

  next()
}
