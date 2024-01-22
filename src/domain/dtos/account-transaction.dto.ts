export type AccountTransactionDto = {
  id: string
  createdAt: string
  updatedAt: string
  user: string
  account: string
  type: string
  date: string
  description: string
  category: string
  recurrence: boolean
  repeat: boolean
  value: number
}
