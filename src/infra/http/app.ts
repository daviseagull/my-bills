import rTracer from 'cls-rtracer'
import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import 'shared/dependency-injection/container'
import { errorHandler } from './middlewares/error-handler.middleware'
import routes from './routes'

const app = express()

app.use(rTracer.expressMiddleware())

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.all('/*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Cannot find specified route'
  })
})

export default app
