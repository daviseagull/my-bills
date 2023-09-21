import { UserRepository } from '@/application/repositories/user.repository'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'
import { AppError } from '@/core/domain/error/app-error'

export interface ConfirmUserRequest {
  username: string
  code: string
}

export class ConfirmUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: ConfirmUserRequest): Promise<void> {
    await this.userRepository.findByUsername(request.username)
    await this.authService.confirmUser(request.username, request.code)
  }
}
