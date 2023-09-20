import { Router } from 'express'
import { SignUpController } from '@/infra/http/controllers/sign-up.controller'
import { ConfirmUserController } from '@/infra/http/controllers/confirm-user.controller'
import { SignInController } from '@/infra/http/controllers/sign-in.controller'
import { ResendCodeController } from '../controllers/resend-code.controller'

const signUpController = new SignUpController()
const signInController = new SignInController()
const confirmUserController = new ConfirmUserController()
const resendCodeController = new ResendCodeController()
const authRoutes = Router()

authRoutes.post('/auth/sign-up', signUpController.handle)
authRoutes.post('/auth/sign-in', signInController.handle)
authRoutes.post('/auth/confirm-user', confirmUserController.handle)
authRoutes.post('/auth/resend-code', resendCodeController.handle)

export { authRoutes }
