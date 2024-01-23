import { Card } from 'domain/entities/card.entity'

export interface ICardRepository {
  create(card: Card): Promise<string>
  delete(id: string): Promise<void>
  update(card: Card): Promise<string>
  findById(id: string): Promise<Card>
  findAllByUser(userId: string): Promise<Card[]>
}
