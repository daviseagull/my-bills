import { BadRequestError } from '@/application/errors/app-error'
import { StringUtils } from '@/application/utils/string.utils'
import { StringProp, ValueObject } from '../abstracts/value-object'

type DescriptionProps = StringProp

export class Description extends ValueObject<DescriptionProps> {
  private constructor(props: DescriptionProps) {
    super(props)
  }

  public static create(value: string): Description {
    if (value.length < 1 || value.length > 20) {
      throw new BadRequestError(
        `Description must have between 1 to 20 characters.`
      )
    }

    return new Description({ value: StringUtils.capitalizeFirstLetter(value) })
  }
}
