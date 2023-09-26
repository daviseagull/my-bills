import { AppError } from '@/application/errors/app-error'
import { ValueObject } from '../abstracts/value-object'
import { cpf as CPF } from 'cpf-cnpj-validator'

interface FiscalDocumentProps {
  value: string
}

export class FiscalDocument extends ValueObject<FiscalDocumentProps> {
  private constructor(props: FiscalDocumentProps) {
    super(props)
  }

  public static create(value: string): FiscalDocument {
    if (!CPF.isValid(value)) {
      throw new AppError('Fiscal document must be valid', 400)
    }

    return new FiscalDocument({ value: CPF.strip(value) })
  }
}
