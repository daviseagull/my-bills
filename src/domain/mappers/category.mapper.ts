import { CategoryDto } from '../dtos/category.dto'
import { Category } from '../entities/category.entity'

export class CategoryMapper {
  static toDto(entity: Category): CategoryDto {
    const category = {
      id: entity.id!,
      user: entity.props.user,
      incomes: entity.props.incomes,
      expenses: entity.props.expenses
    }
    return category
  }
}
