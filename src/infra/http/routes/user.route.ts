import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const userController = new UserController()
const userRoutes = Router()

userRoutes.post('/sign-out', userController.signOut)

export { userRoutes }
