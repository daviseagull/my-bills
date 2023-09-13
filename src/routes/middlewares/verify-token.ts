import { NextFunction, Request, Response } from 'express'
import * as JWT from 'jsonwebtoken'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || ''

  function setUnauthorized() {
    res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  if (!authHeader) {
    setUnauthorized()
  }

  const token = authHeader.replace('Bearer ', '')
  const jwt = JWT.decode(token)

  if (!jwt) {
    setUnauthorized()
  }

  req.user = jwt?.sub
  next()
}
