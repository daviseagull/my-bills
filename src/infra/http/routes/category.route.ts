import { Router } from 'express'
import { container } from 'tsyringe'
import { CategoryController } from '../controllers/category.controller'

const controller = container.resolve(CategoryController)
const categoryRoutes = Router()

categoryRoutes.get('/:type', controller.getCategories)

categoryRoutes.post('', controller.addCategory)

categoryRoutes.put('', controller.editCategory)

export default categoryRoutes
