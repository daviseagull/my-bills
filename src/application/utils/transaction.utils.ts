import { TransactionTypeEnum } from '@/domain/enums/transaction-type.enum'

export class TransactionUtils {
  public static mapTransactionTypeEnum(value: string): TransactionTypeEnum {
    return value === TransactionTypeEnum.expense
      ? TransactionTypeEnum.expense
      : TransactionTypeEnum.income
  }
}
