import { BadRequestError } from '@/application/errors/app-error'
import { StringProp, ValueObject } from '../abstracts/value-object'

type EmailProps = StringProp

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
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
