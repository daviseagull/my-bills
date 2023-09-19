import express from 'express'
import { authRoutes } from '@/routes/auth.route'

const app = express()

app.use(express.json())
app.use(authRoutes)

export { app }
