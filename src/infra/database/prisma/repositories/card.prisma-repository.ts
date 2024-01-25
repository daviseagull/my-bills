import { InternalServerError } from '@/application/errors/app-error'
import { ICardRepository } from '@/application/repositories/card.repository'
import { Card } from '@/domain/entities/card.entity'
import { CardPrismaMapper } from '../mappers/card.prisma-mapper'
import prisma from '../prisma-client'

export class CardPrismaRepository implements ICardRepository {
  constructor() {}

  async create(card: Card): Promise<string> {
    const prismaCard = CardPrismaMapper.toPrisma(card)

    const createdCard = await prisma.card.create({
      data: prismaCard
    })

    if (!createdCard) {
      throw new InternalServerError(
        `Couldn't create card ${card.props.description}`
      )
    }

    return createdCard.id
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  update(card: Card): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async findByUserAndId(cognitoId: string, id: string): Promise<Card | null> {
    const card = await prisma.card.findUnique({
      where: {
        cognito_id: cognitoId,
        id
      }
    })

    return card ? CardPrismaMapper.toDomain(card!) : null
  }

  async findAllByUser(cognitoId: string): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        cognito_id: cognitoId
      }
    })

    return cards ? cards.map((card) => CardPrismaMapper.toDomain(card!)) : []
  }

  async exists(cognitoId: string, description: string): Promise<boolean> {
    const card = await prisma.card.count({
      where: {
        cognito_id: cognitoId,
        description
      }
    })

    return card !== 0
  }
}
