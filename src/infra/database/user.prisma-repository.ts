import { UserRepository } from '@/application/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';

export class UserPrismaRepository implements UserRepository {

    findById(id: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    
    findByUsername(username: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }

}