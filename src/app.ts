import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import companiesRoutes from './router/companies.routes'
import { jobRoutes } from './router'
import usersRoutes from './router/users/users.routes'
import sessionRoutes from './router/users/session.routes'

const app = express()
app.use(express.json())

app.use('/jobs', jobRoutes)
app.use('/companies', companiesRoutes)
app.use('/users', usersRoutes)
app.use('/session', sessionRoutes)

app.use(handleError)

export default app