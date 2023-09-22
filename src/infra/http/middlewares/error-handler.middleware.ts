import { AppError } from '@/application/errors/app-error'
import logger from '@/infra/logger/logger'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const message = err.authenticated
      ? `User: ${req.user} - ${err.message}`
      : err.message

    logger.error(message)
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    })
  } else {
    logger.error(`User: ${req.user} - ${err.message}`)
    res.status(500).json({
      status: 500,
      message: `Internal server error - ${err.message}`
    })
  }

  next()
}
