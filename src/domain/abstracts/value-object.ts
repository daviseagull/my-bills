import { shallowEqual } from 'shallow-equal-object'

export type StringProp = {
  value: string
}

export type NumberProp = {
  value: number
}

export abstract class ValueObject<T> {
  public readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (vo.props === undefined) {
      return false
    }
    return shallowEqual(this.props, vo.props)
  }
}
