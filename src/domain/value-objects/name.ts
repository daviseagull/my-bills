import { BadRequestError } from '@/application/errors/app-error'
import { StringUtils } from '@/application/utils/string.utils'
import { ValueObject } from '../abstracts/value-object'

type NameProps = {
  first: string
  last: string
}

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(first: string, last: string): Name {
    if (first.length <= 2 || first.length >= 20) {
      throw new BadRequestError(
        'First name must have between 2 and 20 characters'
      )
    }

    if (last.length <= 2 || last.length >= 20) {
      throw new BadRequestError(
        'Last name must have between 2 and 20 characters'
      )
    }

    first = StringUtils.capitalizeFirstLetter(first)
    last = StringUtils.capitalizeFirstLetter(last)

    return new Name({
      first,
      last
    })
  }
}
