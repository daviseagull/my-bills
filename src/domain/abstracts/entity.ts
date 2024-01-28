import { Id } from '../value-objects/id'

export abstract class Entity<T> {
  protected _id?: Id | null
  protected _createdAt?: Date
  protected _updatedAt?: Date
  public props: T

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  constructor(props: T, id?: Id, createdAt?: Date, updatedAt?: Date) {
    this.props = props
    this._id = id
    this._createdAt = createdAt
    this._updatedAt = updatedAt
  }
}
