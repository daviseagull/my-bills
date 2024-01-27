import { Router } from 'express'
import { container } from 'tsyringe'
import { TransactionController } from '../controllers/transaction.controller'

const controller = container.resolve(TransactionController)
const transactionRoutes = Router()

transactionRoutes.post('', controller.create)
transactionRoutes.get('/:id', controller.getTransaction)
transactionRoutes.get('', controller.getTransactions)

export default transactionRoutes
