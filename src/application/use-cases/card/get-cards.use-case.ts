import { ICardRepository } from 'application/repositories/card.repository'
import { CardMapper } from 'domain/mappers/card.mapper'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCardsUseCase {
  constructor(
    @inject('CardRepository') private cardRepository: ICardRepository
  ) {}

  public async execute(cognitoId: string) {
    logger.info(`Getting cards for user ${cognitoId}`)

    const cards = await this.cardRepository.findAllByUser(cognitoId)

    return CardMapper.toCardsDto(cards)
  }
}
