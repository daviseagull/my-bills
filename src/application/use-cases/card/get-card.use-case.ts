import { ICardRepository } from 'application/repositories/card.repository'
import { CardMapper } from 'domain/mappers/card.mapper'
import logger from 'infra/logger/logger'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCardUseCase {
  constructor(
    @inject('CardRepository') private cardRepository: ICardRepository
  ) {}

  public async execute(cognitoId: string, id: string) {
    logger.info(`Getting card with id ${id} for user ${cognitoId}`)

    const card = await this.cardRepository.findByUserAndId(cognitoId, id)

    return CardMapper.toCardDto(card!)
  }
}
