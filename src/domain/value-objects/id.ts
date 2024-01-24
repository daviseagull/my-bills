import { BadRequestError } from 'application/errors/app-error'
import { StringProp, ValueObject } from 'domain/abstracts/value-object'

export class Id extends ValueObject<StringProp> {
  private constructor(props: StringProp) {
    super(props)
  }

  public static create(value: string, of: string): Id {
    const expression: RegExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    if (!expression.test(value)) {
      throw new BadRequestError(`${of} must be a valid ID`)
    }

    return new Id({ value })
  }
}
