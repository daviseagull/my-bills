import { CardBrandEnum } from '@/domain/enums/card-brand.enum'
import { BadRequestError } from '../errors/app-error'

export class CardUtils {
  public static mapCardTypeEnum(value: string): CardBrandEnum {
    if (value === CardBrandEnum.americanExpress) {
      return CardBrandEnum.americanExpress
    }

    if (value === CardBrandEnum.discover) {
      return CardBrandEnum.discover
    }

    if (value === CardBrandEnum.elo) {
      return CardBrandEnum.elo
    }

    if (value === CardBrandEnum.mastercard) {
      return CardBrandEnum.mastercard
    }

    if (value === CardBrandEnum.visa) {
      return CardBrandEnum.visa
    }

    throw new BadRequestError(
      'Card brand type must be americanExpress, discover, elo, mastercard, visa'
    )
  }
}
