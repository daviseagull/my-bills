import { Account } from 'domain/entities/account.entity'

export interface IAccountRepository {
  create(account: Account): Promise<string>
  delete(id: string): Promise<void>
  update(account: Account): Promise<string>
  findByUserAndId(cognitoId: string, id: string): Promise<Account | null>
  findAllByUser(userId: string): Promise<Account[]>
  exists(cognitoId: string, description: string): Promise<boolean>
}
