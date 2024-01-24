import { IUserRepository } from '@/application/repositories/user.repository'
import { PasswordUtils } from '@/application/utils/password.utils'
import { User } from '@/domain/entities/user.entity'
import { Email } from '@/domain/value-objects/email'
import { Name } from '@/domain/value-objects/name'
import { Phone } from '@/domain/value-objects/phone'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'
import { SignUpRequest } from '../auth/sign-up.use-case'
import { CreateDefaultCategoriesUseCase } from '../category/create-default-categories.use-case'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('CreateDefaultCategoriesUseCase')
    private categoryUseCase: CreateDefaultCategoriesUseCase
  ) {}

  public async execute(
    request: SignUpRequest,
    cognitoId: string
  ): Promise<User> {
    logger.info(`Creating user with email ${request.email}`)

    const newUser = User.create({
      email: Email.create(request.email),
      birthday: new Date(request.birthday),
      phone: Phone.create(
        request.phone.country,
        request.phone.areaCode,
        request.phone.number
      ),
      name: Name.create(request.name.first, request.name.last),
      cognitoId: cognitoId,
      confirmed: false
    })

    PasswordUtils.validatePassword(request.password)

    const user = await this.userRepository.create(newUser)

    this.categoryUseCase.execute(user.props.cognitoId!)

    return user
  }
}
