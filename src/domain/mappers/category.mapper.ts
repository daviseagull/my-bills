import { CategoryDto } from '../dtos/category.dto'
import { Category } from '../entities/category.entity'

export class CategoryMapper {
  static toCategoriesDto(categories: Category[]): CategoryDto[] {
    return categories.map((category: Category) => {
      const parentId = category.props.parent
        ? category.props.parent.props.value
        : undefined

      return {
        id: category.id!,
        createdAt: category.createdAt!.toISOString(),
        updatedAt: category.updatedAt!.toISOString(),
        active: category.props.active,
        user: category.props.user.props.value,
        type: category.props.type,
        description: category.props.description.props.value,
        color: category.props.color.props.value,
        parent: parentId
      }
    })
  }
}
