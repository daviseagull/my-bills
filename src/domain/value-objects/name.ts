import { AppError } from '@/application/error/app-error'
import { ValueObject } from '../abstracts/value-object'

interface NameProps {
  first: string
  last: string
  fullname: string
}

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(first: string, last: string): Name {
    if (first.length <= 2 || first.length >= 20) {
      throw new AppError(
        'First name must have between 2 and 20 characters',
        400
      )
    }

    if (last.length <= 2 || last.length >= 20) {
      throw new AppError(
        'Last name must have between 2 and 20 characters',
        400,
        false
      )
    }

    return new Name({
      first,
      last,
      fullname: `${first} ${last}`
    })
  }
}
