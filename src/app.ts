import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import companiesRoutes from './router/companies/companies.routes'
import { jobRoutes } from './router'

import jobUserRoutes from './router/jobs/jobUser.routes'

import usersRoutes from './router/users/users.routes'
import sessionRoutes from './router/session/session.routes'
import techsRouter from './router/techs/techs.router'

const app = express()
app.use(express.json())

app.use('/jobs', jobRoutes)
app.use('/companies', companiesRoutes)
app.use('/techs', techsRouter)
app.use('/jobUser', jobUserRoutes)
app.use('/users', usersRoutes)
app.use('/session', sessionRoutes)

app.use(handleError)

export default app