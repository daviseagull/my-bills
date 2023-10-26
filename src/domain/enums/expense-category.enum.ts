export enum ExpenseCategoriesEnum {
  Clothing = 'Clothing',
  Education = 'Education',
  Health = 'Health',
  Home = 'Home',
  Leisure = 'Leisure',
  Others = 'Others',
  Restaurants = 'Restaurants',
  Supermarket = 'Supermarket',
  Transportation = 'Transportation',
  Travel = 'Travel'
}

export const ExpenseCategoriesColor = new Map<string, string>([
  [ExpenseCategoriesEnum.Clothing, '#FFC8A2'],
  [ExpenseCategoriesEnum.Education, '#ECD5E3'],
  [ExpenseCategoriesEnum.Health, '#F3B0C3'],
  [ExpenseCategoriesEnum.Home, '#FFCCB6'],
  [ExpenseCategoriesEnum.Leisure, '#ABD336'],
  [ExpenseCategoriesEnum.Others, '#FF968A'],
  [ExpenseCategoriesEnum.Restaurants, '#D4F0F0'],
  [ExpenseCategoriesEnum.Supermarket, '#CCE2CB'],
  [ExpenseCategoriesEnum.Transportation, '#FCB9AA'],
  [ExpenseCategoriesEnum.Travel, '#FEE1E8']
])
