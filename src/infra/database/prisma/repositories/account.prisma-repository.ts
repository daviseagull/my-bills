import { PrismaClient } from '@prisma/client'
import { InternalServerError } from 'application/errors/app-error'
import { IAccountRepository } from 'application/repositories/account.repository'
import { Account } from 'domain/entities/account.entity'
import { AccountPrismaMapper } from '../mappers/account.prisma-mapper'

export class AccountPrismaRepository implements IAccountRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(account: Account): Promise<string> {
    const prismaAccount = AccountPrismaMapper.toPrismaAccount(account)

    const createdAccount = await this.prisma.account.create({
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

  findById(id: string): Promise<Account> {
    throw new Error('Method not implemented.')
  }

  findAllByUser(userId: string): Promise<Account[]> {
    throw new Error('Method not implemented.')
  }
}
