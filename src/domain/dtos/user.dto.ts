export type NameDto = {
  first: string
  last: string
  full: string
}

export type PhoneDto = {
  country: string
  areaCode: number
  number: number
}

export type UserDto = {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  name: NameDto
  birthday: string
  phone: PhoneDto
}
