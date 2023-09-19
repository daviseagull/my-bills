import { Name } from '@/features/auth/models/name'

export interface CreateUserDto {
  username: string
  password: string
  email: string
  name: Name
  birthdate: Date
  gender: string
  phone: string
}
