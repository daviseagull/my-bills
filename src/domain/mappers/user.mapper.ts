import { UserDto } from '../dtos/user.dto'
import { User } from '../entities/user.entity'

export class UserMapper {
  static toDto(entity: User): UserDto {
    return {
      id: entity.id!.props.value,
      createdAt: entity.createdAt!.toISOString(),
      updatedAt: entity.updatedAt!.toISOString(),
      email: entity.props.email.props.value,
      birthday: entity.props.birthday.toISOString(),
      phone: entity.props.phone.props,
      name: {
        first: entity.props.name.props.first,
        last: entity.props.name.props.last,
        full: `${entity.props.name.props.first} ${entity.props.name.props.last}`
      }
    }
  }
}
