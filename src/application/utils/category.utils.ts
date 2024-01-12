import { Category } from '@/domain/entities/category.entity'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import {
  ExpenseCategoriesColor,
  ExpenseCategoriesEnum
} from '@/domain/enums/expense-category.enum'
import {
  IncomeCategoriesColor,
  IncomeCategoriesEnum
} from '@/domain/enums/income-category.enum'
import { Color } from '@/domain/value-objects/color'

export class CategoryUtils {
  public static mapCategoryTypeEnum(value: string): CategoryTypeEnum {
    return value === CategoryTypeEnum.expenses
      ? CategoryTypeEnum.expenses
      : CategoryTypeEnum.incomes
  }

  public static createDefaultCategories(user: string): Category[] {
    const categories: Category[] = []

    CategoryUtils.createIncomes(categories, user)
    CategoryUtils.createExpenses(categories, user)

    return categories
  }

  private static createExpenses(categories: Category[], user: string) {
    Object.values(ExpenseCategoriesEnum).forEach((key) => {
      categories.push(
        Category.create({
          type: CategoryTypeEnum.expenses,
          user: user,
          color: Color.create(ExpenseCategoriesColor.get(key)!),
          description: key.toString(),
          active: true
        })
      )
    })
  }

  private static createIncomes(categories: Category[], user: string) {
    Object.values(IncomeCategoriesEnum).forEach((key) => {
      categories.push(
        Category.create({
          type: CategoryTypeEnum.incomes,
          user: user,
          color: Color.create(IncomeCategoriesColor.get(key)!),
          description: key.toString(),
          active: true
        })
      )
    })
  }
}
