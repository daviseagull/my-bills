import { Router } from 'express'
import { CreateUserController } from '@/features/users/controllers/create-user.controller'

const controller = new CreateUserController()
const userRoutes = Router()

userRoutes.post('/', controller.handle)

export { userRoutes }
