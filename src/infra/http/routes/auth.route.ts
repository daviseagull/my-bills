import { Router } from 'express'
import { container } from 'tsyringe'
import { AuthController } from '../controllers/auth.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const controller = container.resolve(AuthController)

const authRoutes = Router()

authRoutes.post('/sign-in', controller.signIn)
authRoutes.post('/sign-up', controller.signUp)
authRoutes.post('/sign-out', authenticateToken, controller.signOut)
authRoutes.post('/resend-code', controller.resendCode)
authRoutes.post('/confirm-user', controller.confirmUser)
authRoutes.post('/forgot-password', controller.forgotPassword)
authRoutes.post('/confirm-forgot-password', controller.confirmForgotPassword)

export default authRoutes
