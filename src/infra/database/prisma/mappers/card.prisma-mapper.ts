import { CardUtils } from '@/application/utils/card.utils'
import { Card } from '@/domain/entities/card.entity'
import { CardLimit } from '@/domain/value-objects/card-limit'
import { DayOfMonth } from '@/domain/value-objects/day-of-month'
import { Description } from '@/domain/value-objects/description'
import { Id } from '@/domain/value-objects/id'
import { Card as RawCard } from '@prisma/client'

export class CardPrismaMapper {
  static toDomain(card: RawCard): Card {
    return Card.create(
      {
        user: Id.create('Cognito', card.cognito_id)!,
        brand: CardUtils.mapCardTypeEnum(card.brand),
        description: Description.create(card.description),
        closingDay: DayOfMonth.create(card.closing_day),
        dueDate: DayOfMonth.create(card.due_date),
        limit: CardLimit.create(card.limit)
      },
      card.id,
      card.created_at,
      card.updated_at
    )
  }

  static toPrisma(card: Card): RawCard {
    return {
      id: card.id!,
      created_at: card.createdAt!,
      updated_at: card.updatedAt!,
      cognito_id: card.props.user.props.value,
      brand: card.props.brand,
      description: card.props.description.props.value,
      closing_day: card.props.closingDay.props.value,
      due_date: card.props.dueDate.props.value,
      limit: card.props.limit.props.value
    }
  }
}
