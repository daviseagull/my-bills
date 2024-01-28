import { Entity } from '../abstracts/entity'
import { InvoiceStausEnum } from '../enums/invoice-status.enum'
import { Id } from '../value-objects/id'

type InvoiceProps = {
  user: Id
  card: Id
  total: number
  status: InvoiceStausEnum
  closingDate: Date
  dueDate: Date
}

export class Invoice extends Entity<InvoiceProps> {
  private constructor(
    props: InvoiceProps,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create(
    props: InvoiceProps,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new Invoice(props, id, createdAt, updatedAt)
  }
}
