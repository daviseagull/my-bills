import { Name } from '@/domain/models/name.model'
import { AuthenticationService } from '@/core/domain/authentication/authentication.service'
import { User } from '@/domain/entities/user.entity'
import { UserRepository } from '@/application/repositories/user.repository'
import { AppError } from '@/core/domain/error/app-error'

export interface SignUpRequest {
  username: string
  password: string
  email: string
  name: Name
  birthday: Date
  gender: string
  phone: string
}

export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthenticationService
  ) {}

  public async execute(request: SignUpRequest) {
    const user = this.userRepository.findByUsername(request.username)

    if (!user) {
      throw new AppError(
        `Couldn't find user in the database ${request.username}`,
        404,
        false
      )
    }

    const cognitoUser = await this.authService.signUp(request)

    const newUser = User.create({
      username: request.username,
      email: request.email,
      birthday: new Date(request.birthday),
      gender: request.gender,
      phone: request.phone,
      name: {
        first: request.name.first,
        last: request.name.last,
        fullname: `${request.name.first} ${request.name.last}`
      },
      confirmed: false,
      cognitoId: cognitoUser.id
    })

    this.userRepository.create(newUser)
  }
}
