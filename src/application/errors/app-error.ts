export class AppError extends Error {
  public readonly statusCode: number

  protected constructor(
    message: string,
    statusCode: number,
    name?: string,
    stack?: string
  ) {
    super(message)
    this.statusCode = statusCode
    this.stack = stack
    this.name = name ?? ''
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, name?: string, stack?: string) {
    super(message, 500, name, stack)
  }
}
