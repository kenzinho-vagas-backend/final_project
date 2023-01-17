import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'

import { companiesRoutes } from './router'
import { jobUserRoutes } from './router'
import { jobRoutes } from './router'
import { usersRoutes } from './router'
import { sessionRoutes } from './router'
import { techsRoutes } from './router'

const app = express()
app.use(express.json())
app.use(express.static('documentation'))

app.use('/jobs', jobRoutes)
app.use('/companies', companiesRoutes)
app.use('/techs', techsRoutes)
app.use('/jobUser', jobUserRoutes)
app.use('/users', usersRoutes)
app.use('/session', sessionRoutes)

app.use(handleError)

export default app