import { InternalServerError } from '@/application/errors/app-error'
import { ICardRepository } from '@/application/repositories/card.repository'
import { Card } from '@/domain/entities/card.entity'
import { PrismaClient } from '@prisma/client'
import { CardPrismaMapper } from '../mappers/card.prisma-mapper'

export class CardPrismaRepository implements ICardRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(card: Card): Promise<string> {
    const prismaCard = CardPrismaMapper.toPrisma(card)

    const createdCard = await this.prisma.card.create({
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
    const card = await this.prisma.card.findUnique({
      where: {
        cognito_id: cognitoId,
        id
      }
    })

    return card ? CardPrismaMapper.toDomain(card!) : null
  }

  async findAllByUser(cognitoId: string): Promise<Card[]> {
    const cards = await this.prisma.card.findMany({
      where: {
        cognito_id: cognitoId
      }
    })

    return cards ? cards.map((card) => CardPrismaMapper.toDomain(card!)) : []
  }

  async exists(cognitoId: string, description: string): Promise<boolean> {
    const card = await this.prisma.card.count({
      where: {
        cognito_id: cognitoId,
        description
      }
    })

    return card !== 0
  }
}
