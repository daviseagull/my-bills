import 'reflect-metadata'
import logger from '../logger/logger'
import app from './app'

app.listen(3333, () => logger.info('Server is running in port 3333'))
