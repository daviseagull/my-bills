import { AttributeType } from '@aws-sdk/client-cognito-identity-provider/dist-types/models/models_0'

export class UserAttribute implements AttributeType {
  constructor(name: string, value: string) {
    this.Name = name
    this.Value = value
  }

  Name: string | undefined
  Value: string
}
