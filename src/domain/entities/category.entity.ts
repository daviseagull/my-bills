import { Entity } from '../abstracts/entity'
import { CategoryTypeEnum } from '../enums/category-type.enum'
import { Color } from '../value-objects/color'
import { Description } from '../value-objects/description'
import { Id } from '../value-objects/id'

type CategoryProps = {
  user: Id
  type: CategoryTypeEnum
  description: Description
  color: Color
  parent?: Id
  active: boolean
}

export class Category extends Entity<CategoryProps> {
  private constructor(
    props: CategoryProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: CategoryProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new Category(props, id, createdAt, updatedAt)
  }
}
