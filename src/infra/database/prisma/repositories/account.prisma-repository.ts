import { InternalServerError } from '@/application/errors/app-error'
import { IAccountRepository } from '@/application/repositories/account.repository'
import { Account } from '@/domain/entities/account.entity'
import { AccountPrismaMapper } from '../mappers/account.prisma-mapper'
import { prisma } from '../prisma-client'

export default class AccountPrismaRepository implements IAccountRepository {
  constructor() {}

  async create(account: Account): Promise<string> {
    const prismaAccount = AccountPrismaMapper.toPrismaAccount(account)

    const createdAccount = await prisma.account.create({
      data: prismaAccount
    })

    if (!createdAccount) {
      throw new InternalServerError(
        `Couldn't create account ${account.props.description}`
      )
    }

    return createdAccount.id
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  update(account: Account): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async findByUserAndId(
    cognitoId: string,
    id: string
  ): Promise<Account | null> {
    const account = await prisma.account.findUnique({
      where: {
        cognito_id: cognitoId,
        id
      }
    })

    return account ? AccountPrismaMapper.toDomain(account!) : null
  }

  async findAllByUser(cognitoId: string): Promise<Account[]> {
    const accounts = await prisma.account.findMany({
      where: {
        cognito_id: cognitoId
      }
    })

    return accounts
      ? accounts.map((account) => AccountPrismaMapper.toDomain(account!))
      : []
  }

  async exists(cognitoId: string, description: string): Promise<boolean> {
    const account = await prisma.account.count({
      where: {
        cognito_id: cognitoId,
        description
      }
    })

    return account !== 0
  }
}
