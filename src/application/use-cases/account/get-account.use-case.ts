import { IAccountRepository } from '@/application/repositories/account.repository'
import { AccountMapper } from '@/domain/mappers/account.mapper'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAccountUseCase {
  constructor(
    @inject('AccountRepository') private accountRepository: IAccountRepository
  ) {}

  public async execute(cognitoId: string, accountId: string) {
    logger.info(`Getting account with id ${accountId} for user ${cognitoId}`)

    const account = await this.accountRepository.findByUserAndId(
      cognitoId,
      accountId
    )

    if (!account) {
      return null
    }

    return AccountMapper.toAccountDto(account!)
  }
}
