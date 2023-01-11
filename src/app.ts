import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import usersRoutes from './router/users/users.routes'

const app = express()
app.use(express.json())

app.use('/users', usersRoutes)

app.use(handleError)

export default app