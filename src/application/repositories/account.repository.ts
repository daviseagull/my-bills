import { Account } from 'domain/entities/account.entity'

export interface IAccountRepository {
  create(account: Account): Promise<string>
  delete(id: string): Promise<void>
  update(account: Account): Promise<string>
  findById(id: string): Promise<Account>
  findAllByUser(userId: string): Promise<Account[]>
}
