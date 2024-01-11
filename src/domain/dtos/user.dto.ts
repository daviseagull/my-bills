export interface NameDto {
  first: string
  last: string
  full: string
}

export interface UserDto {
  id: string
  email: string
  name: NameDto
  birthday: Date
  fiscalDocument: string
  gender: string
  phone: string
}
