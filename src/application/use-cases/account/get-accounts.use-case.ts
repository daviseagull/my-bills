import { IAccountRepository } from '@/application/repositories/account.repository'
import { AccountMapper } from '@/domain/mappers/account.mapper'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAccountsUseCase {
  constructor(
    @inject('AccountRepository') private accountRepository: IAccountRepository
  ) {}

  public async execute(cognitoId: string) {
    logger.info(`Getting accounts for user ${cognitoId}`)

    const accounts = await this.accountRepository.findAllByUser(cognitoId)

    return AccountMapper.toAccountDtos(accounts)
  }
}
