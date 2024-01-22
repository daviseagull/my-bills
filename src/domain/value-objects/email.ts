import { BadRequestError } from '@/application/errors/app-error'
import { StringProp, ValueObject } from '../abstracts/value-object'

export class Email extends ValueObject<StringProp> {
  private constructor(props: StringProp) {
    super(props)
  }

  public static create(value: string): Email {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (!expression.test(value)) {
      throw new BadRequestError('Email must be a valid email')
    }

    return new Email({ value: value.toLowerCase() })
  }
}
