import { Id } from 'domain/value-objects/id'
import { Entity } from '../abstracts/entity'
import { CardBrandEnum } from '../enums/card-brand.enum'
import { CardLimit } from '../value-objects/card-limit'
import { DayOfMonth } from '../value-objects/day-of-month'
import { Description } from '../value-objects/description'

type CardProps = {
  user: Id
  account: Id
  brand: CardBrandEnum
  description: Description
  closingDay: DayOfMonth
  dueDate: DayOfMonth
  limit: CardLimit
}

export class Card extends Entity<CardProps> {
  private constructor(
    props: CardProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: CardProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new Card(props, id, createdAt, updatedAt)
  }
}
