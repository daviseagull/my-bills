import { AccountTypeEnum } from '../enums/account-type.enum'
import { Color } from '../value-objects/color'

export type AccountDto = {
  id: string
  createdAt: string
  updatedAt: string
  type: AccountTypeEnum
  user: string
  description: string
  balance: number
  color: Color
}
