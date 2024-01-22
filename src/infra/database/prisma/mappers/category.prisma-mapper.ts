import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import { Description } from '@/domain/value-objects/description'
import { Category as RawCategory } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(category: RawCategory): Category {
    return Category.create(
      {
        color: Color.create(category.color),
        parent: category.parentId ?? undefined,
        active: category.active,
        user: category.cognitoId,
        type: CategoryUtils.mapCategoryTypeEnum(category.type),
        description: Description.create(category.description)
      },
      category.id,
      category.createdAt,
      category.updatedAt
    )
  }

  static toPrismaCategory(category: Category): RawCategory {
    return {
      id: category.id!,
      createdAt: category.createdAt!,
      updatedAt: category.updatedAt!,
      description: category.props.description.props.value,
      color: category.props.color.props.value,
      parentId: category.props.parent!,
      active: category.props.active,
      type: category.props.type,
      cognitoId: category.props.user
    }
  }
}
