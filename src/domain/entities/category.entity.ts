import { Entity } from '../abstracts/entity'

export interface ICategory {
  description: string
  parent?: string | null
}

type CategoryProps = {
  user: string
  incomes: ICategory[]
  expenses: ICategory[]
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
