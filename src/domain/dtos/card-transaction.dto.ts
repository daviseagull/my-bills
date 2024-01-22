export type CardTransactionDto = {
  id: string
  createdAt: string
  updatedAt: string
  user: string
  card: string
  type: string
  date: string
  description: string
  category: string
  recurrence: boolean
  payments: number
  value: number
}
