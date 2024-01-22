import { BadRequestError } from '@/application/errors/app-error'
import { NumberProp, ValueObject } from '../abstracts/value-object'

export class DayOfMonth extends ValueObject<NumberProp> {
  private constructor(props: NumberProp) {
    super(props)
  }

  public static create(value: number): DayOfMonth {
    if (value < 0 || value > 31) {
      throw new BadRequestError(`Day of month must be between 1 and 31`)
    }

    return new DayOfMonth({ value })
  }
}
