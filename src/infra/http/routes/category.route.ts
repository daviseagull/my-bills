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

export default categoryRoutes
