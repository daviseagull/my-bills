import { AccountTypeEnum } from 'domain/enums/account-type.enum'
import { BadRequestError } from '../errors/app-error'

export class AccountUtils {
  public static mapAccountTypeEnum(value: string): AccountTypeEnum {
    if (value === AccountTypeEnum.checking) {
      return AccountTypeEnum.checking
    }

    if (value === AccountTypeEnum.investment) {
      return AccountTypeEnum.investment
    }

    if (value === AccountTypeEnum.savings) {
      return AccountTypeEnum.savings
    }

    throw new BadRequestError(
      'Account type must be checking, investment or savings'
    )
  }
}
