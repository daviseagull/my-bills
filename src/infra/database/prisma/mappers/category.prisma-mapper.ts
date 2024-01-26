import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import { Category as RawCategory } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(category: RawCategory): Category {
    const parent = category.parent_id
      ? Id.create(category.parent_id!, 'Parent')
      : undefined

    return Category.create(
      {
        color: Color.create(category.color),
        parent: parent,
        active: category.active,
        user: Id.create('Cognito', category.cognito_id)!,
        type: CategoryUtils.mapCategoryTypeEnum(category.type),
        description: Description.create(category.description)
      },
      category.id,
      category.created_at,
      category.updated_at
    )
  }

  static toPrismaCategory(category: Category): RawCategory {
    const parentId = category.props.parent
      ? category.props.parent.props.value
      : null

    return {
      id: category.id!,
      created_at: category.createdAt!,
      updated_at: category.updatedAt!,
      description: category.props.description.props.value,
      color: category.props.color.props.value,
      parent_id: parentId,
      active: category.props.active,
      type: category.props.type,
      cognito_id: category.props.user.props.value
    }
  }
}
