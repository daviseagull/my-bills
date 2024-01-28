import { AccountUtils } from '@/application/utils/account.utils'
import { Account } from '@/domain/entities/account.entity'
import { Color } from '@/domain/value-objects/color'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import { Account as RawAccount } from '@prisma/client'

export class AccountPrismaMapper {
  static toDomain(account: RawAccount): Account {
    return Account.create(
      {
        type: AccountUtils.mapAccountTypeEnum(account.type),
        user: Id.create('Cognito', account.cognito_id)!,
        description: Description.create(account.description),
        balance: account.balance,
        color: Color.create(account.color)
      },
      Id.create('Account', account.id),
      account.created_at,
      account.updated_at
    )
  }

  static toPrismaAccount(account: Account): RawAccount {
    return {
      id: account.id!.props.value,
      created_at: account.createdAt!,
      updated_at: account.updatedAt!,
      description: account.props.description.props.value,
      color: account.props.color.props.value,
      type: account.props.type,
      cognito_id: account.props.user.props.value,
      balance: account.props.balance
    }
  }
}
