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
  email: string
  name: NameDto
  birthday: Date
  fiscalDocument: string
  gender: string
  phone: PhoneDto
}
