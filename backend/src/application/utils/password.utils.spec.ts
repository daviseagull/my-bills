import { AppError } from '../errors/app-error'
import { PasswordUtils } from './password.utils'

describe('Password utils tests', () => {
  it('It should validate if password is invalid', () => {
    const invalidPassword = 'password'

    expect(() => PasswordUtils.validatePassword(invalidPassword)).toThrow()
  })

  it('It should validate if password is valid', () => {
    const invalidPassword = 'P@ssword32'

    expect(() => PasswordUtils.validatePassword(invalidPassword)).not.toThrow(
      AppError
    )
  })
})
