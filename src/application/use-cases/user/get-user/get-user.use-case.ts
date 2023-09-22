import { AuthenticationService } from '@/application/authentication/authentication.service'
import { UserRepository } from '@/application/repositories/user.repository'
import e from 'express'

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(email: string) {
    return this.userRepository.findByEmail(email)
  }
}
