import { CategoryDto } from '../dtos/category.dto'
import { Category } from '../entities/category.entity'

export class CategoryMapper {
  static toCategoriesDto(categories: Category[]): CategoryDto[] {
    return categories.map((category: Category) => {
      return {
        id: category.id!,
        active: category.props.active,
        user: category.props.user,
        type: category.props.type,
        description: category.props.description,
        color: category.props.color.props.value,
        parent: category.props.parent!
      }
    })
  }
}
