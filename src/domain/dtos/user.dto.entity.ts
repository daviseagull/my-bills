export interface NameDto {
  first: string
  last: string
  fullname: string
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
