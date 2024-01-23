import { Card } from 'domain/entities/card.entity'

export interface ICardRepository {
  create(card: Card): Promise<string>
  delete(id: string): Promise<void>
  update(card: Card): Promise<string>
  findByUserAndId(cognitoId: string, id: string): Promise<Card | null>
  findAllByUser(cognitoId: string): Promise<Card[]>
}
