import { CardDto } from '../dtos/card.dto'
import { Card } from '../entities/card.entity'

export class CardMapper {
  static toCardDto(cards: Card[]): CardDto[] {
    return cards.map((card: Card) => {
      return {
        id: card.id!,
        createdAt: card.createdAt!.toISOString(),
        updatedAt: card.updatedAt!.toISOString(),
        brand: card.props.brand,
        user: card.props.user,
        account: card.props.account,
        description: card.props.description.props.value,
        closingDay: card.props.closingDay.props.value,
        dueDate: card.props.dueDate.props.value,
        limit: card.props.limit.props.value
      }
    })
  }
}
