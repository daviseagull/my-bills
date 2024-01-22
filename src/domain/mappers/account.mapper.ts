import { AccountDto } from '../dtos/account.dto'
import { Account } from '../entities/account.entity'

export class AccountMapper {
  static toAccountDto(accounts: Account[]): AccountDto[] {
    return accounts.map((account: Account) => {
      return {
        id: account.id!,
        createdAt: account.createdAt!.toISOString(),
        updatedAt: account.updatedAt!.toISOString(),
        type: account.props.type,
        user: account.props.user,
        description: account.props.description.props.value,
        balance: account.props.balance,
        color: account.props.color
      }
    })
  }
}
