import logger from '@/logger'
import { configDotenv } from 'dotenv'
import { app } from '@/app'

configDotenv()

app.listen(3333, () => logger.info('Server is running in port 3333'))
