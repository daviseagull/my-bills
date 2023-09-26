import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const userController = new UserController()
const userRoutes = Router()

userRoutes.get('', authenticateToken, userController.getUser)

export default userRoutes
