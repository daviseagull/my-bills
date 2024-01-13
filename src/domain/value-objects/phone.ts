import { BadRequestError } from '@/application/errors/app-error'
import { ValueObject } from '../abstracts/value-object'

type PhoneProps = {
  country: string
  areaCode: number
  number: number
}

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props)
  }

  public static create(
    country: string,
    areaCode: number,
    number: number
  ): Phone {
    const countryExpression: RegExp = /^\+\d+$/

    if (!countryExpression.test(country)) {
      throw new BadRequestError(
        `Country code '${country}' must be a valid country code`
      )
    }

    if (!areaCode) {
      throw new BadRequestError(`Area code cannot be empty`)
    }

    if (!number) {
      throw new BadRequestError(`Number cannot be empty`)
    }

    return new Phone({ country, areaCode, number })
  }
}
