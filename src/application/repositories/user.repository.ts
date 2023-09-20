import { User } from '@/domain/entities/user.entity'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
