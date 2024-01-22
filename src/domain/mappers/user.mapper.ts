import { UserDto } from '../dtos/user.dto'
import { User } from '../entities/user.entity'

export class UserMapper {
  static toDto(entity: User): UserDto {
    const user = {
      id: entity.id!,
      createdAt: entity.createdAt!.toDateString(),
      updatedAt: entity.updatedAt!.toDateString(),
      email: entity.props.email.props.value,
      birthday: entity.props.birthday,
      phone: entity.props.phone.props,
      name: {
        first: entity.props.name.props.first,
        last: entity.props.name.props.last,
        full: `${entity.props.name.props.first} ${entity.props.name.props.last}`
      }
    }
    return user
  }
}
