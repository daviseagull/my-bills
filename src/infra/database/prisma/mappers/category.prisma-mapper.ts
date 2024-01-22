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
        parent: category.parent ?? undefined,
        active: category.active,
        user: category.user,
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
      parent: category.props.parent!,
      active: category.props.active,
      type: category.props.type,
      user: category.props.user
    }
  }
}
