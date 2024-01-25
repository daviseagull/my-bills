import { BadRequestError } from '@/application/errors/app-error'
import { ICardRepository } from '@/application/repositories/card.repository'
import { CardUtils } from '@/application/utils/card.utils'
import { StringUtils } from '@/application/utils/string.utils'
import { Card } from '@/domain/entities/card.entity'
import { CardBrandEnum } from '@/domain/enums/card-brand.enum'
import { CardLimit } from '@/domain/value-objects/card-limit'
import { DayOfMonth } from '@/domain/value-objects/day-of-month'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import logger from '@/infra/logger/logger'
import { inject, injectable } from 'tsyringe'
import { GetAccountUseCase } from '../account/get-account.use-case'

export type CreateCardRequest = {
  brand: CardBrandEnum
  description: string
  closingDay: number
  dueDate: number
  limit: number
}

@injectable()
export class CreateCardUseCase {
  constructor(
    @inject('CardRepository') private repository: ICardRepository,
    @inject('GetAccountUseCase') private getAccount: GetAccountUseCase
  ) {}

  public async execute(
    request: CreateCardRequest,
    user: string
  ): Promise<string> {
    logger.info(`Creating card with description ${request.description}`)

    const exists = await this.repository.exists(
      user,
      StringUtils.capitalizeFirstLetter(request.description)
    )

    if (exists) {
      throw new BadRequestError(
        `Card with description ${request.description} already exists.`
      )
    }

    const newCard = Card.create({
      user: Id.create(user, 'User'),
      brand: CardUtils.mapCardTypeEnum(request.brand),
      description: Description.create(request.description),
      closingDay: DayOfMonth.create(request.closingDay),
      dueDate: DayOfMonth.create(request.dueDate),
      limit: CardLimit.create(request.limit)
    })

    return await this.repository.create(newCard)
  }
}
