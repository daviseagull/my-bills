import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const userController = new UserController()
const userRoutes = Router()

userRoutes.post('/sign-out', userController.signOut)
userRoutes.get('/:email', userController.getUser)

export default userRoutes
