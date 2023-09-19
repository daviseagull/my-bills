import { Router } from 'express'
import { SignUpController } from '@/features/auth/controllers/sign-up.controller'
import { ConfirmUserController } from '@/features/auth/controllers/confirm-user.controller'
import { SignInController } from '@/features/auth/controllers/sign-in.controller'

const signUpController = new SignUpController()
const signInController = new SignInController()
const confirmUserController = new ConfirmUserController()
const authRoutes = Router()

authRoutes.post('/auth/sign-up', signUpController.handle)
authRoutes.post('/auth/sign-in', signInController.handle)
authRoutes.post('/auth/confirm-user', confirmUserController.handle)

export { authRoutes }
