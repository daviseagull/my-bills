import { PrismaClient } from '@prisma/client'
import { InternalServerError } from 'application/errors/app-error'
import { ICardRepository } from 'application/repositories/card.repository'
import { Card } from 'domain/entities/card.entity'
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

  findById(id: string): Promise<Card> {
    throw new Error('Method not implemented.')
  }

  findAllByUser(cognitoId: string): Promise<Card[]> {
    throw new Error('Method not implemented.')
  }
}
