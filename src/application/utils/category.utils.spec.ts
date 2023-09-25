import { CategoryUtils } from './category.utils'

describe('createDefaultIncome', () => {
  it('should return an array of income categories with descriptions', () => {
    const result = CategoryUtils.createDefaultIncome()

    const expected = [
      { description: 'Awards' },
      { description: 'Gift' },
      { description: 'Investments' },
      { description: 'Others' },
      { description: 'Salary' }
    ]

    expect(result).toEqual(expected)
  })

  it('should return an array of expenses categories with descriptions', () => {
    const result = CategoryUtils.createDefaultExpense()

    const expected = [
      { description: 'Clothing' },
      { description: 'Education' },
      { description: 'Health' },
      { description: 'Home' },
      { description: 'Leisure' },
      { description: 'Others' },
      { description: 'Restaurants' },
      { description: 'Supermarket' },
      { description: 'Transportation' },
      { description: 'Travel' }
    ]

    expect(result).toEqual(expected)
  })
})
