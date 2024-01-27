import { Router } from 'express'
import { container } from 'tsyringe'
import { CardController } from '../controllers/card.controller'

const controller = container.resolve(CardController)
const cardRoutes = Router()

cardRoutes.post('', controller.create)
cardRoutes.get('/:id', controller.getCard)
cardRoutes.get('', controller.getCards)

export default cardRoutes
