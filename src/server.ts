import 'express-async-errors'
import express from 'express'
import { routes } from '@/routes'
import logger from '@/logger'
import { verifyToken } from '@/routes/middlewares/verify-token'
import { errorHandling } from '@/routes/middlewares/error-handling'

const app = express()

app.use(express.json())
app.use(verifyToken)
app.use(routes)
app.use(errorHandling)

app.listen(3333, () => logger.info('Server is running in port 3333'))
