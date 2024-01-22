export abstract class Entity<T> {
  protected _id?: string
  protected _createdAt?: Date
  protected _updatedAt?: Date
  public props: T

  constructor(props: T, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.props = props
    this._id = id
    this._createdAt = createdAt
    this._updatedAt = updatedAt
  }
}
