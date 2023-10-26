import { CategoryDto } from '../dtos/user-categories.dto'
import { ICategory } from '../entities/user-categories.entity'

export class CategoryMapper {
  static toCategoryDto(categories: ICategory[]): CategoryDto[] {
    return categories.map((category: ICategory) => {
      return {
        description: category.description,
        color: category.color.props.value,
        parent: category.parent!
      }
    })
  }
}
