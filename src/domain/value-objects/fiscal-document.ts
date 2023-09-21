import { AppError } from '@/application/error/app-error'
import { ValueObject } from '../abstracts/value-object'
import { cpf } from 'cpf-cnpj-validator'

interface FiscalDocumentProps {
  value: string
}

export class FiscalDocument extends ValueObject<FiscalDocumentProps> {
  private constructor(props: FiscalDocumentProps) {
    super(props)
  }

  public static create(value: string): FiscalDocument {
    if (cpf.isValid(value)) {
      throw new AppError(
        'Fiscal document must have between 2 and 20 characters',
        400
      )
    }

    cpf.strip
    return new FiscalDocument({ value })
  }
}
