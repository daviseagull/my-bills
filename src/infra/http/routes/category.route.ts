import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { authenticateToken } from '../middlewares/authenticate.middleware'

const categoryController = new CategoryController()
const categoryRoutes = Router()

categoryRoutes.get(
  '/:type',
  authenticateToken,
  categoryController.getCategories
)

categoryRoutes.post('/:type', authenticateToken, categoryController.addCategory)

export default categoryRoutes
