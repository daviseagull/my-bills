import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticate.middleware'
import accountRoutes from './account.route'
import authRoutes from './auth.route'
import cardRoutes from './card.route'
import categoryRoutes from './category.route'
import transactionRoutes from './transaction.route'
import userRoutes from './user.route'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/v1/users', authenticateToken, userRoutes)
routes.use('/v1/categories', authenticateToken, categoryRoutes)
routes.use('/v1/accounts', authenticateToken, accountRoutes)
routes.use('/v1/cards', authenticateToken, cardRoutes)
routes.use('/v1/transactions', authenticateToken, transactionRoutes)

export default routes
