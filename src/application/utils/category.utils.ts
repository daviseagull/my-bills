import { ICategory } from '@/domain/entities/user-categories.entity'
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
  public static createDefaultIncome() {
    const categories: ICategory[] = []

    Object.values(IncomeCategoriesEnum).forEach((key, index) => {
      categories.push({
        color: Color.create(IncomeCategoriesColor.get(key)!),
        description: key.toString(),
        active: true
      })
    })

    return categories
  }

  public static createDefaultExpense() {
    const categories: ICategory[] = []

    Object.values(ExpenseCategoriesEnum).forEach((key, index) => {
      categories.push({
        color: Color.create(ExpenseCategoriesColor.get(key)!),
        description: key.toString(),
        active: true
      })
    })

    return categories
  }
}
