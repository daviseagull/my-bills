import { BadRequestError } from 'application/errors/app-error'
import { StringProp, ValueObject } from '../abstracts/value-object'

export class Color extends ValueObject<StringProp> {
  private constructor(props: StringProp) {
    super(props)
  }

  public static create(value: string): Color {
    const expression: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

    if (!expression.test(value)) {
      throw new BadRequestError(
        `Color '${value}' must be a valid hexadecimal color`
      )
    }

    return new Color({ value: value.toUpperCase() })
  }
}
