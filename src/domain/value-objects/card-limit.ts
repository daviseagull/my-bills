import { BadRequestError } from '@/application/errors/app-error'
import { NumberProp, ValueObject } from '../abstracts/value-object'

export class CardLimit extends ValueObject<NumberProp> {
  private constructor(props: NumberProp) {
    super(props)
  }

  public static create(value: number): CardLimit {
    if (value < 0) {
      throw new BadRequestError(
        `Card limit '${value}' must be a positive number`
      )
    }

    return new CardLimit({ value })
  }
}
