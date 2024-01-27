import { Router } from 'express'
import { container } from 'tsyringe'
import { UserController } from '../controllers/user.controller'

const controller = container.resolve(UserController)
const userRoutes = Router()

userRoutes.get('', controller.getUser)

export default userRoutes
