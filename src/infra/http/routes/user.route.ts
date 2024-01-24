import { Router } from 'express'
import { container } from 'tsyringe'
import { UserController } from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const controller = container.resolve(UserController)
const userRoutes = Router()

userRoutes.get('', authenticateToken, controller.getUser)

export default userRoutes
