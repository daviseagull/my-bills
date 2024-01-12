import { BadRequestError } from '@/application/errors/app-error'
import { cpf as CPF } from 'cpf-cnpj-validator'
import { StringProp, ValueObject } from '../abstracts/value-object'

type FiscalDocumentProps = StringProp

export class FiscalDocument extends ValueObject<FiscalDocumentProps> {
  private constructor(props: StringProp) {
    super(props)
  }

  public static create(value: string): FiscalDocument {
    if (!CPF.isValid(value)) {
      throw new BadRequestError('Fiscal document must be valid')
    }

    return new FiscalDocument({ value: CPF.strip(value) })
  }
}
