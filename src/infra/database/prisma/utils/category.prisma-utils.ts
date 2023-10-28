import { CategoryUtils } from '@/application/utils/category.utils'
import { Category } from '@/domain/entities/category.entity'
import { Color } from '@/domain/value-objects/color'
import { Category as PrismaCategory } from '@prisma/client'

export class CategoryPrismaUtils {
  static toCategory(category: PrismaCategory[]): Category[] {
    const categories = category.map((category: PrismaCategory) => {
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
    })
    return categories
  }

  static toPrismaCategories(categories: Category[]): PrismaCategory[] {
    const prismaCategories = categories.map((category: Category) => {
      return {
        id: category.id!,
        description: category.props.description,
        color: category.props.color.props.value,
        parent: category.props.parent!,
        active: category.props.active,
        type: category.props.type,
        user: category.props.user
      }
    })
    return prismaCategories
  }
}
