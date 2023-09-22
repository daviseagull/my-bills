import { Router } from 'express'
import userRoutes from './routes/user.route'

const authenticatedRoutes = Router()

authenticatedRoutes.use('/users', userRoutes)

export default authenticatedRoutes
