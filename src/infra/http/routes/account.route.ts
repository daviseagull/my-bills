import { Router } from 'express'
import { container } from 'tsyringe'
import { AccountController } from '../controllers/account.controller'

const controller = container.resolve(AccountController)
const accountRoutes = Router()

accountRoutes.post('', controller.create)
accountRoutes.get('/:id', controller.getAccount)
accountRoutes.get('', controller.getAccounts)

export default accountRoutes
