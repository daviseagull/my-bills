import { Entity } from '../abstracts/entity'
import { CategoryTypeEnum } from '../enums/category-type.enum'
import { Color } from '../value-objects/color'

type CategoryProps = {
  user: string
  type: CategoryTypeEnum
  description: string
  color: Color
  parent?: string
  active: boolean
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id
  }

  static create(props: CategoryProps, id?: string) {
    return new Category(props, id)
  }
}
