export enum IncomeCategoriesEnum {
  Awards = 'Awards',
  Gift = 'Gift',
  Investments = 'Investments',
  Others = 'Others',
  Salary = 'Salary'
}

export const IncomeCategoriesColor = new Map<string, string>([
  [IncomeCategoriesEnum.Awards, '#F6EAC2'],
  [IncomeCategoriesEnum.Gift, '#A2E1DB'],
  [IncomeCategoriesEnum.Investments, '#8FCACA'],
  [IncomeCategoriesEnum.Others, '#FFAEA5'],
  [IncomeCategoriesEnum.Salary, '#ECEAE4']
])
