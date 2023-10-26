import { CategoryDto, UserCategoriesDto } from '../dtos/user-categories.dto'
import { ICategory, UserCategories } from '../entities/user-categories.entity'

export class UserCategoriesMapper {
  static toDto(entity: UserCategories): UserCategoriesDto {
    const category = {
      id: entity.id!,
      user: entity.props.user,
      incomes: this.toCategoryDto(entity.props.incomes),
      expenses: this.toCategoryDto(entity.props.expenses)
    }
    return category
  }

  private static toCategoryDto(categories: ICategory[]): CategoryDto[] {
    return categories.map((category: ICategory) => {
      return {
        description: category.description,
        color: category.color.props.value,
        parent: category.parent!
      }
    })
  }
}
