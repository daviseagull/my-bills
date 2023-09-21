import { Router } from 'express'
import { authRoutes } from './auth.route'

const unauthenticatedRoutes = Router()

unauthenticatedRoutes.use('/auth', authRoutes)

export { unauthenticatedRoutes }
