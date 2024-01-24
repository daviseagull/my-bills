import { Category as RawCategory } from '@prisma/client'
import { CategoryUtils } from 'application/utils/category.utils'
import { Category } from 'domain/entities/category.entity'
import { Color } from 'domain/value-objects/color'
import { Description } from 'domain/value-objects/description'
import { Id } from 'domain/value-objects/id'

export class CategoryPrismaMapper {
  static toDomain(category: RawCategory): Category {
    return Category.create(
      {
        color: Color.create(category.color),
        parent: category.parent_id
          ? Id.create(category.parent_id!, 'Parent')
          : undefined,
        active: category.active,
        user: Id.create(category.cognito_id, 'User'),
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
      parent_id: category.props.parent!.props.value,
      active: category.props.active,
      type: category.props.type,
      cognito_id: category.props.user.props.value
    }
  }
}
