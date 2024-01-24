import { Router } from 'express'
import { container } from 'tsyringe'
import { CategoryController } from '../controllers/category.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const controller = container.resolve(CategoryController)
const categoryRoutes = Router()

categoryRoutes.get('/:type', authenticateToken, controller.getCategories)

categoryRoutes.post('', authenticateToken, controller.addCategory)

categoryRoutes.put('', authenticateToken, controller.editCategory)

export default categoryRoutes
