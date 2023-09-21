import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { CognitoService } from '@/infra/authentication/service/cognito.service'

const authController = new AuthController()
const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)
authRoutes.post('/sign-up', authController.signUp)
authRoutes.post('/resend-code', authController.resendCode)
authRoutes.post('/confirm-user', authController.confirmUser)

export { authRoutes }
