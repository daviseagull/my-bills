import { Category as RawCategory } from '@prisma/client'
import { CategoryUtils } from 'application/utils/category.utils'
import { Category } from 'domain/entities/category.entity'
import { Color } from 'domain/value-objects/color'
import { Description } from 'domain/value-objects/description'

export class CategoryPrismaMapper {
  static toDomain(category: RawCategory): Category {
    return Category.create(
      {
        color: Color.create(category.color),
        parent: category.parent_id ?? undefined,
        active: category.active,
        user: category.cognito_id,
        type: CategoryUtils.mapCategoryTypeEnum(category.type),
        description: Description.create(category.description)
      },
      category.id,
      category.created_at,
      category.updated_at
    )
  }

  static toPrismaCategory(category: Category): RawCategory {
    return {
      id: category.id!,
      created_at: category.createdAt!,
      updated_at: category.updatedAt!,
      description: category.props.description.props.value,
      color: category.props.color.props.value,
      parent_id: category.props.parent!,
      active: category.props.active,
      type: category.props.type,
      cognito_id: category.props.user
    }
  }
}
