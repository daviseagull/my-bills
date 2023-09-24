import { ICategory } from '@/domain/entities/category.entity'
import { ExpenseCategoriesEnum } from '@/domain/enums/expense-category.enum'
import { IncomeCategoriesEnum } from '@/domain/enums/income-category.enum'

export class CategoryUtils {
  public static createDefaultIncome() {
    const categories: ICategory[] = []

    Object.values(IncomeCategoriesEnum).forEach((key, index) => {
      categories.push({
        description: key.toString()
      })
    })

    return categories
  }

  public static createDefaultExpense() {
    const categories: ICategory[] = []

    Object.keys(ExpenseCategoriesEnum).forEach((key, index) => {
      categories.push({
        description: key.toString()
      })
    })

    return categories
  }
}
