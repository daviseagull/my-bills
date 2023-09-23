import { UserDto } from '../dtos/user.dto.entity'
import { User } from '../entities/user.entity'
import { Email } from '../value-objects/email'
import { FiscalDocument } from '../value-objects/fiscal-document'
import { Name } from '../value-objects/name'

export class UserMapper {
  static toDto(entity: User): UserDto {
    const user = {
      id: entity.id!,
      email: entity.props.email.props.value,
      fiscalDocument: entity.props.fiscalDocument.props.value,
      birthday: entity.props.birthday,
      gender: entity.props.gender,
      phone: entity.props.phone,
      name: entity.props.name.props
    }
    return user
  }
}
