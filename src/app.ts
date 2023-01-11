import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import companiesRoutes from './router/companies.routes'
import { jobRoutes } from './router'
import jobUserRoutes from './router/jobUser.routes'


const app = express()
app.use(express.json())

app.use('/jobs', jobRoutes)
app.use('/companies', companiesRoutes)
app.use('/jobUser', jobUserRoutes)

app.use(handleError)

export default app