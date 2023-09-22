import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const authController = new AuthController()
const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)
authRoutes.post('/sign-up', authController.signUp)
authRoutes.post('/resend-code', authController.resendCode)
authRoutes.post('/confirm-user', authController.confirmUser)
authRoutes.post('/forgot-password', authController.forgotPassword)
authRoutes.post(
  '/confirm-forgot-password',
  authController.confirmForgotPassword
)

export default authRoutes
