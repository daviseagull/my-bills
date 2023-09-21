import { AppError } from '@/application/errors/app-error'
import { ValueObject } from '../abstracts/value-object'

interface EmailProps {
  value: string
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props)
  }

  public static create(value: string): Email {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (!expression.test(value)) {
      throw new AppError('Email must be a valid email', 400)
    }

    return new Email({ value })
  }
}
