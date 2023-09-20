import express from 'express'
import { authRoutes } from '@/infra/http/routes/auth.route'

const app = express()

app.use(express.json())
app.use(authRoutes)

export { app }
