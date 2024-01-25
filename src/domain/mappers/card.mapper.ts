import { CardDto } from '../dtos/card.dto'
import { Card } from '../entities/card.entity'

export class CardMapper {
  static toCardDto(card: Card): CardDto {
    return {
      id: card.id!,
      createdAt: card.createdAt!.toISOString(),
      updatedAt: card.updatedAt!.toISOString(),
      brand: card.props.brand,
      user: card.props.user.props.value,
      description: card.props.description.props.value,
      closingDay: card.props.closingDay.props.value,
      dueDate: card.props.dueDate.props.value,
      limit: card.props.limit.props.value
    }
  }

  static toCardsDto(cards: Card[]): CardDto[] {
    return cards.map((card: Card) => {
      return this.toCardDto(card)
    })
  }
}
