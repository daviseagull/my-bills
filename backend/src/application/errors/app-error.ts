export class AppError extends Error {
  public readonly statusCode: number
  public readonly authenticated: boolean

  constructor(message: string, statusCode = 500, authenticated = true) {
    super(message)
    this.statusCode = statusCode
    this.authenticated = authenticated
  }
}
