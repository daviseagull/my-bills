import { Router } from 'express'
import accountRoutes from './account.route'
import authRoutes from './auth.route'
import cardRoutes from './card.route'
import categoryRoutes from './category.route'
import userRoutes from './user.route'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/v1/users', userRoutes)
routes.use('/v1/categories', categoryRoutes)
routes.use('/v1/accounts', accountRoutes)
routes.use('/v1/cards', cardRoutes)

export default routes
