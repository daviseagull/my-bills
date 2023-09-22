import serverless from 'serverless-http'
import app from './infra/http/app'

export const handler = serverless(app)
