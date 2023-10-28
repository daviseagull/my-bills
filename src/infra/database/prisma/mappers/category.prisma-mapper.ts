import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
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
        description: category.description
      },
      category.id
    )
  }

  static toPrismaCategory(category: Category): RawCategory {
    return {
      id: category.id!,
      description: category.props.description,
      color: category.props.color.props.value,
      parent: category.props.parent!,
      active: category.props.active,
      type: category.props.type,
      user: category.props.user
    }
  }
}
