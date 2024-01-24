import { BadRequestError } from 'application/errors/app-error'
import { IAccountRepository } from 'application/repositories/account.repository'
import { AccountUtils } from 'application/utils/account.utils'
import { StringUtils } from 'application/utils/string.utils'
import { Account } from 'domain/entities/account.entity'
import { Color } from 'domain/value-objects/color'
import { Description } from 'domain/value-objects/description'
import { Id } from 'domain/value-objects/id'
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

    const exists = await this.accountRepository.exists(
      user,
      StringUtils.capitalizeFirstLetter(request.description)
    )

    if (exists) {
      throw new BadRequestError(
        `Couldn't create account with description ${request.description} because it already exists.`
      )
    }

    const newAccount = Account.create({
      type: AccountUtils.mapAccountTypeEnum(request.type),
      user: Id.create(user, 'User'),
      description: Description.create(request.description),
      balance: request.balance,
      color: Color.create(request.color)
    })

    return await this.accountRepository.create(newAccount)
  }
}
