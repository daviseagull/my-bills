import { Category } from '@/domain/entities/category.entity'
import { Category as RawCategory } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(raw: RawCategory): Category {
    const category = Category.create(
      {
        user: raw.user,
        incomes: raw.incomes,
        expenses: raw.expenses
      },
      raw.id
    )

    return category
  }
}
