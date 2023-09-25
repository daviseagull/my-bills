import { Router } from 'express'
import authRoutes from './auth.route'
import categoryRoutes from './category.route'
import userRoutes from './user.route'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/v1/users', userRoutes)
routes.use('/v1/categories', categoryRoutes)

export default routes
