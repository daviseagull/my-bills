import serverless from 'serverless-http'
import { configDotenv } from 'dotenv'
import express from 'express'
import 'express-async-errors'
import { errorHandler } from '@/infra/http/middlewares/error-handler.middleware'
import unauthenticatedRoutes from './infra/http/unauthenticated-routes'
import { authenticateToken } from './infra/http/middlewares/authenticate.middleware'
import authenticatedRoutes from './infra/http/authenticated-routes'

configDotenv()
const app = express()

app.use(express.json())
app.use(unauthenticatedRoutes)
app.use(authenticateToken)
app.use(authenticatedRoutes)
app.use(errorHandler)

export const handler = serverless(app)
