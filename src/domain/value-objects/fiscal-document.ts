import { BadRequestError } from '@/application/errors/app-error'
import { cpf as CPF } from 'cpf-cnpj-validator'
import { ValueObject } from '../abstracts/value-object'

interface FiscalDocumentProps {
  value: string
}

export class FiscalDocument extends ValueObject<FiscalDocumentProps> {
  private constructor(props: FiscalDocumentProps) {
    super(props)
  }

  public static create(value: string): FiscalDocument {
    if (!CPF.isValid(value)) {
      throw new BadRequestError('Fiscal document must be valid')
    }

    return new FiscalDocument({ value: CPF.strip(value) })
  }
}
