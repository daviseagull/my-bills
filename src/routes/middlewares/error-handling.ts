import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/errors/app-error'
import logger from '@/logger'

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.info(err)
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 500,
      message: `Internal server error - ${err.message}`
    })
  }

  next()
}
