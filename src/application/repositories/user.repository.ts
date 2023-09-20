import { User } from '@/domain/entities/user.entity'

export interface UserRepository {
  findById(id: string): Promise<User>
  findByUsername(username: string): Promise<User>
  create(user: User): Promise<User>
}
