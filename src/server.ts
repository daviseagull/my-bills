import 'express-async-errors'
import logger from '@/logger'
import { configDotenv } from 'dotenv'
import { app } from '@/app'

configDotenv({ path: './.env' })

app.listen(3333, () => logger.info('Server is running in port 3333'))
