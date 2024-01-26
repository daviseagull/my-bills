import { Router } from 'express'
import { container } from 'tsyringe'
import { TransactionController } from '../controllers/transaction.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const controller = container.resolve(TransactionController)
const transactionRoutes = Router()

transactionRoutes.post('', authenticateToken, controller.create)
transactionRoutes.get('/:id', authenticateToken, controller.getTransaction)
transactionRoutes.get('', authenticateToken, controller.getTransactions)

export default transactionRoutes
