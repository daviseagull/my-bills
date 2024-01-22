import { IAccountRepository } from 'application/repositories/account.repository'
import { AccountUtils } from 'application/utils/account.utils'
import { Account } from 'domain/entities/account.entity'
import { Color } from 'domain/value-objects/color'
import { Description } from 'domain/value-objects/description'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

export type CreateAccountRequest = {
  type: string
  description: string
  balance: number
  color: string
}

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject('AccountRepository') private accountRepository: IAccountRepository
  ) {}

  public async execute(
    request: CreateAccountRequest,
    user: string
  ): Promise<string> {
    logger.info(`Creating account with name ${request.description}`)

    const newAccount = Account.create({
      type: AccountUtils.mapAccountTypeEnum(request.type),
      user: user,
      description: Description.create(request.description),
      balance: request.balance,
      color: Color.create(request.color)
    })

    const account = await this.accountRepository.create(newAccount)

    return account
  }
}
