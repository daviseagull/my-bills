import { Name } from '@/domain/value-objects/name'
import { AuthenticationService } from '@/application/authentication/authentication.service'
import { User } from '@/domain/entities/user.entity'
import { UserRepository } from '@/application/repositories/user.repository'
import { AppError } from '@/application/error/app-error'
import { Email } from '@/domain/value-objects/email'
import { FiscalDocument } from '@/domain/value-objects/fiscal-document'

export interface NameRequest {
  first: string
  last: string
}

export interface SignUpRequest {
  password: string
  email: string
  fiscalDocument: string
  name: NameRequest
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
    const newUser = User.create({
      email: Email.create(request.email),
      fiscalDocument: FiscalDocument.create(request.fiscalDocument),
      birthday: new Date(request.birthday),
      gender: request.gender,
      phone: request.phone,
      name: Name.create(request.name.first, request.name.last),
      confirmed: false
    })

    const user = await this.userRepository.findByEmail(request.email)

    if (user) {
      throw new AppError(
        `Couldn't create user ${request.email}. User already exists`,
        404,
        false
      )
    }

    const cognitoId = await this.authService.signUp(request)

    newUser.props.cognitoId = cognitoId

    this.userRepository.create(newUser)
  }
}
