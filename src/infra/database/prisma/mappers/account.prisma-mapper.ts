import { AccountUtils } from '@/application/utils/account.utils'
import { Account } from '@/domain/entities/account.entity'
import { Color } from '@/domain/value-objects/color'
import { Description } from '@/domain/value-objects/description'
import { Account as RawAccount } from '@prisma/client'

export class AccountPrismaMapper {
  static toDomain(account: RawAccount): Account {
    return Account.create(
      {
        type: AccountUtils.mapAccountTypeEnum(account.type),
        user: account.user,
        description: Description.create(account.description),
        balance: account.balance,
        color: Color.create(account.color)
      },
      account.id,
      account.createdAt,
      account.updatedAt
    )
  }

  static toPrismaAccount(account: Account): RawAccount {
    return {
      id: account.id!,
      createdAt: account.createdAt!,
      updatedAt: account.updatedAt!,
      description: account.props.description.props.value,
      color: account.props.color.props.value,
      type: account.props.type,
      user: account.props.user,
      balance: account.props.balance
    }
  }
}
