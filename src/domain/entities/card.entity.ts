import { Entity } from '../abstracts/entity'
import { CardBrandEnum } from '../enums/card-brand.enum'
import { CardLimit } from '../value-objects/card-limit'
import { DayOfMonth } from '../value-objects/day-of-month'
import { Description } from '../value-objects/description'
import { Id } from '../value-objects/id'

type CardProps = {
  user: Id
  brand: CardBrandEnum
  description: Description
  closingDay: DayOfMonth
  dueDate: DayOfMonth
  limit: CardLimit
}

export class Card extends Entity<CardProps> {
  private constructor(
    props: CardProps,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(props: CardProps, id?: Id, createdAt?: Date, updatedAt?: Date) {
    return new Card(props, id, createdAt, updatedAt)
  }
}
