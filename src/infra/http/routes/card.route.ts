import { Router } from 'express'
import { container } from 'tsyringe'
import { CardController } from '../controllers/card.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const controller = container.resolve(CardController)
const cardRoutes = Router()

cardRoutes.post('', authenticateToken, controller.create)

export default cardRoutes
