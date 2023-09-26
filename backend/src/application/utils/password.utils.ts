import { AppError } from '../errors/app-error'

export class PasswordUtils {
  public static validatePassword(password: string) {
    const expression: RegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (!expression.test(password)) {
      throw new AppError(
        'Password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
        400
      )
    }
  }
}
