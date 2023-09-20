import logger from '@/infra/logger/logger'
import { configDotenv } from 'dotenv'
import { app } from '@/infra/http/app'

configDotenv()

app.listen(3333, () => logger.info('Server is running in port 3333'))
