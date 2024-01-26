import { BadRequestError } from '@/application/errors/app-error'
import logger from '@/infra/logger/logger'
import { ObjectId } from 'bson'
import { StringProp, ValueObject } from '../abstracts/value-object'

export class Id extends ValueObject<StringProp> {
  private constructor(props: StringProp) {
    super(props)
  }

  public static create(entityName: string, value?: string): Id | undefined {
    if (!value) {
      return undefined
    }

    logger.info(value)
    if (entityName === 'Cognito') {
      const expression: RegExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

      if (!expression.test(value)) {
        throw new BadRequestError(`${entityName} must be a valid ID`)
      }

      return new Id({ value })
    }

    if (!ObjectId.isValid(value)) {
      throw new BadRequestError(`${entityName} must be a valid ID`)
    }

    return new Id({ value })
  }
}
