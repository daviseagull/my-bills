import { Router } from 'express'
import { authRoutes } from './routes/auth.route'

const unauthenticatedRoutes = Router()

unauthenticatedRoutes.use('/auth', authRoutes)

export { unauthenticatedRoutes }
