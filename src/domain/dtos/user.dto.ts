export type NameDto = {
  first: string
  last: string
  full: string
}

export type UserDto = {
  id: string
  email: string
  name: NameDto
  birthday: Date
  fiscalDocument: string
  gender: string
  phone: string
}
