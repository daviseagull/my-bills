import { AppError } from '@/application/errors/app-error'
import logger from '@/infra/logger/logger'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = req.user ? `User: ${req.user} - ${err.message}` : err.message

  const status = err.statusCode ?? 500
  message = err.statusCode ? message : `Internal server error - ${err.message}`

  logger.error(message)
  res.status(status).json({ statusCode: err.statusCode, message: message })
}
